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
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import * as React from 'react';



// import NewStationPopup from "src/pages/Station/NewStationPopup";
// import KitchenMoreMenu from "./KitchenMoreMenu";
// mock
import KITCHENORDERLIST from "./KitchenOrderSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import KitchenListToolbar from './../../sections/@dashboard/user/KitchenListToolbar';
import ListBreakfast from "./ListBreakfast";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ListLunch from "./ListLunch";
import ListDinner from "./ListDinner";


export default function KitchenOrderList() {
    const [value, setValue] = React.useState(dayjs("2022-02-10"));
    // const [spacing, setSpacing] = React.useState(2);

    return (
        <Page title="User">
            <Container>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >



                    <Typography variant="h4" gutterBottom>
                        {/* User */}
                    </Typography>

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

                </Stack>


                <Grid sx={{ flexGrow: 1, marginLeft: '5%' }} container spacing={2}>
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
        </Page>
    );
}
