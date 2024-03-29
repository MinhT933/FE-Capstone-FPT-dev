import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Table,
} from "@mui/material";
// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

import { UserListHead } from "../../sections/@dashboard/user";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIgetListStation } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import StationListtoolbar from "../../sections/@dashboard/user/StationListtoolbar";
import moment from "moment";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "", alignRight: false },
  { id: "name", label: "Tên trạm", alignRight: false },
  { id: "address", label: "Địa chỉ", alignRight: false },
  { id: "phone", label: "Số điện thoại", alignRight: false },
  { id: "time", label: "Thời gian hoạt động", alignRight: false },
  { id: "createAt", label: "Ngày tạo", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { label: "Thay đổi trạng thái", alignRight: false },
  { id: "detail", label: "Chi tiết", alignRight: false },
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

export default function StationList() {
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

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  //CALL API====================================================
  const location = useLocation();
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

  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListStation(token));
    };
    callAPI();
  }, [dispatch, token]);

  const handleDelete = (id, name) => {
    API("PUT", URL_API + `/stations/update-status/${id}`, null, token).then(
      (res) => {
        try {
          dispatch(callAPIgetListStation(token));
          handleClose();
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
    return state.userReducer.listStation;
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
    <Page title="Trạm">
      <Container maxWidth={false}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {/* User */}
          </Typography>
          {decoded.role === "admin" && (
            <ButtonCustomize
              variant="contained"
              component={RouterLink}
              to="/dashboard/admin/newstation"
              nameButton="Thêm trạm"
            />
          )}
        </Stack>

        <Card>
          <StationListtoolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
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
                      console.log(row);
                      const {
                        id,
                        name,
                        phone,
                        address,
                        openTime,
                        createdAt,
                        closeTime,
                        status,
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left">{""}</TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{phone}</TableCell>

                          <TableCell align="left">
                            <div>
                              {moment(openTime, "HH:mm:ss").format("hh:mm")} -
                              {moment(closeTime, "HH:mm:ss").format("hh:mm")}
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            {new Date(createdAt).toLocaleDateString()}
                          </TableCell>

                          <TableCell align="left">
                            <div>
                              {status === "inActive" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="error">Đóng cửa</Label>
                              )}
                              {status === "active" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="success">Hoạt động</Label>
                              )}
                            </div>
                          </TableCell>

                          <TableCell align="left">
                            <ButtonCustomize
                              variant="outlined"
                              onClick={() => handleClickOpen(row)}
                              nameButton={status === "active" ? "Đóng" : "Mở "}
                            />
                          </TableCell>

                          <TableCell align="left">
                            {decoded.role === "admin" && (
                              <ButtonCustomize
                                variant="outlined"
                                display="TableCell"
                                component={RouterLink}
                                width="5rem"
                                to={`${location.pathname}/updatestation/${id}`}
                                nameButton="Chi tiết"
                              >
                                Chi tiết
                              </ButtonCustomize>
                            )}
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
          {open && (
            <ConfirmDialog
              open={open}
              content={value.name}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              onClick={() => handleDelete(value.id, value.name)}
            />
          )}
        </Card>
      </Container>
      {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
    </Page>
  );
}
