import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment,
  Input,
  InputLabel,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import { formStyle } from "./formStyle";
import BackgroundImage from "./BackgroundImage";
import FormRemind from "./FormRemind";

const Login = (props) => {
  const classes = formStyle();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.emailAddress.value;
    const password = event.target.password.value;

    await login({ username, password });
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
            remindText="Don't have an account?"
            btnText="Create account"
            path="/register"
          />
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.formField}
          >
            <form onSubmit={handleLogin}>
              <Grid item xs={12}>
                <Typography align="left" variant="h6">
                  <b>Welcome back!</b>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    aria-label="emailAddress"
                    label="E-mail address"
                    name="emailAddress"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel>Password</InputLabel>
                  <Input
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          color="primary"
                          onClick={() => history.push("/register")}
                        >
                          Forgot?
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Button
                color="primary"
                type="submit"
                variant="contained"
                size="large"
                className={classes.btnSubmit}
              >
                Login
              </Button>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
