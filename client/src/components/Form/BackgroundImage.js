import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography, CardMedia } from "@material-ui/core";
import { formStyle } from "./formStyle";

export default function BackgroundImage() {
  const classes = formStyle();
  return (
    <Grid item xs={12} sm={5} className={classes.image}>
      <Box className={classes.gradientContainer}>
        <CardMedia
          image="/images/bubble.svg"
          className={classes.msgIcon}
        ></CardMedia>
        <Box p={4}>
          <Typography className={classes.imageText}>
            Converse with anyone
          </Typography>
          <Typography className={classes.imageText}>
            with any language
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
