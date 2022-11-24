import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
  Card,
  Table,
  Stack,
  // Avatar,
  Paper,
  Grid,
  Box,
  Button,
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

import { DataGrid } from "@mui/x-data-grid";
import Iconify from "../../components/hook-form/Iconify";
//callAPI
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import {
  callAPIGetListOderByDay,
  callAPIKitchenGetListOrder,
} from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import DatePicker from "../../components/Control/DatePicker";

import FormControl from "@mui/material/FormControl";

// mock

import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import KitchenListToolbar from "./../../sections/@dashboard/user/KitchenListToolbar";
import * as moment from "moment";
import PageHeader from "../../components/PageHeader";
import Controls from "../../components/Control/Controls";
// ----------------------------------------------------------------------
// ở đây fix được tên tên table
// ko nhát thiết phải thêm table head ở dưới

const TABLE_HEAD = [
  { id: "", label: "", alignRight: false },
  // { id: "id", label: "Mã đơn", alignRight: false },
  { id: "name", label: "Món ăn", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "station", label: "Điểm giao", alignRight: false },
  { id: "slot", label: "Slot", alignRight: false },
  { id: "timeSlot", label: "Bắt đầu", alignRight: false },
  { id: "endTime", label: " Kết thúc", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "" },
];

const columns = [
  // { field: "id", headerName: "ID", flex: 1 },

  // <TableCell align="left">{food.name}</TableCell>
  // <TableCell align="left">
  //   {subscription.customer.account.phone}
  // </TableCell>
  // <TableCell align="left">{station.address}</TableCell>
  // <TableCell align="left">{timeSlot.flag}</TableCell>
  // <TableCell align="left">
  //   {timeSlot.startTime}
  // </TableCell>
  // <TableCell align="left">{timeSlot.endTime}</TableCell>
  {
    field: "name", headerName: "Tên món", flex: 1,
    renderCell: (param) => {
      return param.row.food.name

    }
  },
  {
    field: "phone", headerName: "Điện thoại", flex: 1,
    renderCell: (param) => {
      return param.row.subscription.customer.account.phone

    }
  },
  {
    field: "station", headerName: "Điểm giao", flex: 3,
    renderCell: (param) => {
      return param.row.station.address

    }
  },
  {
    field: "timeSlot", headerName: "Buổi", flex: 1,
    renderCell: (param) => {
      return param.row.timeSlot.flag

      // return (
      //   <div>

      //     {param.row.timeSlot.flag === "1" && (
      //       <TableCell>Trưa</TableCell>
      //     )}

      //   </div>
      // );

    }
  },
  {
    field: "startTime", headerName: "Bắt đầu giao", flex: 1,
    renderCell: (param) => {
      return param.row.timeSlot.startTime

    }
  },
  {
    field: "endTime", headerName: "Kết thúc giao", flex: 1,
    renderCell: (param) => {
      return param.row.timeSlot.endTime

    }
  },
  {
    field: "status", headerName: "Trạng thái", flex: 1.5,
    renderCell: (param) => {
      // return param.row.status
      return (
        <div>
          {param.row.status === "progress" && (
            <Label color="warning">Chờ giao hàng</Label>
          )}

          {param.row.status === "delivery" && (
            <Label color="warning">Đang giao</Label>
          )}

          {param.row.status === "arrived" && (
            <Label color="success">Đã đến</Label>
          )}

          {param.row.status === "done" && (
            // <Alert severity="info">waiting</Alert>
            <Label color="success">Hoàn thành</Label>
          )}

          {param.row.status === "pending" && (
            // <Alert severity="info">waiting</Alert>
            <Label color="error">Chưa thanh toán</Label>
          )}

          {param.row.status === "ready" && (
            // <Alert severity="info">waiting</Alert>
            <Label color="success">Đã thanh toán</Label>
          )}
        </div>
      );

    }


  },
]

// ----------------------------------------------------------------------

const tomisecon = (mi) => {
  return +mi[0] * (60000 * 60) + +mi[1] * 60000;
};

function descendingComparator(a, b, orderBy) {
  if (tomisecon(b[orderBy]["startTime"]) < tomisecon(a[orderBy]["startTime"])) {
    return -1;
  }
  if (tomisecon(b[orderBy]["startTime"]) > tomisecon(a[orderBy]["startTime"])) {
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
    console.log(a[0]);
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    console.log(array);
    return filter(
      array,

      (_kitchen) =>
        _kitchen.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const getOptions = () => [

  { id: "progress", title: "Chờ giao hàng" },
  { id: "delivery", title: "Đang giao" },
  { id: "arrived", title: "Đã đến" },
  { id: "done", title: "Hoàn thành" },
  { id: "pending  ", title: "Chưa thanh toán" },
  { id: "ready", title: "Đã thanh toán" },

  { id: "", title: "Tất cả" },
];


const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;


export default function KitchenViewOrderList() {
  //callAPIKitchenGetListOrder========================================
  const dispatch = useDispatch();


  const [valueStarTime, setValueStarTime] = React.useState(new Date());

  const [select, setSelect] = useState("All");
  // const [haha, setHaha] = useState("All");

  const handleChange1 = async (event) => {
    console.log(event.target.value)
    setSelect(event.target.value === "All" ? "" : event.target.value);

    if (date) {
      dispatch(
        await callAPIGetListOderByDay(
          token,
          date,
          event.target.value === "All" ? "" : event.target.value
        )
      );
    }
  };

  const handleChange = (event) => {
    setMeal(event.target.value);
  };

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



  const handleDelete = (id) => {
    API("PUT", URL_API + `/kitchens/update-status/${id}`, null, token).then(
      (res) => {
        try {
          dispatch(callAPIKitchenGetListOrder());
        } catch (err) {
          alert("Ban faild " + id);
        }
      },
      []
    );
  };

  //callAPIKitchenGetListOrder========================================

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc ");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("timeSlot");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // console.log(orderBy);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderlist.map((n) => n.name);
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

  const [date, setDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await callAPIGetListOderByDay(token, date, null));
    };
    callAPI();
  }, [dispatch, date, token]);

  const orderlist = useSelector((state) => {
    return state.userReducer.listOderByDate;
  });

  //CHỌN BỮA ĂN

  const filteredKitchen = applySortFilter(
    orderlist,
    getComparator(order, orderBy),
    filterName
  );

  const isKitchenNotFound = filteredKitchen.length === 0;
  const [meal, setMeal] = React.useState("");



  const Button1 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC33"),
    backgroundColor: "#FFCC33",

    // display: "center"
  }));

  const row = []

  return (
    <Page title="Đơn hàng">
      <Paper
        elevation={3}
        sx={{
          padding: "2%",
          marginBottom: "10%",
          margin: "2%",
        }}>

        <PageHeader
          title="Thông tin đơn hàng trong ngày"
          subTitle="Vui lòng chọn ngày"
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
                  // onChange={(e) => { handleChange(e) }}
                  onChange={handleChange1}
                  // value={haha}
                  value={select}
                />
              </Grid>

            </Grid>
            <Box>
              <div style={{ height: '25rem', width: '60%', marginTop: '1%' }}>

                {orderlist ? <DataGrid
                  rows={orderlist}
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
