import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material";

export default function Select(props) {
  const { name, label, value,  onChange, options } = props;
  //error = null,
  return (
    <FormControl sx={{
      display: "grid",
      gridTemplateColumns: { sm: "6fr 1fr" },
      
    }} >
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
