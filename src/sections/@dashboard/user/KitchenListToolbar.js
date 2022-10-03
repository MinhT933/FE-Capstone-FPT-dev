import * as React from "react";

import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
// component
import Iconify from "../../../components/hook-form/Iconify";

//buổi
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Stack } from "@mui/joy";
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

KitchenListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

const formatWeekday = new Intl.DateTimeFormat(undefined, { weekday: "long" })
  .format;

export default function KitchenListToolbar({
  numSelected,
  filterName,
  onFilterName,
}) {
  //CHỌN BỮA ĂN
  const [meal, setMeal] = React.useState("");

  const handleChange = (event) => {
    setMeal(event.target.value);
  };

  const [value, setValue] = React.useState(dayjs("2022-02-10"));

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} Đã chọn
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Tìm kiếm..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Xóa">
          <IconButton>{/* <Iconify icon="eva:trash-2-fill" /> */}</IconButton>
        </Tooltip>
      ) : (
        <FormControl sx={{ marginLeft: "47%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Custom input"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <input ref={inputRef} {...inputProps} />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </FormControl>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Xóa">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        // <Tooltip title="Filter list">
        //     <IconButton>
        //         <Iconify icon="ic:round-filter-list" />
        //     </IconButton>
        // </Tooltip>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Buổi</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={meal}
            label="Buổi"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Sáng</MenuItem>
            <MenuItem value={20}>Trưa</MenuItem>
            <MenuItem value={30}>Tối</MenuItem>
          </Select>
        </FormControl>
      )}
    </RootStyle>
  );
}
