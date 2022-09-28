import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
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
import StationMoreMenu from "./StationMoreMenu";
// import NewStationPopup from "src/pages/Station/NewStationPopup";
// mock
// import STATIONLIST from "./StationSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIgetListStation } from "../../redux/action/acction";

// ----------------------------------------------------------------------

const TABLE_HEAD = [

    { id: "id", label: "Mã trạm", alignRight: false },
    { id: "name", label: "Địa điểm", alignRight: false },
    { id: "address", label: "Địa chỉ", alignRight: false },
    { id: "openTime", label: "Mở cửa", alignRight: false },
    { id: "closeTime", label: "Đóng cửa", alignRight: false },
    { id: "status", label: "Trạng thái", alignRight: false },
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
            (_stations) => _stations.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function StationList() {
    const [OpenPopUp, SetOpenPopUp] = useState(false);
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("name");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);



    //CALL API==================================================== 
    const dispatch = useDispatch();
    React.useEffect(() => {
        const callAPI = async () => {
            await dispatch(callAPIgetListStation());
        };
        callAPI();
    }, [dispatch]);

    const station = useSelector((state) => {
        return state.userReducer.listStation;
    });
    //CALL API=====================================================




    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = station.map((n) => n.name);
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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - station.length) : 0;

    const filteredStations = applySortFilter(
        station,
        getComparator(order, orderBy),
        filterName
    );

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
    }));;


    return (
        <Page title="station">
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
                    <ColorButton
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/admin/newstation"

                    >
                        Thêm trạm
                    </ColorButton>
                </Stack>


                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={station.length}
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
                                                address,
                                                openTime,
                                                closeTime,
                                                status,
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
                                                    <TableCell align="left">{id}</TableCell>
                                                    <TableCell align="left">{name}</TableCell>
                                                    <TableCell align="left">{address}</TableCell>
                                                    <TableCell align="left">{openTime}</TableCell>
                                                    <TableCell align="left">{closeTime}</TableCell>
                                                    <TableCell align="left">
                                                        <Label
                                                            variant="ghost"
                                                            color={
                                                                (status === "Closed" && "error") || "success"
                                                            }
                                                        >
                                                            {(status)}
                                                        </Label>
                                                    </TableCell>

                                                    {/* <ColorButton
                                                        variant="contained"
                                                        component={RouterLink}
                                                        to="/dashboard/admin/newstation"

                                                    >
                                                        Cập nhật
                                                    </ColorButton> */}
                                                    <Button1 sx={{ margin: "center", marginTop: "7%" }}
                                                        variant="outlined"
                                                        component={RouterLink}
                                                        to="/dashboard/admin/updatestation"

                                                    >
                                                        Cập nhật
                                                    </Button1>


                                                    {/* <TableCell align="right"> */}
                                                    {/* //props */}
                                                    {/* <StationMoreMenu id={id} /> */}
                                                    {/* </TableCell> */}
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
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
                        count={station.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
            {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
        </Page>
    );
}
