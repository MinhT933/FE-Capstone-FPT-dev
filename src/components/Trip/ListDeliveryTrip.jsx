import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "./../../components/label/label";
import Scrollbar from "./../../components/hook-form/Scrollbar";
import SearchNotFound from "./../../components/topbar/SearchNotFound";
import Page from "./../../components/setPage/Page";
import { UserListHead } from "../../sections/@dashboard/user";
// mock
// import food from "../../_mock/foodsample";

import { callAPIgetTripall } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ButtonCustomize from "../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import ListdeliveryTriptoolBar from "../../sections/@dashboard/user/ListdeliveryTriptoolBar";
import ChangeShipper from "./ChangeShipper";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "Mã code", alignRight: false },
  { id: "kitchen", label: "Bếp", alignRight: false },
  { id: "shipper", label: "Shipper", alignRight: false },
  { id: "station", label: "Điểm giao ", alignRight: false },
  { id: "deliveryTime", label: "Bắt đâu giao ", alignRight: false },
  { id: "arrivedTime", label: "Kêt thúc giao ", alignRight: false },
  { id: "time", label: "Thời gian giao hàng ", alignRight: false },
  { id: "date", label: "Ngày giao hàng", alignRight: false },
  { id: "order", label: "Số đơn", alignRight: false },
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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user?.deliveryDate?.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function ListDeliveryTrip() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [valueId, setValueId] = useState();
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("createdAt");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    Navigate("/");
  }

  const getOptions = () => [
    { id: "active", title: "Đang bán" },
    { id: "inActive", title: "Ngưng bán" },
    { id: "All", title: "Tất cả" },
  ];
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetTripall(token));
    };
    callAPI();
  }, [dispatch, token]);

  const handleSelect = (id) => {
    SetOpenPopUp(true);
    setValueId(id);
  };

  const trip = useSelector((state) => {
    return state.userReducer.tripbyStatus;
  });

  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = trip.map((n) => n.name);
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

  const filterFood = applySortFilter(
    trip,
    getComparator(order, orderBy),
    filterName
  );

  console.log(trip);

  const isUserNotFound = filterFood?.length === 0;

  return (
    <Page title="Danh sách chuyến giao hàng">
      <Container maxWidth={false}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {/* <Icon icon="emojione-monotone:pot-of-food" fontSize={100} /> */}
          </Typography>

          {decoded.role === "manager" && (
            <ButtonCustomize
              variant="contained"
              component={RouterLink}
              to="/dashboard/manager/tripDelivery"
              nameButton=" Tạo Chuyến"
            />
          )}
        </Stack>

        <Card>
          <ListdeliveryTriptoolBar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
          />
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={trip?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {/* nhớ khởi tạo đúng tên file trong database */}
                  {filterFood
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      const {
                        id,
                        kitchen,
                        station,
                        status,
                        deliveryTime,
                        arrivedTime,
                        time_slot,
                        deliveryDate,
                        order,
                        shipper,
                      } = row;

                      const isItemSelected =
                        selected.indexOf(kitchen.account.profile.fullName) !==
                        -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" noWrap>
                              {kitchen.account.profile.fullName}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            {shipper.account.profile.fullName}
                          </TableCell>
                          <TableCell align="left">{station.address}</TableCell>
                          {status === "arrived" || status === "delivery" ? (
                            <TableCell align="left">{deliveryTime}</TableCell>
                          ) : (
                            <TableCell align="left"></TableCell>
                          )}
                          {status === "arrived" ? (
                            <TableCell align="left">{arrivedTime}</TableCell>
                          ) : (
                            <TableCell align="left"></TableCell>
                          )}
                          <TableCell align="left">
                            {time_slot.startTime}-{time_slot.endTime}
                          </TableCell>
                          <TableCell align="left">{deliveryDate}</TableCell>
                          <TableCell align="left">{order.length}</TableCell>
                          <TableCell align="left">
                            <div>
                              {status === "reject" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="error">Từ chối</Label>
                              )}
                              {status === "waiting" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="warning">Đang chờ</Label>
                              )}
                              {status === "arrived" && (
                                <Label color="success">Đã giao</Label>
                              )}
                              {status === "delivery" && (
                                <Label color="secondary">Đang giao</Label>
                              )}
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            {status === "reject" && (
                              <ButtonCustomize
                                variant="outlined"
                                onClick={() => handleSelect(id)}
                                nameButton="Đổi shipper"
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                {isUserNotFound && (
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
            count={trip?.length}
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
      <ChangeShipper
        OpenPopUp={OpenPopUp}
        SetOpenPopUp={SetOpenPopUp}
        id={valueId}
        // status={status}
      ></ChangeShipper>
    </Page>
  );
}
