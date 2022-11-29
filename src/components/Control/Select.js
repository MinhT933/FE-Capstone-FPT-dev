import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material";

export default function Select(props) {
  const {
    name,
    label,
    value,
    onChange,
    options,
    defaultValue,
    width,
    onClick,
    marginTop,
    id,
    lableid,
    disabled,
    ids,
    marginRight,
  } = props;

  return (
    <FormControl
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "6fr 1fr" },
        marginRight: marginRight,
        width: width,
      }}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect
        // labelId="demo-simple-select-label"
        lableId={lableid}
        // id="demo-simple-select"
        id={ids}
        label={label}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        defaultValue={"hiuhi"}
        multiline
        sx={{ marginTop: marginTop }}
      >
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
