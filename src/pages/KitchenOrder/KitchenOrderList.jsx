
import { Link as  useNavigate } from "react-router-dom";

// material
import {
  Stack,
  Grid,
  // Avatar,
  Paper,
  Container,
  Typography,
} from "@mui/material";
// components

import Page from "../../components/setPage/Page";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";

//callAPI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {

  callAPIKitchenPrepareOrder,
} from "../../redux/action/acction";

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
  const Navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token === null) {
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
      if (value.$d !== undefined) {
        dispatch(await callAPIKitchenPrepareOrder(token, convert(value.$d)));
    }
    };
    callAPI();
  }, [value, dispatch, token]);

  const kitchen = useSelector((state) => {
    return state.userReducer.listFoodPrepare;
  });

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
