import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
// material
import {
  Card,
  Table,
  Stack,
  Box,
  Paper,
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
import { UserListHead } from "../../sections/@dashboard/user";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIGetListOderByDay } from "../../redux/action/acction";

import * as moment from "moment";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DatePicker from "../../components/Control/DatePicker";
import OrderListToolbar from "../../sections/@dashboard/user/OrderListToolbar";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "", label: "", alignRight: false },
  // { id: "id", label: "Mã đơn", alignRight: false },
  { id: "name", label: "Món ăn", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "station", label: "Điểm giao", alignRight: false },
  { id: "slot", label: "Buổi", alignRight: false },
  { id: "startTime", label: "Thời gian giao", alignRight: false },
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
      (_stations) =>
        _stations.food.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      // console.log(_stations)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function KitchenViewOrderList() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //CALL API====================================================
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  const dispatch = useDispatch();

  const station = useSelector((state) => {
    return state.userReducer.listOderByDate;
  });

  //CALL API=====================================================
  //Thay đổi trạng thái

  const getOptions = () => [
    { id: "progress", title: "Chờ giao hàng" },
    { id: "delivery", title: "Đang giao" },
    { id: "arrived", title: "Đã đến" },
    { id: "done", title: "Hoàn thành" },
    { id: "pending  ", title: "Chưa thanh toán" },
    { id: "ready", title: "Đã thanh toán" },
    { id: "All", title: "Tất cả" },
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

  return (
    <Page title="Đơn hàng">
      <Paper
        elevation={3}
        sx={{
          padding: "2%",
          marginBottom: "10%",
          // margin: "2%",
        }}
      >
        <Container maxWidth={false}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Paper
              sx={{
                justifyContent: "center",
                background: "#FFCC33",
                color: "black",
                height: "50%",
                width: "40%",
                marginLeft: "30%",
              }}
            >
              {/* <Typography
                variant="h3"
                gutterBottom
                sx={{
                  display: "flex",
                  // marginLeft: "7%",
                  marginTop: "2%",
                  justifyContent: "center",
                }}
              >
                Đơn hàng trong ngày
              </Typography> */}
            </Paper>
          </Stack>

          <Card>
            <OrderListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              options={getOptions()}
              // date={date}
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
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
                                {timeSlot.flag === 0 && "Sáng"}
                                {timeSlot.flag === 1 && "Trưa"}
                                {timeSlot.flag === 2 && "Chiều"}
                              </div>
                            </TableCell>
                            <TableCell align="left">
                              {/* {timeSlot.startTime} */}
                              <div>
                                {moment(timeSlot.startTime, "HH:mm:ss").format(
                                  "hh:mm"
                                )}{" "}
                                -{" "}
                                {moment(timeSlot.endTime, "HH:mm:ss").format(
                                  "hh:mm"
                                )}
                              </div>
                            </TableCell>
                            <TableCell align="left">
                              <div>
                                {status === "progress" && (
                                  <Label color="warning">Chờ giao hàng</Label>
                                )}
                                {status === "delivery" && (
                                  <Label color="warning">Đang giao</Label>
                                )}
                                {status === "arrived" && (
                                  <Label color="success">Đã đến</Label>
                                )}
                                {status === "done" && (
                                  <Label color="success">Hoàn thành</Label>
                                )}
                                {status === "pending" && (
                                  <Label color="error">Chưa thanh toán</Label>
                                )}
                                {status === "ready" && (
                                  <Label color="success">Đã thanh toán</Label>
                                )}
                              </div>
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
              count={station.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={"Số hàng trên một trang"}
              labelDisplayedRows={({ from, to, count }) => {
                return "" + from + "-" + to + " của " + count;
              }}
            />
          </Card>
        </Container>
      </Paper>
    </Page>
  );
}
