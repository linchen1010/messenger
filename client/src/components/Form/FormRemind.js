import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import { formStyle } from "./formStyle";

export default function FormRemind({ remindText, btnText, path }) {
  const classes = formStyle();
  const history = useHistory();

  return (
    <Grid container>
      <Grid item xs={0} sm={4}></Grid>
      <Grid item xs={8} sm={4}>
        <Typography color="textSecondary" className={classes.remindText}>
          {`${remindText}`}
        </Typography>
      </Grid>
      <Grid item xs={4} sm={4}>
        <Button
          className={classes.btnAction}
          color="primary"
          onClick={() => history.push(`${path}`)}
        >
          {`${btnText}`}
        </Button>
      </Grid>
    </Grid>
  );
}
