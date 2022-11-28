import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
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
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIAdminGetListOrder, callAPIgetListStation } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import KitchenListToolbar from "../../sections/@dashboard/user/KitchenListToolbar";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "", label: "", alignRight: false },
  { id: "name", label: "Tên gói", alignRight: false },
  { id: "totalPrice", label: "Giá", alignRight: false },
  { id: "totalDate", label: "Tổng ngày", alignRight: false },
  { id: "totalMeal", label: "Tổng bữa ăn", alignRight: false },
  { id: "totalMeal", label: "Tổng món ăn", alignRight: false },
  { id: "startDelivery", label: "Ngày giao", alignRight: false },

  { id: "status", label: "Trạng thái", alignRight: false },
  // { label: "Thay đổi trạng thái", alignRight: false },
  // { id: "" },
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
        _stations.packages.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      // console.log(_stations)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AdminOrderList() {
  const getOptions = () => [
    { id: "unComfirmed", title: "Hoạt động" },
    { id: "inProgress", title: "Tạm nghỉ" },
    { id: "done", title: "Bị cấm" },
    { id: "cancel", title: "Bị cấm" },
    { id: "All", title: "Tất cả" },
  ];


  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //CALL API====================================================
  const location = useLocation();

  const token = localStorage.getItem("token");

  const decoded = jwt_decode(token);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIAdminGetListOrder(token));
    };
    callAPI();
  }, [dispatch]);

  const handleDelete = (id, name) => {
    API("PUT", URL_API + `/subscriptions/confirm/${id}`, null, token).then(
      (res) => {
        try {
          dispatch(callAPIAdminGetListOrder(token));

          CustomizedToast({
            message: `Đã cập nhập trạng thái ${name}`,
            type: "SUCCESS",
          });

        } catch (err) {
          CustomizedToast({
            message: `Cập nhập trạng thái ${name} thất bại`,
            type: "ERROR",
          });
        }
      },
      []
    );
  };

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

  return (
    <Page title="Đơn hàng">
      <Container maxWidth={false}>

        <Card>
          <KitchenListToolbar
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
                        phone,
                        image,
                        address,
                        openTime,
                        closeTime,
                        status,
                        totalPrice,
                        packages,
                        totalDate,
                        totalMeal,
                        totalFood,
                        totalStation,
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
                              <Avatar
                                alt={name}
                                src={row.packages?.image}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {row.packages?.name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          {/* <TableCell align="left">{packages?.name}</TableCell> */}
                          <TableCell align="left">{totalPrice}</TableCell>
                          {/* <TableCell align="left">{phone}</TableCell> */}
                          <TableCell align="left">{packages?.totalDate}</TableCell>
                          <TableCell align="left">{packages?.totalMeal}</TableCell>
                          <TableCell align="left">{packages?.totalFood}</TableCell>
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
                              {row.packages.status === "inActive" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="error">Đã giao</Label>
                              )}
                              {row.packages.status === "active" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="success">Đang giao</Label>
                              )}
                            </div>
                          </TableCell>

                          {/* <TableCell align="center">
                            {status === "active" ? (
                              <Button1
                                variant="outlined"
                                onClick={() => { handleDelete(id, name) }}
                              >
                                Đang chuẩn bị
                              </Button1>
                            ) : (
                              <Button1
                                variant="outlined"
                                onClick={() => { handleDelete(id, name) }}
                              >
                                Đang chuẩn bị
                              </Button1>
                            )

                            }
                          </TableCell> */}
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
