import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
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
// import session from "../../_mock/foodsample";

import {
  callAPIgetListFood,
  callAPIGetListSession,
} from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import SessionToolBarList from "./../../sections/@dashboard/user/SessionToolBarList";
import SessionDetail from "./SessionDetail";
import PageHeader from "../../components/PageHeader";
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "workDate", label: "Ngày làm việc", alignRight: false },

  { id: "createdAt", label: "Ngày thêm", alignRight: false },
  { id: "updatedate", label: "Ngày sửa", alignRight: false },
  { id: "timeSlot", label: "Buổi", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "", label: "Tạo chuyến", alignRight: false },

  // { id: "", label: "Xác nhận", alignRight: false },

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
//getICon

export default function Session() {
  const [page, setPage] = useState(0);
  const [OpenPopUpDetail, SetOpenPopUpDetail] = useState(false);
  const [valueId, setValueId] = useState();

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const handleClickOpen = React.useCallback((item) => {
    setOpen(true);
    setValue(item);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

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

  const handleDate = (date) => {
    const a = new Date(date).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-0${a[1]}-${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
  };

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIGetListSession(token, handleDate(new Date())));
    };
    callAPI();
  }, [dispatch, token]);

  const session = useSelector((state) => {
    return state.userReducer.flag;
  });

  const doneSession = async (id) => {
    await API("PUT", URL_API + `/sessions/done_session/${id}`, null, token)
      .then((res) => {
        dispatch(callAPIGetListSession(token, handleDate(new Date())));

        CustomizedToast({
          message: "Cập nhập trạng thái thành công",
          type: "SUCCESS",
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelect = (id) => {
    SetOpenPopUpDetail(true);
    setValueId(id);
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


  const handleCompareDate = (date) => {
    const toDate = new Date();
    const workDate = date.split("-");

    const a = toDate.toLocaleDateString().split("/");
    console.log(toDate.toLocaleDateString());
    console.log(workDate[2]);
    console.log(a[0]);
    console.log(workDate[1]);
    console.log(a[1]);

    if (a[0] > workDate[2] && a[1] > workDate[1]) {
      return true;
    }
    if (a[0] < workDate[2] && a[1] > workDate[1]) {
      return true;
    }
    if (a[0] > workDate[2] && a[1] < workDate[1]) {
      return false;
    }
    if (a[0] < workDate[2] && a[1] < workDate[1]) {
      return false;
    }
  };
  // handleCompareDate("2023-01-2");

  const isUserNotFound = filterSession.length === 0;
  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  return (
    <Page title="Phiên làm việc">
      <PageHeader
        title="Xem chi tiết phiên làm việc"
        subTitle={`thông tin chi tiết`}
        icon={getIcon("fluent-mdl2:work-item")}
      />
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
          />
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={session.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {/* nhớ khởi tạo đúng tên file trong database */}
                  {filterSession
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        workDate,
                        createdAt,
                        updatedAt,
                        status,
                        timeSlot,
                      } = row;

                      const isItemSelected = selected.indexOf(workDate) !== -1;

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
                            <Typography
                              variant="subtitle2"
                              noWrap
                              onClick={() => handleSelect(id)}
                            >
                              {workDate}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            {new Date(createdAt).toLocaleDateString()}
                            {/* {createdAt} */}
                            {/* {handleDate(createdAt)} */}
                          </TableCell>
                          <TableCell align="left">
                            {new Date(updatedAt).toLocaleDateString()}
                          </TableCell>

                          {timeSlot.flag === 0 && (
                            <TableCell align="left">Sáng</TableCell>
                          )}
                          {timeSlot.flag === 1 && (
                            <TableCell align="left">Trưa</TableCell>
                          )}
                          {timeSlot.flag === 2 && (
                            <TableCell align="left">Chiều</TableCell>
                          )}
                          <TableCell align="left">
                            <div>
                              {status === "processing" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="primary">Đang tiến hành</Label>
                              )}
                              {status === "waiting" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="warning">Đang chờ</Label>
                              )}
                              {status === "done" && (
                                <Label color="success">Hoàn thành</Label>
                              )}

                              {status === "ready" && (
                                <Label color="warning">Sẵn Sàng</Label>
                              )}

                            </div>
                          </TableCell>

                          <TableCell align="left">
                            <ButtonCustomize
                              variant="outlined"
                              width="6rem"
                              to={`${location.pathname}/updateSession/${id}`}
                              nameButton="Chi tiết"
                              component={RouterLink}
                            />
                          </TableCell>
                          <TableCell align="left">

                            {handleCompareDate(workDate) === true &&
                            status === "processing" ? (
                              <ButtonCustomize
                                variant="outlined"
                                width="6rem"
                                nameButton="Hoàn thành"
                                onClick={async () => {
                                  doneSession(id);
                                }}
                              />
                            ) : (
                              <TableCell></TableCell>
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
            count={session.length}
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
      <SessionDetail
        SetOpenPopUpDetail={SetOpenPopUpDetail}
        OpenPopUpDetail={OpenPopUpDetail}
        id={valueId}
      />
    </Page>
  );
}
