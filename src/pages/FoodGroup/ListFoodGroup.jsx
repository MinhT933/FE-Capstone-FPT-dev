import React from "react";
import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
  Card,
  Table,
  Stack,
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
import { UserListHead } from "../../sections/@dashboard/user";

// import DnDFoodGroup from "./DnDFoodGroup";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { callAPIgetGroupFood } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import DetailFoodinGroup from "./PopUp/DetailFoodinGroup";
// import { createTheme, ThemeProvider } from "@mui/material";
import NewFoodGroup from "./PopUp/NewFoodGroup";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import GroupFoodListtoolbar from "../../sections/@dashboard/user/GroupFoodListtoolbar";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "", alignRight: false },
  { id: "name", label: "Tên", alignRight: false },
  { id: "quanlity", label: "Số món", alignRight: false },
  { id: "createday", label: "Ngày tạo", alignRight: false },
  { id: "updateday", label: "Ngày sửa", alignRight: false },
  { id: "des", label: "Mô tả", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "action", label: "Thay đổi trạng thái", alignRight: false },
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
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListFoodGroup() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [OpenPopUpDetail, SetOpenPopUpDetail] = useState(false);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [valueId, setValueId] = useState();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const GroupFood = useSelector((state) => {
    return state.userReducer.listGroupFood;
  });

  React.useEffect(() => {
    const getGroupfood = async () => {
      await dispatch(callAPIgetGroupFood(token));
    };
    getGroupfood();
  }, [dispatch]);

  const handleClickOpen = React.useCallback((item) => {
    setOpen(true);
    setValue(item);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = GroupFood.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const getOptions = () => [
    // { id: "waiting", title: "Waiting" },
    { id: "active", title: "Đang bán" },
    { id: "inActive", title: "Ngưng bán" },
    { id: "All", title: "Tất cả" },
  ];

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

  const filteredUsers = applySortFilter(
    GroupFood,
    getComparator(order, orderBy),
    filterName
  );
  //setColor button
  const ColorButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC33",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));

  const handleAccept = (id, name) => {
    API("PUT", URL_API + `/food-groups/active/${id}`, null, token).then(
      (res) => {
        console.log(res);
        try {
          dispatch(callAPIgetGroupFood(token));
          handleClose();
          CustomizedToast({
            message: `Đã cập nhập trạng thái ${name}`,
            type: "SUCCESS",
          });
        } catch (err) {
          CustomizedToast({
            message: `Có điều gì đó không đúng đã xảy ra ở ${name}`,
            type: "ERROR",
          });
        }
      }
    );
  };

  const handleReject = (id, name) => {
    API("PUT", URL_API + `/food-groups/remove/${id}`, null, token).then(
      (res) => {
        try {
          dispatch(callAPIgetGroupFood(token));
          handleClose();
          CustomizedToast({
            message: `Đã ngưng bán ${name} thành công`,
            type: "SUCCESS",
          });
        } catch (err) {
          CustomizedToast({
            message: `Có điều gì đó không đúng đã xảy ra ở ${name}`,
            type: "ERROR",
          });
        }
      }
    );
  };
  const isUserNotFound = filteredUsers.length === 0;

  const handleSelect = (id) => {
    SetOpenPopUpDetail(true);
    setValueId(id);
  };
  return (
    <Page title="Nhóm thức ăn">
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
          {decoded.role === "manager" && (
            <ColorButton
              variant="contained"
              component={RouterLink}
              to="#"
              onClick={() => {
                SetOpenPopUp(true);
              }}
            >
              Thêm nhóm thức ăn
            </ColorButton>
          )}
        </Stack>

        <Card>
          <GroupFoodListtoolbar
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
                  rowCount={GroupFood.length}
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
                        createdAt,
                        updatedAt,
                        status,
                        description,
                        foods,
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          // role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          displaySelectAll={false}
                          adjustForCheckbox={false}
                        >
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell onClick={() => handleSelect(id)}>
                            <Typography>{name}</Typography>
                          </TableCell>
                          <TableCell align="left">{foods.length}</TableCell>
                          <TableCell align="left">
                            {new Date(createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">
                            {new Date(updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>

                          <TableCell align="left">
                            <div>
                              {status === "inActive" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="error">Ngưng bán</Label>
                              )}
                              {status === "waiting" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="warning">Đang chờ...</Label>
                              )}
                              {status === "active" && (
                                <Label color="success">Đang bán</Label>
                              )}
                            </div>
                          </TableCell>
                          {/* <TableCell>
                            <ColorButton
                              sx={{ width: "100%" }}
                              variant="contained"
                              // component={RouterLink}
                              // to="#"
                              id="id"
                              onClick={() => {
                                SetOpenPopUpDetail(true);
                                setValueId(id);
                              }}
                            >
                              Chi tiết
                            </ColorButton>
                          </TableCell> */}

                          {/* {decoded.role === "manage" && ( */}
                          <TableCell align="center">
                            {/* {status === "active" ? (
                              <ButtonCustomize
                                nameButton="Ngưng bán"
                                onClick={() => handleReject(id, name)}
                              />
                            ) : (
                              // <IconButton
                              //   onClick={() => handleAccept(id, name)}
                              // >
                              //   <CheckIcon />
                              // </IconButton>
                              <ButtonCustomize
                                nameButton="Mở bán"
                                onClick={() => handleAccept(id, name)}
                              />
                            )} */}
                            <ButtonCustomize
                              variant="outlined"
                              onClick={() => handleClickOpen(row)}
                              nameButton={
                                status === "active" ? "Ngưng bán" : "Bán"
                              }
                            />
                          </TableCell>
                          {/* )} */}
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
            count={GroupFood.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
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
              onClick={
                value.status === "active"
                  ? () => handleReject(value.id, value.name)
                  : () => handleAccept(value.id, value.name)
              }
            />
          )}
        </Card>
      </Container>
      <NewFoodGroup
        OpenPopUp={OpenPopUp}
        SetOpenPopUp={SetOpenPopUp}
      ></NewFoodGroup>
      <DetailFoodinGroup
        OpenPopUpDetail={OpenPopUpDetail}
        SetOpenPopUpDetail={SetOpenPopUpDetail}
        id={valueId}
      />
    </Page>
  );
}
