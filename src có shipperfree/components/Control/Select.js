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
    width,
    onClick,
    marginTop,
    id,
    lableid,
    disabled,
    ids,
    marginRight,
    maxWidth,
    minWidth,
    m,
  } = props;

  return (
    <FormControl
      style={{
        // display: "grid",
        // gridTemplateColumns: { sm: "6fr 1fr" },
        marginRight: marginRight,
        width: width,
        m: m,
        maxWidth: { maxWidth },
        minWidth: { maxWidth },
      }}
      SelectProps={{ autoWidth: true }}
    >
      <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
      <MuiSelect
        lableId={lableid}
        id={ids}
        label={label}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        // width="26rem"
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
