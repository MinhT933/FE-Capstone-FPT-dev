import React from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { CustomizedToast } from "../Toast/ToastCustom";
import API from "../../Axios/API/API";
import { useDispatch } from "react-redux";
import { URL_API } from "../../Axios/URL_API/URL";
import ButtonCustomize from "../Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import { filter } from "lodash";
import { useSelector } from "react-redux";
import SearchNotFound from "../topbar/SearchNotFound";
import { UserListHead } from "../../sections/@dashboard/user";
import Scrollbar from "../hook-form/Scrollbar";
import Page from "../setPage/Page";
import Label from "../label/label";
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import SessionToolBarList from "../../sections/@dashboard/user/SessionToolBarList";
import ShipperAccountListToolbar from "../../sections/@dashboard/user/ShipperAccountListToolbar";

//----------------------------------------------------------------

const TABLE_HEAD = [
  { id: "images", name: "Hình", alignRight: false },
  { id: "name", label: "Tên", alignRight: false },
  { id: "price", label: "Giá", alignRight: false },
  { id: "type", label: "Phân loại", alignRight: false },
  { id: "createdAt", label: "Ngày thêm", alignRight: false },
  { id: "updatedate", label: "Ngày sửa", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "description", label: "Mô tả", alignRight: false },
  { id: "", label: "Bán/Ngưng bán", alignRight: false },
  { id: "detail", label: "Chi tiết món ăn", alignRight: false },
];

