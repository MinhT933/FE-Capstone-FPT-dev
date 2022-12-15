import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
// import { Link as useLocation } from "react-router-dom";

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  Avatar,
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
// import NewStationPopup from "src/pages/Station/NewStationPopup";
// mock
// import STATIONLIST from "./StationSample";
import { UserListHead } from "../../sections/@dashboard/user";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIAdminGetListOrder } from "../../redux/action/acction";
import AdminOrderListToolBar from "../../sections/@dashboard/user/AdminOrderListToolBar";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "", label: "", alignRight: false },
  { id: "name", label: "Tên gói", alignRight: false },
  { id: "customerName", label: "Người đặt", alignRight: false },
  { id: "totalPrice", label: "Giá", alignRight: false },
  { id: "totalDate", label: "Tổng ngày", alignRight: false },
  { id: "totalMeal", label: "Tổng bữa ăn", alignRight: false },
  { id: "totalMeal", label: "Tổng món ăn", alignRight: false },
  { id: "address", label: "Địa điểm giao", alignRight: false },
  { id: "startDelivery", label: "Ngày bắt đầu giao", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
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
        _stations.packages.name.toLowerCase().indexOf(query.toLowerCase()) !==
        -1
      // console.log(_stations)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AdminOrderList() {
  const getOptions = () => [
    { id: "unComfirmed", title: "Chưa Xác nhận" },
    { id: "inProgress", title: "Đang giao" },
    { id: "done", title: "Hoàn thành" },
    { id: "cancel", title: "Hủy" },
    { id: "All", title: "Tất cả" },
  ];

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //CALL API====================================================

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIAdminGetListOrder(token));
    };
    callAPI();
  }, [dispatch, token]);

  const station = useSelector((state) => {
    return state.userReducer.listOrder;
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
      <Container maxWidth={false}>
        <Card>
          <AdminOrderListToolBar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
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
                        customer,
                        totalPrice,
                        packages,

                        status,
                        startDelivery,
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
                          <TableCell align="left"></TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={row.packages?.image} />
                              <Typography variant="subtitle2" noWrap>
                                {customer.name}
                              </Typography>
                              <Typography variant="subtitle2" noWrap>
                                {row.packages?.name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            {customer.account.profile?.fullName}
                          </TableCell>
                          <TableCell align="left">{totalPrice}</TableCell>
                          {/* <TableCell align="left">{phone}</TableCell> */}
                          <TableCell align="left">
                            {packages?.totalDate}
                          </TableCell>
                          <TableCell align="left">
                            {packages?.totalMeal}
                          </TableCell>
                          <TableCell align="left">
                            {packages?.totalFood}
                          </TableCell>
                          <TableCell align="left">{customer.address}</TableCell>
                          <TableCell align="left">{startDelivery}</TableCell>

                          {/* <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "inActive" && "error") || "success"
                              }
                            >
                              {row.packages.status}
                            </Label>
                          </TableCell> */}

                          <TableCell align="left">
                            <div>
                              {status === "unConfirmed" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="warning">Chưa xác nhận</Label>
                              )}
                              {status === "done" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="success">Hoàng thành</Label>
                              )}
                              {status === "inProgress" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="primary">Đang giao</Label>
                              )}
                              {status === "cancel" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="error">Hủy</Label>
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
