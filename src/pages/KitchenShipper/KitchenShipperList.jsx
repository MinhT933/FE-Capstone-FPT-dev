import { filter } from "lodash";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import * as React from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Avatar,
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

// import NewStationPopup from "src/pages/Station/NewStationPopup";
// mock
// import STATIONLIST from "./StationSample";
import { UserListHead } from "../../sections/@dashboard/user";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIgetListShipper } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";

import AdminShipperListToolBar from "../../sections/@dashboard/user/AdminShipperListToolBar";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import FreeShipper from "../Kitchen/FreeShipper";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "", alignRight: false },
  { id: "fullName", label: "Họ Tên", alignRight: false },
  // { id: "id", label: "Mã tài xế", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "noPlate", label: "Biển số xe", alignRight: false },
  { id: "vehicleType", label: "Loại xe", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  // { id: "kitchenID", label: "Bếp", alignRight: false },
  { id: "inWord", label: "Nhận đơn", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  // { label: "Thay đổi trạng thái", alignRight: false },
  // { label: "Chi tiết", alignRight: false },
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
        _stations.account.profile.fullName
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function KitchenShipperList() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  let { id } = useParams();
  const [OpenPopUpDetail, SetOpenPopUpDetail] = useState(false);

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
    // valid token format
  } catch (error) {
    // return <Navigate to="/" replace />;
    Navigate("/");
  }
  // const decoded = jwt_decode(token);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListShipper(token));
    };
    callAPI();
  }, [dispatch, token]);

  const handleDelete = (id, name) => {
    API("PUT", URL_API + `/shippers/status/${id}`, null, token).then((res) => {
      try {
        dispatch(callAPIgetListShipper(token));
        handleClose();
        CustomizedToast({
          message: `Đã cập nhập trạng thái ${name}`,
          type: "SUCCESS",
        });
      } catch (err) {
        handleClose();
        CustomizedToast({
          message: `Cập nhập trạng thái ${name} thất bại`,
          type: "ERROR",
        });
      }
    }, []);
  };

  const station = useSelector((state) => {
    return state.userReducer.listShipper;
  });
  //CALL API=====================================================
  //Thay đổi trạng thái
  const getOptions = () => [
    { id: "active", title: "Hoạt động" },
    // { id: "inActive", title: "Tạm nghỉ" },
    // { id: "delete", title: "Ngưng hoạt động" },
    { id: "ban", title: "Bị cấm" },

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

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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

  const ColorButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC32",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));

  return (
    <Page title="Người giao hàng">
      <Container maxWidth={false}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          marginTop={"2%"}
        >
          <Typography variant="h4" gutterBottom>
            {/* User */}
          </Typography>
          {decoded.role === "admin" && (
            <ButtonCustomize
              variant="contained"
              component={RouterLink}
              to="#"
              onClick={() => {
                SetOpenPopUp(true);
              }}
              nameButton=" Thêm tài xế cho bếp"
            />
          )}
        </Stack>

        <Card>
          <AdminShipperListToolBar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
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
                        fullName,
                        noPlate,
                        vehicleType,
                        status,
                        account,
                      } = row;

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

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={fullName}
                                src={row.account.profile?.avatar}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {row.account.profile?.fullName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            {row.account?.phone}
                          </TableCell>

                          <TableCell align="left">{noPlate}</TableCell>
                          <TableCell align="left">{vehicleType}</TableCell>

                          <TableCell align="left">
                            {" "}
                            {row.account.profile?.email}{" "}
                          </TableCell>
                          {/* <TableCell align="left">{row.kitchen?.address}</TableCell> */}

                          <TableCell align="left">
                            <div>
                              {/* {status === "inActive" && (
                                                                <Label color="warning">Tạm nghỉ</Label>
                                                            )} */}
                              {status === "active" && (
                                <Label color="success">Sẵn sàng</Label>
                              )}
                              {/* {status === "delete" && (
                                                                <Label color="error">Ngưng hoạt động</Label>
                                                            )} */}
                              {status === "inActive" && (
                                <Label color="error">Tạm nghỉ</Label>
                              )}
                            </div>
                          </TableCell>

                          <TableCell align="left">
                            <div>
                              {/* {status === "inActive" && (
                                                                <Label color="warning">Tạm nghỉ</Label>
                                                            )} */}
                              {account.status === "active" && (
                                <Label color="success">Hoạt động</Label>
                              )}
                              {/* {status === "delete" && (
                                                                <Label color="error">Ngưng hoạt động</Label>
                                                            )} */}
                              {account.status === "ban" && (
                                <Label color="error">Bị cấm</Label>
                              )}
                            </div>
                          </TableCell>

                          <TableCell align="left">

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
              content={value.account.profile?.fullName}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              onClick={() =>
                handleDelete(value.id, value.account.profile?.fullName)
              }
            />
          )}
        </Card>
      </Container>
      {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}

      <FreeShipper
        OpenPopUp={OpenPopUp}
        SetOpenPopUp={SetOpenPopUp}
      ></FreeShipper>
    </Page>
  );
}