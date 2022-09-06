import React, { useState } from "react";
import { Container, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';

export default function UseCreateForm(initialValue,validateOnChange = false, validate) {
  const [values, setValue] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, values } = e.target;
    setValue({
      ...values,
      [name]: values,
    });
  };

  return {
    values,
    setValue,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiFormControl-form": {
      witdh: "80%",
     
    },
  },
}));

export function TForm(props) {
  const classes = useStyles();

  return <form className={classes.root}>{props.children}</form>;
}
