import { Card, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
// import { Paper, Card, Typography, makeStyles } from '@material-ui/core'
import { width } from "@mui/system";

export default function PopUpHeader(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#fdfdff",
      // width: { width },
    },
    pageHeader: {
      padding: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
    },
    pageIcon: {
      display: "inline-block",
      padding: theme.spacing(2),
      color: "#3c44b1",
      paddingleft: theme.spacing(5),
    },
    pageTitle: {
      paddingRight: theme.spacing(2),
      "& .MuiTypography-subtitle2": {
        opacity: "0.6",
      },
    },
  }));
  const classes = useStyles();
  const { title, icon, width, marginLeft } = props;
  return (
    <Paper
      elevation={0}
      square
      className={classes.root}
      sx={{ width: { width }, marginLeft: { marginLeft } }}
    >
      <div className={classes.pageHeader}>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
