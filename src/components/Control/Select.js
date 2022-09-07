import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;
  console.log(options);
  return (
    <FormControl fullWidth sx={{  maxWidth: 225, size: "small" }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">None</MenuItem>

        {options?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
