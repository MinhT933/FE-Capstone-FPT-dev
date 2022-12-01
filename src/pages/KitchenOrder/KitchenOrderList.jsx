import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// material
import {
  Card,
  Table,
  Stack,
  Grid,
  // Avatar,
  Paper,
  Container,
  Typography,
} from "@mui/material";
// components

import Page from "../../components/setPage/Page";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import * as React from "react";

//callAPI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import {
  callAPIgetListKitchen,
  callAPIKitchenPrepareOrder,
} from "../../redux/action/acction";
import jwt_decode from "jwt-decode";

// import NewStationPopup from "src/pages/Station/NewStationPopup";
// import KitchenMoreMenu from "./KitchenMoreMenu";
// mock

import ListBreakfast from "./ListBreakfast";
import Box from "@mui/material/Box";

import ListLunch from "./ListLunch";
import ListDinner from "./ListDinner";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DatePicker from "../../components/Control/DatePicker";

export default function KitchenOrderList() {
  // const token = localStorage.getItem("token");
  // var decoded = jwt_decode(token);
  // console.log(decoded);
  const Navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // var decoded = jwt_decode(token);
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }
  try {
    var decoded = jwt_decode(token);
    // valid token format
  } catch (error) {
    // return <Navigate to="/" replace />;
    Navigate("/");
  }

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const [value, setValue] = React.useState(new Date());
  // const date = moment(value).format("YYYY-MM-DD");
  //callAPIKitchenGetListOrder========================================
  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIKitchenPrepareOrder(token, convert(value.$d)));
    };
    callAPI();
  }, [value, dispatch, token]);
  // dispatch(
  //   createAction({
  //     type: PathAction.GET_LIST_FOOD,
  //     payload: [],
  //   })
  // );
  // CustomizedToast({
  //   message: `Không tìm thấy data`,
  //   type: "ERROR",
  // });

  const kitchen = useSelector((state) => {
    return state.userReducer.listFoodPrepare;
  });
  console.log(kitchen);
  //callAPIKitchenGetListOrder========================================

  // const [spacing, setSpacing] = React.useState(2);
  let kitchenMorning = [];
  let kitchenLunch = [];
  let kitchenDinner = [];

  kitchenMorning = kitchen.filter((x) => x.flag === 0);
  kitchenLunch = kitchen.filter((x) => x.flag === 1);
  kitchenDinner = kitchen.filter((x) => x.flag === 2);

  return (
    <Page title="Chuẩn bị món">
      <Paper
        elevation={3}
        sx={{
          padding: "2%",
          marginBottom: "10%",
        }}
      >
        <Container maxWidth={false}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Paper
              sx={{
                justifyContent: "center",
                background: "#FFCC33",
                color: "black",
                height: "50%",
                width: "40%",
                marginLeft: "30%",
                // alignItems: "center",
                // direction: "column",
                // marginLeft: "47%",
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  display: "flex",
                  // marginLeft: "8%",
                  marginTop: "2%",
                  justifyContent: "center",
                }}
              >
                Số lượng món cần nấu
              </Typography>
            </Paper>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            // justifyContent="center"
            mb={5}
            sx={{ marginLeft: "3%" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày"
                value={value}
                onChange={(newValue) => {
                  console.log(newValue);
                  setValue(newValue);
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
          </Stack>

          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
          >
            <Grid>
              <ListBreakfast kitchenMorning={kitchenMorning} />
            </Grid>
            <Grid>
              <ListLunch kitchenLunch={kitchenLunch} />
            </Grid>
            <Grid>
              <ListDinner kitchenDinner={kitchenDinner} />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Page>
  );
}
