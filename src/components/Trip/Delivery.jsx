import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
    Button,
    Typography,
    Grid,
    Box,
    Paper,
} from "@mui/material";
// components
import Page from "../../components/setPage/Page";
// import NewStationPopup from "src/pages/Station/NewStationPopup";
// mock
// import STATIONLIST from "./StationSample";

import Iconify from "../../components/hook-form/Iconify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIGetListDelivery, callAPIgetListStation } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import DatePicker from "../Control/DatePicker";
import Controls from "../Control/Controls";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "../PageHeader";
// ----------------------------------------------------------------------

const TABLE_HEAD = [

    { id: "id", label: "", alignRight: false },
    // { id: "id", label: "Mã trạm", alignRight: false },

    { id: "deliveryDate", label: "Địa điểm", alignRight: false },
    { id: "address", label: "Địa chỉ", alignRight: false },
    { id: "phone", label: "Số điện thoại", alignRight: false },
    { id: "openTime", label: "Mở cửa", alignRight: false },
    { id: "closeTime", label: "Đóng cửa", alignRight: false },
    { id: "status", label: "Trạng thái", alignRight: false },
    { label: "Thay đổi trạng thái", alignRight: false },
    { id: "" },
];

const columns = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "deliveryDate", headerName: "Ngày Giao", flex: 0.8 },
    {
        field: "order", headerName: "Tên món", flex: 1,
        renderCell: (param) => {
            // return param.row.order.nameFood
            const result = param.row.order.map((row) => {
                return (row.nameFood)
            })
            return (result.join(','))
        }
    },
    {
        field: "name", headerName: "Điểm giao", flex: 1,
        renderCell: (param) => {
            return param.row.station.name

        }
    },
    {
        field: "address", headerName: "Địa chỉ", flex: 2,
        renderCell: (param) => {
            return param.row.station.address

        }
    },
    {
        field: "startTime", headerName: "Bắt đầu giao", flex: 1,
        renderCell: (param) => {
            return param.row.time_slot.startTime

        }
    },
    {
        field: "endTime", headerName: "Kết thúc giao", flex: 1,
        renderCell: (param) => {
            return param.row.time_slot.endTime

        }
    },

]

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
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function Delivery() {
    const [OpenPopUp, SetOpenPopUp] = useState(false);
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("name");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const [select, setSelect] = useState('')
    const [valueStarTime, setValueStarTime] = React.useState(new Date());
    // const decoded = jwt_decode(token);

    const dispatch = useDispatch();
    React.useEffect(() => {
        const callAPI = async () => {
            await dispatch(callAPIGetListDelivery(token, select, convert(valueStarTime)));
        };
        callAPI();
    }, [select, convert(valueStarTime.$d)]);

    console.log(valueStarTime)

    const station = useSelector((state) => {
        return state.userReducer.listDelivery;
    });
    console.log(station)
    //CALL API=====================================================
    //Thay đổi trạng thái
    const getOptions = () => [
        { id: "waiting", title: "Chờ giao hàng" },
        { id: "delivery", title: "Đang giao" },
        { id: "arrived", title: "Đã giao" },
        // { id: "All", title: "Tất cả" },
    ];

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

    const filteredStations = applySortFilter(
        station,
        getComparator(order, orderBy),
        filterName
    );

    const isStationNotFound = filteredStations.length === 0;

    const Button1 = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#FFCC33"),
        backgroundColor: "#FFCC33",

        // display: "center"
    }));



    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }


    const handleChange = async (event) => {
        setSelect(event.target.value)
        // console.log(event.target.value)
    }
    const row = []
    return (
        <Page title="Chuyến hàng">
            <Paper
                elevation={3}
                sx={{
                    padding: "2%",
                    marginBottom: "10%",
                    margin: "2%",
                }}>
                <PageHeader
                    title="Thông tin chuyến giao hàng"
                    subTitle="Vui lòng điền đầy đủ thông tin"
                    icon={getIcon("icon-park-outline:delivery")}
                />
                <form>
                    <Box sx={{ marginLeft: '8%', height: '35rem', width: '140%', marginTop: '2%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2.2}>
                                <Typography variant="h4" gutterBottom>
                                    {/* User */}
                                    <DatePicker
                                        variant="outlined"
                                        name="valueStarTime"
                                        label="Chọn ngày"
                                        width="16rem"
                                        inputFormat="YYYY-MM-DD"
                                        value={valueStarTime}
                                        onChange={(e) => {
                                            setValueStarTime(e);
                                        }}
                                    />
                                </Typography>

                                {/* {decoded.role === "kitchen" && (
                                <ButtonCustomize
                                    variant="contained"
                                    component={RouterLink}
                                    to="/dashboard/kitchen/tripDelivery"
                                    nameButton="Tạo chuyến đi"
                                />
                            )} */}
                            </Grid>


                            <Grid item xs={3.6}>
                                <Controls.Select
                                    label="Trạng thái"
                                    width="10rem"
                                    options={getOptions()}
                                    onChange={handleChange}
                                    value={select}
                                />
                            </Grid>


                            <Grid item xs={1.5} marginTop="0.5%">
                                {decoded.role === "kitchen" && (
                                    <ButtonCustomize
                                        variant="contained"
                                        component={RouterLink}
                                        to="/dashboard/kitchen/tripDelivery"
                                        nameButton="Tạo chuyến đi"
                                    />
                                )}
                            </Grid>

                        </Grid>
                        <Box>
                            <div style={{ height: '25rem', width: '60%', marginTop: '1%' }}>

                                {station ? <DataGrid
                                    rows={station}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    getRowId={(row) => row.id}
                                    pagination
                                /> : <DataGrid
                                    rows={row}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    getRowId={(row) => row.id}
                                    pagination
                                />}

                            </div>
                        </Box>


                    </Box>
                </form>
            </Paper>
        </Page>
    );
}
