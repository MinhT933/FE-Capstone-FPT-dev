import * as React from "react";
import Box from "@mui/joy/Box";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export default function TextArea(props) {


  const { name, label, value, onChange, placeholder, defaultValue, width } = props;

  const StyleBox = styled(Box)(({ theme }) => ({
    alignItems: "center",
    flexWrap: "wrap",
    display: "grid",
  }));
  return (
    <Box>
      <TextField

        sx={{ width: {width} }}

        placeholder={placeholder}
        label={label}
        multiline
        rows={2}
        maxRows={4}
        value={value}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        py={2}
        gap={2}
      />
    </Box>
  );
}
