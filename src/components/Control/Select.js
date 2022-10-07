import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material";
import ButtonCustomize from "../Button/ButtonCustomize";

export default function Select(props) {
  const { name, label, value, onChange, options, defaultValue, width } = props;

  return (
    <FormControl
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "6fr 1fr" },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        multiline
        sx={{ width: width}}
      >
        {/* <MenuItem>
          <ButtonCustomize nameButton="tạo" />
        </MenuItem> */}
        {options?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {/* <MuiSelect>hihi</MuiSelect> */}
    </FormControl>
  );
}
