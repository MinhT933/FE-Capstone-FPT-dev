import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import * as React from "react";

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
  Avatar,
} from "@mui/material";
// components
import Label from "./../../components/label/label";
import Scrollbar from "./../../components/hook-form/Scrollbar";
import SearchNotFound from "./../../components/topbar/SearchNotFound";
import Page from "./../../components/setPage/Page";
import { UserListHead } from "../../sections/@dashboard/user";

import { callAPIGetListPackage } from "../../redux/action/acction";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import PackageListToolbar from "../../sections/@dashboard/user/PackageListToolbar";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

const TABLE_HEAD = [
  { id: "image", label: "", alignRight: false },
  { id: "name", label: "Tên", alignRight: false },
  { id: "price", label: "Giá", alignRight: false },
  // { id: "type", label: "Khung thời gian", alignRight: false, width: "5rem" },
  { id: "createdAt", label: "Ngày thêm", alignRight: false },
  { id: "updatedate", label: "Ngày sửa", alignRight: false },
  { id: "startSale", label: "Ngày bán", alignRight: false },
  { id: "endSale", label: "Ngày nghỉ bán", alignRight: false },
  { id: "totalMeal", label: "Buổi", alignRight: false },
  // { id: "totalfood", label: "Số món", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "description", label: "Mô tả", alignRight: false },
  { id: "", label: "Cập nhập", alignRight: false },
  { id: "", label: "Bán/Ngưng bán", alignRight: false },
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

const getOptions = () => [
  { id: "waiting", title: "Đang chờ" },
  { id: "active", title: "Đang bán" },
  { id: "inActive", title: "Ngưng bán" },
  { id: "All", title: "Tất cả" },
];
// console.log(getOptions().id);

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
      (_user) => _user.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PackageFood() {
  const location = useLocation();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [OpenPopUpDetail, SetOpenPopUpDetail] = useState(false);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const handleClickOpen = React.useCallback((item) => {
    setOpen(true);
    setValue(item);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const [valueId, setValueId] = useState();

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await callAPIGetListPackage(token));
    };
    callAPI();
  }, [dispatch, token]);

  const packagefood = useSelector((state) => {
    return state.userReducer.listFoodPackage;
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = packagefood.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDelete = async (id, date) => {
    const nowdate = new Date().toLocaleDateString();
    if (nowdate >= date) {
      await API("PUT", URL_API + `/packages/confirm/${id}`, null, token)
        .then((res) => {
          dispatch(callAPIGetListPackage(token));

          CustomizedToast({
            message: "Cập nhập trạng thái thành công",
            type: "SUCCESS",
          });

          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      CustomizedToast({
        message: "Chưa tới ngày mở bán",
        type: "ERROR",
      });
    }
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

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - packagefood.length) : 0;

  const filteredUsers = applySortFilter(
    packagefood,
    getComparator(order, orderBy),
    filterName
  );

  console.log(packagefood);

  // const isUserNotFound = filterFood.length === 0;
  const handleSelect = (id) => {
    // API('GET',URL_API + '/')
    SetOpenPopUpDetail(true);
    setValueId(id);
  };

  const handleAcceptRequest = (id, name) => {
    API("PUT", URL_API + `/packages/confirm/${id}`, null, token).then((res) => {
      try {
        dispatch(callAPIGetListPackage(token));
        CustomizedToast({
          message: `Đã Cập nhập trạng thái ${name}`,
          type: "SUCCESS",
        });
      } catch (err) {
        console.log(err);
        CustomizedToast({
          message: `Có điều gì đó không đúng đã xảy ra ở ${name}`,
          type: "ERROR",
        });
      }
    });
  };
  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title="Gói thức ăn">
      {/* <Container maxWidth={false}> */}
      <Container maxWidth={false} width={2800}>
        <Stack
          direction="row"
          alignItems="center"
          // justifyContent="space-between"
          justifyContent="right"
          spacing="1rem"
          mb={5}
        >
          <Typography variant="h4" gutterBottom></Typography>

          {decoded.role === "manager" && (
            <ButtonCustomize
              variant="contained"
              component={RouterLink}
              to="/dashboard/manager/newpackage"
              nameButton="Thêm gói ăn"
            />
          )}
        </Stack>
        <Card>
          <PackageListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
            // value
          />

          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={packagefood.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        price,
                        description,
                        createdAt,
                        updatedAt,
                        startSale,
                        endSale,
                        totalMeal,
                        // totalFood,
                        // totalStation,
                        status,
                        timeFrame,
                        image,
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
                          <TableCell onClick={() => handleSelect(id)}>
                            <Avatar alt={name} src={image} />
                          </TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(price)}
                          </TableCell>
                          {/* <TableCell align="left">{timeFrame.name}</TableCell> */}
                          <TableCell width="8%" align="left">
                            {new Date(createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">
                            {new Date(updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">
                            {new Date(startSale).toLocaleDateString()}
                          </TableCell>
                          <TableCell width="8%" align="left">
                            {new Date(endSale).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">{totalMeal}</TableCell>
                          {/* <TableCell align="left">{totalFood}</TableCell> */}
                          {/* <TableCell align="left">{totalStation}</TableCell> */}
                          <TableCell align="left">
                            <div>
                              {status === "inActive" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="error">Ngưng bán</Label>
                              )}
                              {status === "waiting" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="warning">Đang chờ</Label>
                              )}
                              {status === "active" && (
                                <Label color="success">Đang bán</Label>
                              )}
                            </div>
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell>
                            {status === "inActive" && (
                              <ButtonCustomize
                                nameButton="Cập nhập"
                                width="6rem"
                                component={RouterLink}
                                to={`${location.pathname}/updatePackageFood/${id}`}
                              />
                            )}
                            {status === "waiting" && (
                              <ButtonCustomize
                                nameButton="Cập nhập"
                                width="6rem"
                                component={RouterLink}
                                to={`${location.pathname}/updatePackageFood/${id}`}
                              />
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <ButtonCustomize
                              variant="outlined"
                              width="6rem"
                              onClick={() => handleClickOpen(row)}
                              nameButton={
                                status === "active" ? "Ngưng bán" : "Mở bán"
                              }
                            />
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
            rowsPerPageOptions={[25, 10, 5]}
            component="div"
            count={packagefood.length}
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
              onClick={() =>
                handleDelete(
                  value.id,
                  new Date(value.startSale).toLocaleDateString()
                )
              }
            />
          )}
        </Card>
      </Container>
    </Page>
  );
}
