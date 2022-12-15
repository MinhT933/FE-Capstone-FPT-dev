import PropTypes from "prop-types";
// material
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
  Grid,
} from "@mui/material";
// component

import Iconify from "../../../components/hook-form/Iconify";

import Controls from "./../../../components/Control/Controls";

import * as moment from "moment";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Stack from "@mui/material/Stack";

import { callAPIGetListOderByDay } from "../../../redux/action/acction";

import { useDispatch } from "react-redux";
import { useState } from "react";
import DatePicker from "../../../components/Control/DatePicker";

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

OrderListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function OrderListToolbar({
  numSelected,
  filterName,
  onFilterName,
  options,
  //   date,
}) {
  const token = localStorage.getItem("token");
  if (token === "null") {
  }

  const [date, setDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const dispatch = useDispatch();
  const [haha, setHaha] = useState("All");

  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await callAPIGetListOderByDay(token, date, null));
    };
    callAPI();
  }, [dispatch, date, token]);

  const handleChange = async (event) => {
    console.log(event.target.value);
    setHaha(event.target.value === "All" ? "" : event.target.value);

    if (date) {
      dispatch(
        await callAPIGetListOderByDay(
          token,
          date,
          event.target.value === "All" ? "" : event.target.value
        )
      );
    }
  };
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
        <>
          <Grid container>
            <Grid xs={4}>
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
            </Grid>
            <Grid xs={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={3}
              >
                <FormControl sx={{ width: "80%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Chọn ngày giao"
                      value={date}
                      onChange={(newValue) => {
                        const b = new Date(newValue)
                          .toLocaleDateString()
                          .split("/");
                        setDate(`${b[2]}-${b[1]}-${b[0]}`);
                      }}
                      inputFormat="DD-MM-YYYY"
                      renderInput={({ inputRef, inputProps, InputProps }) => (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <input ref={inputRef} {...inputProps} />
                          {InputProps?.endAdornment}
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Stack>
            </Grid>
            <Grid xs={4}>
              <Controls.Select
                label="Trạng thái"
                width="10rem"
                marginRight="50% "
                options={options}
                onChange={handleChange}
                value={haha}
              />
            </Grid>
          </Grid>
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <Iconify icon="ic:round-filter-list" />
        //   </IconButton>
        // </Tooltip>

        <></>
      )}
    </RootStyle>
  );
}
