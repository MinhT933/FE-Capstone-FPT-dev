import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Dialog, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
    Card,
    Table,
    Avatar,
    Stack,
    Button,
    TableRow,
    TableBody,
    Checkbox,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Box,
} from "@mui/material";
// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

// mock
// import STATIONLIST from "./StationSample";
import { UserListHead } from "../../sections/@dashboard/user";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIgetListFreeShipper, callAPIgetListKitchen } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import KitchenListToolbar from "../../sections/@dashboard/user/KitchenListToolbar";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import PageHeader from "../../components/PageHeader";
import Iconify from "../../components/hook-form/Iconify";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: "id", label: "", alignRight: false },
    { id: "fullName", label: "Họ Tên", alignRight: false },
    // { id: "id", label: "Mã tài xế", alignRight: false },
    { id: "phone", label: "Điện thoại", alignRight: false },
    { id: "noPlate", label: "Biển số xe", alignRight: false },
    { id: "vehicleType", label: "Loại xe", alignRight: false },
    { id: "email", label: "Email", alignRight: false },
    // { id: "kitchenID", label: "Bếp", alignRight: false },
    // { id: "inWord", label: "Nhận đơn", alignRight: false },
    // { id: "status", label: "Trạng thái", alignRight: false },
    // { label: "Thay đổi trạng thái", alignRight: false },
    // { label: "Chi tiết", alignRight: false },
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
                _stations.account.profile.fullName
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;




export default function FreeShipper(props) {
    const { OpenPopUp, SetOpenPopUp } = props;

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("name");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const handleClickOpen = React.useCallback((item) => {
        setOpen(true);
        setValue(item);
    }, []);

    // const handleClose = React.useCallback(() => {
    //     setOpen(false);
    // }, []);

    const handleClick = (event, freeShipper) => {
        console.log(event.target.value)

        const selectedIndex = selected.indexOf(freeShipper);
        console.log(selectedIndex)
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, freeShipper);
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


    //CALL API====================================================
    const location = useLocation();
    const Navigate = useNavigate();
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
    // const decoded = jwt_decode(token);

    const dispatch = useDispatch();
    React.useEffect(() => {
        const callAPI = async () => {
            await dispatch(callAPIgetListFreeShipper(token));

        };
        callAPI();
    }, [dispatch, token]);

    const handleDelete = (id, name) => {
        // API("PUT", URL_API + `/kitchens/status/${id}`, null, token).then((res) => {

        API("PUT", URL_API + " /shippers/addKitchen", null, token).then((res) => {
            try {

                dispatch(callAPIgetListFreeShipper(token));
                handleClose();
                CustomizedToast({
                    message: `Đã thêm tài xế ${name} cho bếp`,
                    type: "SUCCESS",
                });
            } catch (err) {
                handleClose();
                CustomizedToast({
                    message: `Thêm tài xế ${name} cho bếp thất bại`,
                    type: "ERROR",
                });
            }
        }, []);
    };

    const freeShipper = useSelector((state) => {
        return state.userReducer.listFreeShipper;
    });
    //CALL API=====================================================
    //Thay đổi trạng thái
    const getOptions = () => [
        { id: "active", title: "Hoạt động" },
        { id: "inActive", title: "Đóng cửa" },
        { id: "All", title: "Tất cả" },
    ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = freeShipper.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
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

    const filteredStations = applySortFilter(
        freeShipper,
        getComparator(order, orderBy),
        filterName
    );

    const isStationNotFound = filteredStations.length === 0;

    const handleClose = () => {
        SetOpenPopUp(false);
    };

    return (
        <Paper >
            <Dialog open={OpenPopUp} onClose={handleClose}>
                <DialogTitle>
                    <PageHeader
                        title="Thêm tài xế cho bếp"
                        subTitle="Vui lòng chọn tài xế"
                        icon={getIcon("carbon:delivery")}
                    />
                </DialogTitle>

                <DialogContent>
                    <Container maxWidth={false} fullWitdh maxwidth="md">
                        {/* <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                > */}
                        {/* <Typography variant="h4" gutterBottom>
                        {/* User */}
                        {/* </Typography>  */}

                        {/* {decoded.role === "admin" && (
                        <ButtonCustomize
                            variant="contained"
                            component={RouterLink}
                            to="/dashboard/admin/kitchenshipper"
                            nameButton="Thêm tài xế cho bếp"
                        />
                    )} */}
                        {/* </Stack> */}

                        <Card>
                            <KitchenListToolbar
                                numSelected={selected.length}
                                filterName={filterName}
                                onFilterName={handleFilterByName}
                                options={getOptions()}
                            />

                            <Scrollbar>
                                <TableContainer sx={{ minWidth: 500, width: 500 }}>
                                    <Table>
                                        <UserListHead
                                            order={order}
                                            orderBy={orderBy}
                                            headLabel={TABLE_HEAD}
                                            rowCount={freeShipper.length}
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
                                                        fullName,
                                                        noPlate,
                                                        vehicleType,
                                                        status,
                                                        account,
                                                    } = row;

                                                    const isItemSelected = selected.indexOf(fullName) !== -1;

                                                    return (
                                                        <TableRow
                                                            hover
                                                            key={id}
                                                            tabIndex={-1}
                                                            role="checkbox"
                                                            selected={isItemSelected}
                                                            aria-checked={isItemSelected}
                                                        >
                                                            <TableCell align="left">{""}</TableCell>

                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    // checked={isItemSelected}
                                                                    onChange={(event) => console.log(event.target.checked)}
                                                                />
                                                            </TableCell>


                                                            <TableCell component="th" scope="row" padding="none">
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    spacing={2}
                                                                >
                                                                    <Avatar
                                                                        alt={fullName}
                                                                        src={row.account.profile?.avatar}
                                                                    />
                                                                    <Typography variant="subtitle2" noWrap>
                                                                        {row.account.profile?.fullName}
                                                                    </Typography>
                                                                </Stack>
                                                            </TableCell>

                                                            <TableCell align="left">
                                                                {row.account?.phone}
                                                            </TableCell>

                                                            <TableCell align="left">{noPlate}</TableCell>
                                                            <TableCell align="left">{vehicleType}</TableCell>

                                                            <TableCell align="left">
                                                                {" "}
                                                                {row.account.profile?.email}{" "}
                                                            </TableCell>

                                                        </TableRow>
                                                    );
                                                })}
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
                                count={freeShipper.length}
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
                            {/* {open && (
                        <ConfirmDialog
                            open={open}
                            content={value.account.profile?.fullName}
                            handleClickOpen={handleClickOpen}
                            handleClose={handleClose}
                            onClick={() =>
                                handleDelete(value.id, value.account.profile?.fullName)
                            }
                        />
                    )} */}
                        </Card>

                        <Box>
                            <Stack
                                width="20%"
                                justifyContent="center"
                                marginLeft={"30%"}
                                marginTop={"4%"}
                            >
                                <ButtonCustomize
                                    variant="contained"
                                    nameButton="Thêm"
                                    component={RouterLink}
                                    to="/dashboard/admin/kitchenshipper"
                                    type="submit" />
                            </Stack>
                        </Box>
                    </Container>

                </DialogContent>
                {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
            </Dialog>
        </Paper>
    );
}