const TABLE_HEAD_SHIPPER = [
  { id: "images", name: "Hình", alignRight: false },
  { id: "name", label: "Tên", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
];

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
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}
export default function CreateTrip() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const location = useLocation();

  const getOptions = () => [
    { id: "active", title: "Đang bán" },
    { id: "inActive", title: "Ngưng bán" },
    { id: "All", title: "Tất cả" },
  ];
  React.useEffect(() => {
    const callAPI = async () => {
      //   await dispatch(callAPIgetListFood(token));
      //   await dispatch(callAPIgetListCategory(token));
    };
    callAPI();
  }, [dispatch, token]);

  const handleDelete = async (id) => {
    await API("PUT", URL_API + `/foods/update-status/${id}`, null, token)
      .then((res) => {
        // dispatch(callAPIgetListFood(token));

        CustomizedToast({
          message: "Cập nhập trạng thái thành công",
          type: "SUCCESS",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //useSelector kéo data từ store(userReducer.js) zìa mà xài
  const session = useSelector((state) => {
    // return state.userReducer.listFood;
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = session.map((n) => n.name);
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

  const filterSession = applySortFilter(
    session,
    getComparator(order, orderBy),
    filterName
  );
  // handle date
  const handleDate = (time) => {
    const a = new Date(time).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-${a[1]}-0${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
  };

  const isUserNotFound = filterSession?.length === 0;

  return (
    <Grid container>
      <Grid xs={8}>
        <Page title="Phiên làm việc">
          <Container maxWidth={false}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                {/* <Icon icon="emojione-monotone:pot-of-session" fontSize={100} /> */}
              </Typography>

              {decoded.role === "manager" && (
                <ButtonCustomize
                  variant="contained"
                  component={RouterLink}
                  to="/dashboard/admin/newfood"
                  nameButton=" Thêm thức ăn"
                />
              )}
            </Stack>

            <Card>
              <SessionToolBarList
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
                      rowCount={session?.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {/* nhớ khởi tạo đúng tên file trong database */}
                      {filterSession
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            name,
                            price,
                            description,
                            createdAt,
                            updatedAt,
                            status,
                            foodCategory,
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
                              <TableCell>
                                <Avatar alt={name} src={image} />
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(price)}
                              </TableCell>
                              <TableCell align="left">
                                {foodCategory.name}
                              </TableCell>
                              <TableCell align="left">
                                {new Date(createdAt).toLocaleDateString()}
                                {/* {createdAt} */}
                                {/* {handleDate(createdAt)} */}
                              </TableCell>
                              <TableCell align="left">
                                {new Date(updatedAt).toLocaleDateString()}
                                {/* {handleDate(updatedAt)} */}
                              </TableCell>
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
                              <TableCell align="left">
                                <ButtonCustomize
                                  variant="outlined"
                                  width="6rem"
                                  //   onClick={() => handleClickOpen(row)}
                                  nameButton={
                                    status === "active" ? "Ngưng bán" : "Bán"
                                  }
                                />
                              </TableCell>
                              <TableCell align="left">
                                <ButtonCustomize
                                  nameButton="Chi tiết"
                                  component={RouterLink}
                                  to={`${location.pathname}/${id}`}
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
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={session?.length}
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
              {/* {open && (
                <ConfirmDialog
                  open={open}
                  content={value.name}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  onClick={() => handleDelete(value.id, value.name)}
                />
              )} */}
            </Card>
          </Container>
        </Page>
      </Grid>
      <Grid xs={4}>
        <Page title="">
          <Container maxWidth={false}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                {/* <Icon icon="emojione-monotone:pot-of-session" fontSize={100} /> */}
              </Typography>

              {decoded.role === "manager" && (
                <ButtonCustomize
                  variant="contained"
                  component={RouterLink}
                  to="/dashboard/admin/newfood"
                  nameButton=" Thêm thức ăn"
                />
              )}
            </Stack>

            <Card>
              <ShipperAccountListToolbar
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
                      headLabel={TABLE_HEAD_SHIPPER}
                      rowCount={session?.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {/* nhớ khởi tạo đúng tên file trong database */}
                      {filterSession
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            name,
                            price,
                            description,
                            createdAt,
                            updatedAt,
                            status,
                            foodCategory,
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
                              <TableCell>
                                <Avatar alt={name} src={image} />
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(price)}
                              </TableCell>
                              <TableCell align="left">
                                {foodCategory.name}
                              </TableCell>
                              <TableCell align="left">
                                {new Date(createdAt).toLocaleDateString()}
                                {/* {createdAt} */}
                                {/* {handleDate(createdAt)} */}
                              </TableCell>
                              <TableCell align="left">
                                {new Date(updatedAt).toLocaleDateString()}
                                {/* {handleDate(updatedAt)} */}
                              </TableCell>
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
                              <TableCell align="left">
                                <ButtonCustomize
                                  variant="outlined"
                                  width="6rem"
                                  //   onClick={() => handleClickOpen(row)}
                                  nameButton={
                                    status === "active" ? "Ngưng bán" : "Bán"
                                  }
                                />
                              </TableCell>
                              <TableCell align="left">
                                <ButtonCustomize
                                  nameButton="Chi tiết"
                                  component={RouterLink}
                                  to={`${location.pathname}/${id}`}
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
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={session?.length}
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
        </Page>
      </Grid>
      <Grid xs={12}>
        <Page title="">
          <Container maxWidth={false}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom></Typography>

              {decoded.role === "manager" && (
                <ButtonCustomize
                  variant="contained"
                  component={RouterLink}
                  to="/dashboard/admin/newfood"
                  nameButton=" Thêm thức ăn"
                />
              )}
            </Stack>

            <Card>
              <SessionToolBarList
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
                      rowCount={session?.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {/* nhớ khởi tạo đúng tên file trong database */}
                      {filterSession
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            name,
                            price,
                            description,
                            createdAt,
                            updatedAt,
                            status,
                            foodCategory,
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
                              <TableCell>
                                <Avatar alt={name} src={image} />
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(price)}
                              </TableCell>
                              <TableCell align="left">
                                {foodCategory.name}
                              </TableCell>
                              <TableCell align="left">
                                {new Date(createdAt).toLocaleDateString()}
                                {/* {createdAt} */}
                                {/* {handleDate(createdAt)} */}
                              </TableCell>
                              <TableCell align="left">
                                {new Date(updatedAt).toLocaleDateString()}
                                {/* {handleDate(updatedAt)} */}
                              </TableCell>
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
                              <TableCell align="left">
                                <ButtonCustomize
                                  variant="outlined"
                                  width="6rem"
                                  //   onClick={() => handleClickOpen(row)}
                                  nameButton={
                                    status === "active" ? "Ngưng bán" : "Bán"
                                  }
                                />
                              </TableCell>
                              <TableCell align="left">
                                <ButtonCustomize
                                  nameButton="Chi tiết"
                                  component={RouterLink}
                                  to={`${location.pathname}/${id}`}
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
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={session?.length}
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
        </Page>
      </Grid>
    </Grid>
  );
}
