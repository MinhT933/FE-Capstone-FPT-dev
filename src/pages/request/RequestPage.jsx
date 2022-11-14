import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
// components
import Label from "./../../components/label/label";
import Scrollbar from "./../../components/hook-form/Scrollbar";
import SearchNotFound from "./../../components/topbar/SearchNotFound";
import Page from "./../../components/setPage/Page";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

import { callAPIgetListReq } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import ReasionReject from "./ReasionReject";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import Addshipper from "./Addshipper";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "images", name: "", alignRight: false },
  { id: "name", label: "Lí do", alignRight: false },
  { id: "price", label: "Sô lượng tài xế", alignRight: false },
  { id: "quality", label: "Lí do từ chối", alignRight: false },
  { id: "createdate", label: "Ngày thêm", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "Confrim", label: "Xác nhận ", alignRight: false },
  { id: "Reject", label: "Từ chối", alignRight: false },
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

export default function RequestPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [categoryName, setcategoryName] = useState([]);
  const [valueId, setValueId] = useState();

  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleReject = (id) => {
    setOpen(true);
    setValueId(id);
  };

  const [Open, setOpen] = useState(false);
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
  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await callAPIgetListReq(token));
    };
    callAPI();
  }, [dispatch, token]);

  const request = useSelector((state) => {
    return state.userReducer.listRequests;
  });
  console.log(request);

  const getOptions = () => [
    { id: "waiting", title: "Đang chờ" },
    { id: "pending", title: "Chờ duyệt" },
    { id: "reject", title: "Từ chối" },
    { id: "processed", title: "Hoàn thành" },
    { id: "", title: "Tất cả" },
  ];

  const [OpenPopUp, setOpenPopUp] = useState(false);
  const [valueKitChenID, setValueKitChenID] = useState();
  const handleAccept = (id) => {
    // if (request.status === "waiting") {
    API("PUT", URL_API + `/request/${id}`, null, token).then((res) => {
      try {
        dispatch(callAPIgetListReq(token));
        CustomizedToast({
          message: `Đã chuyển trạng thái thành công`,
          type: "SUCCESS",
        });
      } catch (err) {
        CustomizedToast({
          message: `không thể thực hiện yêu cầu này vì đã xác nhận rồi`,
          type: "ERROR",
        });
      }
    }, []);
  };

  //useSelector kéo data từ store(userReducer.js) zìa mà xài

  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = request.map((n) => n.name);
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

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - food.length) : 0;

  const filterFood = applySortFilter(
    request,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filterFood.length === 0;

  return (
    <Page title="Quản lí yêu cầu">
      <Container>
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
              to="/dashboard/admin/newfood"
              nameButton=" Thêm thức ăn"
            />
          )}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 990 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={request.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {/* nhớ khởi tạo đúng tên file trong database */}
                  {filterFood
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        reason,
                        numberReq,
                        rejectReason,
                        status,
                        createdAt,
                        kitchen,
                      } = row;

                      const isItemSelected = selected.indexOf(reason) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{""}</TableCell>
                          <TableCell align="left">{reason}</TableCell>
                          <TableCell align="left">{numberReq}</TableCell>
                          <TableCell align="left">{rejectReason}</TableCell>
                          <TableCell align="left">
                            {new Date(createdAt).toLocaleDateString()}
                          </TableCell>
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
                              {status === "pending" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="secondary">Chờ duyệt</Label>
                              )}
                              {status === "processed" && (
                                <Label color="success">Hoàng thành</Label>
                              )}
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <ButtonCustomize
                              nameButton={
                                status === "waiting" ? "Chờ xử lí" : "duyệt"
                              }
                              onClick={() => {

                                if (status === "waiting") {
                                  status !== "reject"
                                    ? handleAccept(id, token)
                                    : CustomizedToast({
                                        message: `Đã Từ chối không thể đồng ý`,
                                        type: "ERROR",
                                      });
                                } else {
                                  setOpenPopUp(true);
                                  setValueKitChenID(kitchen.id);
                                  setValueId(id);
                                  // handleAccept(id, token);
                                }

                              }}
                            />
                          </TableCell>

                          <TableCell align="right">
                            <ButtonCustomize
                              nameButton="Từ chối"
                              onClick={() => {
                                status === "processed"
                                  ? CustomizedToast({
                                    message: `không thể thực hiện yêu cầu này vì đã xác nhận rồi`,
                                    type: "ERROR",
                                  })
                                  : handleReject(id, token);
                              }}
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
            count={request.length}
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
      <ReasionReject Open={Open} setOpen={setOpen} id={valueId} />
      <Addshipper
        Open={OpenPopUp}
        setOpen={setOpenPopUp}
        id={valueKitChenID}
        idre={valueId}
      />
    </Page>
  );
}
