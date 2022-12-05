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
} from "@mui/material";
// component
import Iconify from "../../../components/hook-form/Iconify";
import Box from "@mui/material/Box";
import Controls from "./../../../components/Control/Controls";

import {
  callAPIgetListCategory,
  callAPIgetListFoodfilterCate,
  getFoodPrepareByWeek,
} from "../../../redux/action/acction";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ButtonCustomize from "../../../components/Button/ButtonCustomize";

// ----------------------------------------------------------------------
//----------------------
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

OrderListByWeekToolBar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

const token = localStorage.getItem("token");
if (token === "null") {
  Navigate("/");
}

export default function OrderListByWeekToolBar({
  numSelected,
  filterName,
  onFilterName,
  options,
}) {
  const [id, setID] = useState("");
  const dispatch = useDispatch();
  const [status, setStatus] = useState("All");

  const handleChange = async (event) => {
    setStatus(event.target.value === "All" ? "" : event.target.value);

    await dispatch(
      callAPIgetListFoodfilterCate(
        token,
        id,
        event.target.value === "All" ? "" : event.target.value
      )
    );
  };
  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await callAPIgetListCategory(token));
    };
    callAPI();
  }, [dispatch]);

  const category = useSelector((state) => {
    return state.userReducer.listCategory;
  });

  const OptionCate = () => {
    const item = [];
    for (var i = 0; i < category.length; i++) {
      item.push({ id: category[i].id, title: category[i].name });
    }
    return item;
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
            placeholder="VD: 2022-12-31"
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <ButtonCustomize
                nameButton="Tuần này"
                width="6rem"
                onClick={async () => {
                  var curr = new Date(); // get current date
                  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                  var last = first + 7; // last day is the first day + 6

                  var firstday = new Date(
                    curr.setDate(first + 1)
                  ).toUTCString();
                  var lastday = new Date(curr.setDate(last)).toUTCString();

                  const a = new Date(firstday).toLocaleDateString().split("/");
                  const b = new Date(lastday).toLocaleDateString().split("/");

                  let firstdate = a[2] + "-" + a[1] + "-" + a[0];
                  console.log(firstdate);
                  let lastdate = b[2] + "-" + b[1] + "-" + b[0];
                  console.log(lastdate);
                  dispatch(
                    await getFoodPrepareByWeek(token, firstdate, lastdate)
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <ButtonCustomize
                nameButton="Tuần tới"
                width="6rem"
                onClick={async () => {
                  var curr = new Date(); // get current date
                  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                  var last = first + 14; // last day is the first day + 6

                  var firstday = new Date(
                    curr.setDate(first + 8)
                  ).toUTCString();
                  var lastday = new Date(curr.setDate(last)).toUTCString();

                  const a = new Date(firstday).toLocaleDateString().split("/");
                  const b = new Date(lastday).toLocaleDateString().split("/");

                  let firstdate = a[2] + "-" + a[1] + "-" + a[0];
                  let lastdate = b[2] + "-" + b[1] + "-" + b[0];
                  dispatch(
                    await getFoodPrepareByWeek(token, firstdate, lastdate)
                  );
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </RootStyle>
  );
}
