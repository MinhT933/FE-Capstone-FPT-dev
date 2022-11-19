import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

//callAPI
import * as React from "react";
import { callAPIgetShipperOfKitchen } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

// mock
// import KITCHENSHIPPERLIST from "./KitchenShipperSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

import RequestShipper from "./RequestShipper";
import DetailShipper from "./DetailShipper";
import jwt_decode from "jwt-decode";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "image", label: "", alignRight: false },
  { id: "fullName", label: "Họ Tên", alignRight: false },
  //   { id: "id", label: "Mã tài xế", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "noPlate", label: "Biển số xe", alignRight: false },
  { id: "vehicleType", label: "Loại xe", alignRight: false },
  //   { id: "email", label: "Tên tài khoản", alignRight: false },
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

const getOptions = () => [
  { id: "active", title: "Hoạt động" },
  { id: "inActive", title: "Tạm nghỉ" },
  { id: "", title: "Tất cả" },
];

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
        _kitchen.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function KitchenShipperList() {
  //CallAPIgetListShipper=====================================
  const dispatch = useDispatch();
  //     React.useEffect(() => {
  //       const callAPI = async () => {
  //         await dispatch(callAPIgetListShipper());
  //       };
  //       callAPI();
  //     }, [dispatch]);

  //     const handleDelete = (id) => {
  //       API("PUT", URL_API + `/shippers/update-status/${id}`).then((res) => {
  //         try {
  //           dispatch(callAPIgetListShipper());
  //         } catch (err) {
  //           alert("ban faild " + id);
  //         }
  //       }, []);
  //     };

  // const token = localStorage.getItem("token");

  const profiles = useSelector((state) => {
    return state.userReducer.profiles;
  });

  const idKitchen = profiles.id;
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

  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      dispatch(await callAPIgetShipperOfKitchen(token, idKitchen));
    };
    getfoodByFoodGroupId();
  }, [dispatch, idKitchen, token]);

  const shipperofkichen = useSelector((state) => {
    return state.userReducer.shipPerOfKitchen;
  });

  //CallAPIgetListShipper=====================================

  const [Open, setOpen] = useState(false);
  const [OpenDetail, setOpenDetail] = useState(false);
  const [valueId, setValueId] = useState();
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
      const newSelecteds = shipperofkichen.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, fullName) => {
    const selectedIndex = selected.indexOf(fullName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, fullName);
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
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipper.length) : 0;

  const filteredKitchen = applySortFilter(
    shipperofkichen,
    getComparator(order, orderBy),
    filterName
  );

  //setColor button
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC33",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));

  const handleDetails = (id) => {
    setOpenDetail(true);
    setValueId(id);
  };

  const isKitchenNotFound = filteredKitchen.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {/* User */}
          </Typography>

          <ColorButton variant="contained" onClick={() => setOpen(true)}>
            Yêu cầu thêm tài xế
          </ColorButton>
        </Stack>

        <Card>
          <UserListToolbar
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
                  rowCount={shipperofkichen.length}
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
                        // avatarUrl,
                        account,
                        // phone,
                        noPlate,
                        vehicleType,
                        status,
                        // email,
                        // kitchenID,
                      } = row;

                      const isItemSelected =
                        selected.indexOf(account.profile.fullName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => {
                            handleDetails(id);
                          }}
                        >
                          <TableCell >
                            <Avatar sx={{ marginLeft: "50%" }}
                              alt={account.profile.fullName}
                              src={account.profile.avatar}
                            />
                          </TableCell>
                          <TableCell >
                            <Typography variant="subtitle2" noWrap>
                              {account.profile.fullName}
                            </Typography>
                          </TableCell>


                          <TableCell align="left">{account.phone}</TableCell>
                          <TableCell align="left">{noPlate}</TableCell>
                          <TableCell align="left">{vehicleType}</TableCell>
                          {/* <TableCell align="left">
                            {row.profile.email}
                          </TableCell> */}
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "Closed" && "error") || "success"
                              }
                            >
                              {status}
                            </Label>
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
            count={shipperofkichen.length}
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
      <RequestShipper Open={Open} setOpen={setOpen} />
      <DetailShipper
        OpenDetail={OpenDetail}
        setOpenDetail={setOpenDetail}
        id={valueId}
      />
    </Page>
  );
}
