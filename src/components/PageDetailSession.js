import { Card, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
// import { Paper, Card, Typography, makeStyles } from '@material-ui/core'

export default function PageDetailSession(props) {
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
  const {
    title,
    subTitle,
    icon,
    width,
    marginLeft,
    subTitle1,
    subTitle2,
    subTitle3,
  } = props;
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
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle1}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle2}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle3}
          </Typography>
        </div>
        <Card className={classes.pageIcon}>{icon}</Card>
      </div>
    </Paper>
  );
}
