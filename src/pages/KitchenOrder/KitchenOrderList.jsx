import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
    Card,
    Table,
    Stack,
    Grid,
    // Avatar,
    Paper,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
} from "@mui/material";
// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";



import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import * as React from 'react';

//callAPI
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { callAPIgetListKitchen } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";


// import NewStationPopup from "src/pages/Station/NewStationPopup";
// import KitchenMoreMenu from "./KitchenMoreMenu";
// mock
import KITCHENORDERLIST from "./KitchenOrderSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import KitchenListToolbar from './../../sections/@dashboard/user/KitchenListToolbar';
import ListBreakfast from "./ListBreakfast";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import ListLunch from "./ListLunch";
import ListDinner from "./ListDinner";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DatePicker from "../../components/Control/DatePicker";

export default function KitchenOrderList() {

    //callAPIKitchenGetListOrder========================================
    const dispatch = useDispatch();
    React.useEffect(() => {
        const callAPI = async () => {
            await dispatch(callAPIgetListKitchen());
        };
        callAPI();
    }, [dispatch]);

    const token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    console.log(decoded);

    const handleDelete = (id) => {
        API("PUT", URL_API + `/kitchens/update-status/${id}`, null, token).then(
            (res) => {
                try {
                    dispatch(callAPIgetListKitchen());
                } catch (err) {
                    alert("Ban faild " + id);
                }
            },
            []
        );
    };

    const kitchen = useSelector((state) => {
        return state.userReducer.listKitchen;
    });

    //callAPIKitchenGetListOrder========================================

    const [value, setValue] = React.useState(dayjs("2022-02-10"));
    // const [spacing, setSpacing] = React.useState(2);

    return (
        <Page title="Kitchen">
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                >
                    <Paper sx={{
                        // justifyContent: "center",
                        background: "#FFCC33",
                        color: "black",
                        height: "50%",
                        width: "36%",

                        // alignItems:"center",
                        // justifyContent:"center",
                        // direction: "column",
                        // marginLeft: "47%",
                    }}>
                        <Typography variant="h3" gutterBottom
                            sx={{
                                display: "flex",
                                marginLeft: "7%",
                                marginTop: "2%",
                            }}>
                            Số lượng món cần nấu
                        </Typography>
                    </Paper>

                </Stack>

                {/* <Paper sx={{
                    background: "#FFCC33",
                    color: "black",
                    height: "50%",
                    width: "36%",
                    // marginLeft: "47%",
                }}>
                    <Typography variant="h3" gutterBottom
                        sx={{
                            display: "center",
                            marginLeft: "7%",
                        }}>
                        Số lượng món cần nấu
                    </Typography>
                </Paper> */}

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                    sx={{ marginLeft: "1%", }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Chọn ngày"
                            value={value}
                            onChange={(newValue) => {
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

                <Grid container spacing={2}>
                    <Grid>
                        <ListBreakfast />
                    </Grid>

                    <Grid>
                        <ListLunch />
                    </Grid>

                    <Grid>
                        <ListDinner />
                    </Grid>

                </Grid>
            </Container>
        </Page >
    );
}
