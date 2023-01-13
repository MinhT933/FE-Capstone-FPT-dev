import { Paper } from "@mui/material";
import React from "react";
import NewUser from "./NewUserPopup";
import { makeStyles } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    pageContent: {
    magin: theme.spacing(5),
    padding : theme.spacing(3)
  },
  }));
export default function Form(props) {
    const classes = useStyles();
  return (
    <>
      <Paper className={classes.pageContent}>
        <NewUser />
      </Paper>
    </>
  );
}
