import PropTypes from "prop-types";
import * as React from "react";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
} from "@mui/material";
// component
import Iconify from "../../../components/hook-form/Iconify";
import Controls from "../../../components/Control/Controls";
import { callAPIGetListSession } from "../../../redux/action/acction";
import { createAction } from "./../../../redux/action/acction";
import Stack from "@mui/material/Stack";
import DatePicker from "../../../components/Control/DatePicker";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as moment from "moment";
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

SessionToolBarList.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

const token = localStorage.getItem("token");
if (token === "null") {
}
const getOptions = () => [
  {
    id: "0",
    title: "Sáng",
  },
  {
    id: "1",
    title: "Trưa",
  },
  {
    id: "2",
    title: "Chiều",
  },
];
export default function SessionToolBarList({
  numSelected,
  filterName,
  onFilterName,
}) {
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [flag, setFlag] = useState();
  const dispatch = useDispatch();

  const handleDate = (date) => {
    const a = new Date(date).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-0${a[1]}-${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
  };

  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await callAPIGetListSession(token, handleDate(date)));
    };
    callAPI();
  }, [dispatch, date]);

  const handlefilterRate = (e) => {
    dispatch(
      createAction({
        type: "FILLTER_FLAG",
        payload: e.target.value,
      })
    );
    setFlag(e.target.value);
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

          <Grid
            container
            spacing={2}
            sx={{ marginLeft: "2rem", marginTop: "0.1rem" }}
          >
            <Grid xs={2}>
              <Controls.Select
                label="Buổi"
                width="10rem"
                options={getOptions()}
                onChange={(e) => {
                  handlefilterRate(e);
                }}
                value={flag}
              />
            </Grid>
            <Grid xs={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                ml={6}
              >
                <FormControl sx={{ width: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Chọn ngày giao"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
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
        <></>
      )}
    </RootStyle>
  );
}
