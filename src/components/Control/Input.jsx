import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

export default function Input(props) {
  const { name, label, values, onChange, placeholder, defaultValue } = props;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "6fr 1fr" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        variant="outlined"
        placeholder={placeholder}
        defaultValue={defaultValue}
        label={label}
        name={name}
        value={values}
        onChange={onChange}
      />
    </Box>
  );
}
