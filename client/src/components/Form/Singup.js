import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import { formStyle } from "./formStyle";
import BackgroundImage from "./BackgroundImage";
import FormRemind from "./FormRemind";

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const classes = formStyle();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Box className={classes.root}>
      <Grid container>
        <BackgroundImage />
        <Grid item xs={12} sm={7} className={classes.form}>
          <FormRemind
            remindText="Already have an account?"
            btnText="Login"
            path="/login"
          />
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.formField}
          >
            <form onSubmit={handleRegister}>
              <Grid item xs={12}>
                <Typography align="left" variant="h6">
                  <b className={classes.headerContent}>Create an account.</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  margin="normal"
                  fullWidth
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
                <Grid item xs={12}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    error={!!formErrorMessage.confirmPassword}
                  >
                    <TextField
                      label="Confirm Password"
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      required
                      name="confirmPassword"
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                  variant="contained"
                  size="large"
                  className={classes.btnSubmit}
                >
                  Create
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
