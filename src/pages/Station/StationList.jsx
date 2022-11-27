import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
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
import StationMoreMenu from "./StationMoreMenu";
// import NewStationPopup from "src/pages/Station/NewStationPopup";
// mock
// import STATIONLIST from "./StationSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIgetListStation } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import StationListtoolbar from "../../sections/@dashboard/user/StationListtoolbar";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "", alignRight: false },
  // { id: "id", label: "Mã trạm", alignRight: false },

  { id: "name", label: "Địa điểm", alignRight: false },
  { id: "address", label: "Địa chỉ", alignRight: false },
  { id: "phone", label: "Số điện thoại", alignRight: false },
  { id: "openTime", label: "Mở cửa", alignRight: false },
  { id: "closeTime", label: "Đóng cửa", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { label: "Thay đổi trạng thái", alignRight: false },
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
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //CALL API====================================================
  const location = useLocation();
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
  // const decoded = jwt_decode(token);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListStation(token));
    };
    callAPI();
  }, [dispatch]);

  const handleDelete = (id, name) => {
    API("PUT", URL_API + `/stations/update-status/${id}`, null, token).then(
      (res) => {
        try {
          dispatch(callAPIgetListStation(token));

          CustomizedToast({
            message: `Đã Cập nhập trạng thái ${name}`,
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
                      const {
                        id,
                        name,
                        phone,
                        address,
                        openTime,
                        closeTime,
                        status,
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          // role="checkbox"
                          // selected={isItemSelected}
                          // aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{""}</TableCell>

                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">{openTime}</TableCell>
                          <TableCell align="left">{closeTime}</TableCell>

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

                          <TableCell align="center">
                            {status === "active" ? (
                              <Button1
                                variant="outlined"
                                onClick={() => {
                                  handleDelete(id, name);
                                }}
                              >
                                Đóng
                              </Button1>
                            ) : (
                              <Button1
                                variant="outlined"
                                onClick={() => {
                                  handleDelete(id, name);
                                }}
                              >
                                Mở
                              </Button1>
                            )}
                          </TableCell>

                          <TableCell>
                            {decoded.role === "admin" && (
                              <Button1
                                variant="outlined"
                                display="TableCell"
                                component={RouterLink}
                                to={`${location.pathname}/updatestation/${id}`}
                              >
                                Chi tiết
                              </Button1>
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
        </Card>
      </Container>
      {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
    </Page>
  );
}
