import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as useNavigate } from "react-router-dom";

// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";
// mock
import { UserListHead } from "../../sections/@dashboard/user";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIgetAccountShipper } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import ShipperAccountListToolbar from "../../sections/@dashboard/user/ShipperAccountListToolbar";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "", label: "", alignRight: false },
  { id: "fullName", label: "Họ tên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { label: "Thay đổi trạng thái", alignRight: false },
  { label: "Chi tiết", alignRight: false },
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
        _stations.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ShipperAccount() {
  const getOptions = () => [
    { id: "active", title: "Hoạt động" },
    { id: "inActive", title: "Tạm nghỉ" },
    { id: "ban", title: "Bị cấm" },
    { id: "All", title: "Tất cả" },
  ];

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("fullName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //CALL API====================================================

  // const token = localStorage.getItem("token");

  // const decoded = jwt_decode(token);
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetAccountShipper(token));
    };
    callAPI();
  }, [dispatch, token]);

  const handleDelete = (id, fullName) => {
    API("PUT", URL_API + `/accounts/ban/${id}`, null, token).then((res) => {
      try {
        dispatch(callAPIgetAccountShipper(token));

        CustomizedToast({
          message: `Đã Cập nhập trạng thái ${fullName}`,
          type: "SUCCESS",
        });
      } catch (err) {
        CustomizedToast({
          message: `Cập nhập trạng thái ${fullName} thất bại`,
          type: "ERROR",
        });
      }
    }, []);
  };

  const handleActive = (id, fullName) => {
    API("PUT", URL_API + `/accounts/unBan/${id}`, null, token).then((res) => {
      try {
        dispatch(callAPIgetAccountShipper(token));

        CustomizedToast({
          message: `Đã Cập nhập trạng thái ${fullName}`,
          type: "SUCCESS",
        });
      } catch (err) {
        CustomizedToast({
          message: `Cập nhập trạng thái ${fullName} thất bại`,
          type: "ERROR",
        });
      }
    }, []);
  };

  const station = useSelector((state) => {
    return state.userReducer.accountShipper;
  });
  //CALL API=====================================================

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = station.map((n) => n.fullName);
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
    <Page title="Khách hàng">
      <Container>
        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          {decoded.role === "admin" && (
            <ButtonCustomize
              variant="contained"
              component={RouterLink}
              to="/dashboard/admin/newstation"
              nameButton="Thêm"
            />
          )}
        </Stack> */}

        <Card>
          <ShipperAccountListToolbar
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

                        fullName,

                        phone,
                        status,
                      } = row;
                      const isItemSelected = selected.indexOf(fullName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell> </TableCell>

                          {/* <TableCell align="left">{id}</TableCell> */}
                          <TableCell align="left">
                            {row.profile.fullName}
                          </TableCell>

                          <TableCell align="left">
                            {row.profile.email}
                          </TableCell>
                          <TableCell align="left">{phone}</TableCell>

                          <TableCell align="left">
                            <div>
                              {status === "inActive" && (
                                // <Alert severity="warning">inActive</Alert>
                                <Label color="warning">Tạm nghỉ</Label>
                              )}
                              {status === "active" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="success">Hoạt động</Label>
                              )}
                              {status === "ban" && (
                                // <Alert severity="info">waiting</Alert>
                                <Label color="error">Bị cấm</Label>
                              )}
                            </div>
                          </TableCell>

                          <TableCell align="left">
                            {status === "active" ? (
                              <ButtonCustomize
                                variant="outlined"
                                onClick={() => {
                                  handleDelete(id, fullName);
                                }}
                              >
                                Chặn
                              </ButtonCustomize>
                            ) : (
                              <ButtonCustomize
                                variant="outlined"
                                onClick={() => {
                                  handleActive(id, fullName);
                                }}
                              >
                                Mở chặn
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
        </Card>
      </Container>
      {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
    </Page>
  );
}
