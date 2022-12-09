import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

export default function Input(props) {
  const {
    name,
    label,
    value,
    onChange,
    placeholder,
    defaultValue,
    width,
    marginLeft,
    marginTop,
    marginBottom,
    disabled,
    variant,
    type,
    hintText,
    floatingLabelText,
  } = props;
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
        variant={variant}
        required
        maxRows={Infinity}
        placeholder={placeholder}
        multiline
        label={label}
        type={type}
        value={value}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        sx={{
          width: { width },
          marginLeft: { marginLeft },
          marginTop: { marginTop },
          marginBottom: { marginBottom },
        }}
      />
    </Box>
  );
}
