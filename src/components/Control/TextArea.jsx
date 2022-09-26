import * as React from "react";
import Box from "@mui/joy/Box";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export default function TextArea(props) {
  const { name, label, values, onChange, placeholder } = props;
  const StyleBox = styled(Box)(({ theme }) => ({
    alignItems: "center",
    flexWrap: "wrap",
    display: "grid",
  }));
  return (
    <Box>
      <TextField
        placeholder={placeholder}
        label={label}
        multiline
        rows={2}
        maxRows={4}
        value={values}
        name={name}
        onChange={onChange}
        py={2}
        gap={2}
      />
    </Box>
  );
}
