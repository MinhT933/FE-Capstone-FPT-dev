import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
    Card,
    Table,
    Stack,
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

import Iconify from "../../components/hook-form/Iconify";


// import NewStationPopup from "src/pages/Station/NewStationPopup";
// import KitchenMoreMenu from "./KitchenMoreMenu";
// mock
import KITCHENORDERLIST from "./KitchenOrderSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import KitchenListToolbar from './../../sections/@dashboard/user/KitchenListToolbar';
import MealListToolBar from "../../sections/@dashboard/user/MealListToolBar";
import PageHeader from "../../components/PageHeader";



// ----------------------------------------------------------------------
// ở đây fix được tên tên table
// ko nhát thiết phải thêm table head ở dưới 

const TABLE_HEAD = [
    { id: "id", label: "Tên món" },
    { id: "name", label: "Số lượng", alignRight: false },
    // { id: "phone", label: "Điện thoại", alignRight: false },
    // { id: "station", label: "Điểm giao", alignRight: false },
    // { id: "order", label: "Món ăn", alignRight: false },
    // { id: "note", label: "Ghi chú", alignRight: false },
    // { id: "status", label: "Trạng thái", alignRight: false },
    { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(
            array,
            (_kitchen) => _kitchen.kitchenName.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function ListBreakfast() {
    const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;


    const [OpenPopUp, SetOpenPopUp] = useState(false);
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("kitchenName");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = KITCHENORDERLIST.map((n) => n.kitchenName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, kitchenName) => {
        const selectedIndex = selected.indexOf(kitchenName);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, kitchenName);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - KITCHENORDERLIST.length) : 0;

    const filteredKitchen = applySortFilter(
        KITCHENORDERLIST,
        getComparator(order, orderBy),
        filterName
    );
    //setColor button
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#FFCC32"),
        backgroundColor: "#FFCC33",
        "&:hover": {
            backgroundColor: "#ffee32",
        },
        display: "center",
    }));

    const Button1 = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#FFCC33"),
        backgroundColor: "#FFCC33",

        // display: "center"
    }));;

    const isKitchenNotFound = filteredKitchen.length === 0;


    //LỊCH CHỌN NGÀY TRONG TUẦN
    const isWeekend = (date) => {
        const day = date.day();

        return day === 0 || day === 6;
    };

    const [value, setValue] = React.useState(dayjs());



    return (
        <Page title="User">

            <Container sx={{ minWidth: 350, width: 350 }}>

                <PageHeader
                    title="SÁNG"
                    // icon={getIcon("line-md:moon-alt-to-sunny-outline-loop-transition")}
                    icon={getIcon("emojione:sun-behind-cloud")}
                // icon={getIcon("emojione:sun")}
                // icon={getIcon("emojione:crescent-moon")}
                />
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                // mb={1}
                >
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            orientation="landscape"
                            openTo="day"
                            value={value}
                            shouldDisableDate={isWeekend}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider> */}
                </Stack>

                <Card>
                    <MealListToolBar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />


                    <TableContainer sx={{ minWidth: 350, width: 350 }}>
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={KITCHENORDERLIST.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredKitchen
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        const {
                                            id,
                                            name,

                                        } = row;
                                        const isItemSelected = selected.indexOf(id) !== -1;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        onChange={(event) => handleClick(event, id)}
                                                    />
                                                </TableCell><TableCell align="left">{id}</TableCell>
                                                <TableCell align="left">{name}</TableCell>

                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>

                            {isKitchenNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <SearchNotFound searchQuery={filterName} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>


                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={KITCHENORDERLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                </Card>
            </Container>
            {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
        </Page>
    );
}
