import { filter } from "lodash";
import { useState } from "react";
import { Link as useNavigate } from "react-router-dom";

// material
import {
  Card,
  Table,
  Stack,
  Paper,
  Box,
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
import jwt_decode from "jwt-decode";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import DatePicker from "../../components/Control/DatePicker";

import FormControl from "@mui/material/FormControl";

// mock

import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import * as moment from "moment";
// ----------------------------------------------------------------------
// ở đây fix được tên tên table
// ko nhát thiết phải thêm table head ở dưới

const TABLE_HEAD = [
  { id: "", label: "", alignRight: false },
  // { id: "id", label: "Mã đơn", alignRight: false },
  { id: "name", label: "Món ăn", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "station", label: "Điểm giao", alignRight: false },
  { id: "slot", label: "Buổi", alignRight: false },
  { id: "timeSlot", label: "Bắt đầu giao", alignRight: false },
  { id: "endTime", label: " Kết thúc giao", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "" },
];

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

  { id: "All", title: "Tất cả" },
];

export default function KitchenViewOrderList() {
  //callAPIKitchenGetListOrder========================================
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

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
  return (
    <Page title="Kitchen">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Paper
            sx={{
              background: "#FFCC33",
              color: "black",
              height: "50%",
              width: "33%",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                display: "flex",
                marginLeft: "7%",
                marginTop: "2%",
              }}
            >
              Đơn hàng trong ngày
            </Typography>
          </Paper>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <FormControl sx={{ width: "25%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày giao"
                value={date}
                onChange={(newValue) => {
                  const b = new Date(newValue).toLocaleDateString().split("/");
                  setDate(`${b[2]}-${b[1]}-${b[0]}`);
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

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
            date={date}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderlist.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredKitchen
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      // const Slot
                      const {
                        id,
                        subscription,
                        station,
                        food,
                        timeSlot,

                        status,
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left">{""}</TableCell>
                          {/* <TableCell align="left">{id}</TableCell> */}
                          <TableCell align="left">{food.name}</TableCell>
                          <TableCell align="left">
                            {subscription.customer.account.phone}
                          </TableCell>
                          <TableCell align="left">{station.name}</TableCell>
                          <TableCell align="left">
                            {/* {timeSlot.flag} */}
                            <div>
                              {timeSlot.flag === "0" && <Label>Sáng</Label>}
                              {timeSlot.flag === "1" && <Label>Trưa</Label>}
                              {timeSlot.flag === "2" && <Label>Chiều</Label>}
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            {timeSlot.startTime}
                          </TableCell>
                          <TableCell align="left">{timeSlot.endTime}</TableCell>

                          <TableCell align="left">
                            <div>
                              {status === "progress" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="warning">Chờ giao hàng</Label>
                              )}
                              {status === "delivery" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="warning">Đang giao</Label>
                              )}
                              {status === "arrived" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="success">Đã đến</Label>
                              )}
                              {status === "done" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="success">Hoàn thành</Label>
                              )}
                              {status === "pending" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="error">Chưa thanh toán</Label>
                              )}
                              {status === "ready" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="success">Đã thanh toán</Label>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={orderlist.length}
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
        </Card>
      </Container>
      {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
    </Page>
  );
}
