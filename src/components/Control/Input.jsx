import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

export default function Input(props) {
  const { name, label, value, onChange, placeholder, defaultValue } = props;
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
        placeholder={placeholder}
        multiline
        label={label}
        value={value}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Box>
  );
}
