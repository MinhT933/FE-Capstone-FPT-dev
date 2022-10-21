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
    Box,
    Paper,
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

import DatePicker from "../../components/Control/DatePicker";


import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

import Rating from "@mui/material/Rating";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIgetListStation } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// import NewStationPopup from "src/pages/Station/NewStationPopup";
// import KitchenMoreMenu from "./KitchenMoreMenu";
// mock
import ADMINVIEWFEEDBACKLIST from "./AdminViewFeedBackSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import KitchenListToolbar from '../../sections/@dashboard/user/KitchenListToolbar';
import AdminListToolbar from "../../sections/@dashboard/user/AdminListToolBar";


// ----------------------------------------------------------------------
// ở đây fix được tên tên table
// ko nhất thiết phải thêm table head ở dưới

const TABLE_HEAD = [
    { id: "id", label: "Mã đơn", alignRight: false },
    { id: "name", label: "Người đặt", alignRight: false },
    { id: "phone", label: "Điện thoại", alignRight: false },
    { id: "kitchen", label: "Bếp", alignRight: false },
    { id: "order", label: "Gói ăn", alignRight: false },
    { id: "star", label: "Đánh giá", alignRight: false },
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
            (_stations) =>
                _stations.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function AdminViewFeedBackList() {
    const [OpenPopUp, SetOpenPopUp] = useState(false);
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("name");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    //CALL API====================================================
    // const dispatch = useDispatch();
    // React.useEffect(() => {
    //     const callAPI = async () => {
    //         await dispatch(callAPIgetListFeedback());
    //     };
    //     callAPI();
    // }, [dispatch]);

    // const station = useSelector((state) => {
    //     return state.userReducer.listFeedback;
    // });
    //CALL API=====================================================

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = ADMINVIEWFEEDBACKLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - station.length) : 0;

    const filteredStations = applySortFilter(
        ADMINVIEWFEEDBACKLIST,
        // station,
        getComparator(order, orderBy),
        filterName
    );
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const isStationNotFound = filteredStations.length === 0;

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
    }));
    //LỊCH CHỌN NGÀY TRONG TUẦN
    const isWeekend = (date) => {
        const day = date.day();

        return day === 0 || day === 6;
    };

    const [value, setValue] = React.useState(dayjs());

    //ĐÁNH GIÁ NGÔI SAO
    const [valueStar] = React.useState(3);

    return (
        <Page title="Feedback">
            <Container>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                >
                    <Paper sx={{
                        background: "#FFCC33",
                        color: "black",
                        height: "50%",
                        width: "29%",
                    }}>
                        <Typography variant="h3" gutterBottom
                            sx={{
                                display: "flex",
                                marginLeft: "7%",
                                marginTop: "2%",
                            }}>
                            Đánh giá theo tuần
                        </Typography>

                    </Paper>

                </Stack>
                <Typography variant="subtitle2"
                    sx={{
                        display: "flex",
                        marginLeft: "7%",
                        marginTop: "2%",
                    }}>
                    {/* Tính theo tổng đánh giá cho từng bếp */}
                </Typography>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                >
                    <FormControl sx={{ width: "25%", }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Chọn ngày trong tuần"
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
                    </FormControl>
                </Stack>

                <Card Card >
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={ADMINVIEWFEEDBACKLIST.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredStations
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {
                                                id,
                                                name,
                                                phone,
                                                kitchen,
                                                order,
                                                star,
                                            } = row;
                                            const isItemSelected = selected.indexOf(name) !== -1;

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
                                                            onChange={(event) => handleClick(event, name)}
                                                        />
                                                    </TableCell>
                                                    {/* <TableCell align="left">{id}</TableCell> */}
                                                    <TableCell align="left">{id}</TableCell>
                                                    <TableCell align="left">{name}</TableCell>
                                                    <TableCell align="left">{phone}</TableCell>
                                                    <TableCell align="left">{kitchen}</TableCell>
                                                    <TableCell align="left">{order}</TableCell>

                                                    <TableCell align="left">
                                                        <Rating
                                                            name="read-only"
                                                            value={valueStar}
                                                            readOnly
                                                            sx={{
                                                                "& > legend": { mt: 3 },
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {/* {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )} */}
                                </TableBody>

                                {isStationNotFound && (
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
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={ADMINVIEWFEEDBACKLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        // fix languge in footer tables
                        labelRowsPerPage={"Số hàng trên một trang"}
                        labelDisplayedRows={({ from, to, count }) => {
                            return "" + from + "-" + to + " của " + count;
                        }}
                    />
                </Card >
            </Container >
            {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
        </Page >
    );
}
