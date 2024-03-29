import * as React from "react";
import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// material
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
// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

//callAPI
import { callAPIgetListShipper } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


// mock
// import ADMINSHIPPERLIST from "./AdminShipperSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

import ButtonCustomize from "../../components/Button/ButtonCustomize";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "", label: "" },
  { id: "fullName", label: "Họ Tên", alignRight: false },
  // { id: "id", label: "Mã tài xế", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "noPlate", label: "Biển số xe", alignRight: false },
  { id: "vehicleType", label: "Loại xe", alignRight: false },
  { id: "email", label: "Tên tài khoản", alignRight: false },
  { id: "kitchenID", label: "Bếp", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
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
      (_kitchen) =>
        _kitchen.account.profile.fullName
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      // console.log(_kitchen)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AdminShipperList() {
  //CallAPIgetListShipper=====================================
  const location = useLocation();

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // var decoded = jwt_decode(token);
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListShipper(token));
    };
    callAPI();
  }, [dispatch, token]);

  const shipper = useSelector((state) => {
    return state.userReducer.listShipper;
  });
  // const token = localStorage.getItem("token");

  //CallAPIgetListShipper=====================================

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("fullName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = shipper.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, fullName) => {
  //   const selectedIndex = selected.indexOf(fullName);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, fullName);
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

  // const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ADMINSHIPPERLIST.length) : 0;

  const filteredKitchen = applySortFilter(
    shipper,
    getComparator(order, orderBy),
    filterName
  );


  const isKitchenNotFound = filteredKitchen.length === 0;

  return (
    <Page title="Người giao hàng">
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

          {/* {token.role === "admin" && ( */}
          <ButtonCustomize
            variant="contained"
            component={RouterLink}
            to="/dashboard/admin/newshipper"
            nameButton="Thêm tài xế"
          >
            Thêm tài xế
          </ButtonCustomize>
          {/* )} */}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={shipper.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredKitchen
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                
                        fullName,
                 
                        noPlate,
                        vehicleType,
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

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={fullName}
                                src={row.profile?.avatar}
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
                            {row.account.profile?.email}
                          </TableCell>
                          <TableCell align="left">
                            {row.kitchen?.address}
                          </TableCell>

                          <TableCell align="left">
                            <div>
                              {status === "inActive" && (
                                <Label color="warning">Tạm nghỉ</Label>
                              )}
                              {status === "active" && (
                                <Label color="success">Hoạt động</Label>
                              )}
                              {status === "ban" && (
                                <Label color="error">Bị cấm</Label>
                              )}
                            </div>
                          </TableCell>

                          <TableCell align="left">
                            <ButtonCustomize
                              variant="outlined"
                              display="TableCell"
                              component={RouterLink}
                              to={`${location.pathname}/updateshipper/${id}`}
                              nameButton="Chi tiết"
                            >
                              Chi tiết
                            </ButtonCustomize>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>

                {isKitchenNotFound && (
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
            count={shipper.length}
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
