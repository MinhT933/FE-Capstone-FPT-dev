import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
  Card,
  Table,
  Stack,
  // Avatar,
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

//callAPI
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { callAPIgetListKitchen } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";

// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";
// import NewStationPopup from "src/pages/Station/NewStationPopup";
import KitchenMoreMenu from "./KitchenMoreMenu";
// mock
// import KITCHENLIST from "./KitchenSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import { CustomizedToast } from "../../components/Toast/ToastCustom";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "", label: " ", alignRight: false },

  { id: "fullName", label: "Tên bếp", alignRight: false },
  { id: "address", label: "Địa chỉ", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "ability", label: "Công suất", alignRight: false },
  // { id: "openTime", label: "Mở cửa", alignRight: false },
  { id: "email", label: "Email", alignRight: false },

  { id: "status", label: "Trạng thái", alignRight: false },
  // { id: "createdAt", label: "Ngày tạo", alignRight: false },
  // { id: "updatedAt", label: "Cập nhật", alignRight: false },
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
        _kitchen.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
const token = localStorage.getItem("token");

export default function KitchenList() {
  const location = useLocation();
  //callAPIgetListKitchen========================================
  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListKitchen(token));
    };
    callAPI();
  }, [dispatch]);

  // const token = localStorage.getItem("token");

  // var decoded = jwt_decode(token);
  // console.log(decoded);
  const Navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // var decoded = jwt_decode(token);
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


  const handleDelete = (id, fullName) => {
    API("PUT", URL_API + `/kitchens/status/${id}`, null, token).then((res) => {
      try {
        dispatch(callAPIgetListKitchen(token));

        CustomizedToast({
          message: `Đã cập nhập trạng thái ${fullName}`,
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

  const kitchen = useSelector((state) => {
    return state.userReducer.listKitchen;
  });

  //callAPIgetListKitchen========================================

  const [OpenPopUp, SetOpenPopUp] = useState(false);
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
      const newSelecteds = kitchen.map((n) => n.fullName);
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

  const filteredKitchen = applySortFilter(
    kitchen,
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

  const Button1 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC33"),
    backgroundColor: "#FFCC33",
    // width: "50%",
    // height: "70%",
    // display: "center"
  }));

  const isKitchenNotFound = filteredKitchen.length === 0;

  return (
    <Page title="Bếp">
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
          <ColorButton
            variant="contained"
            component={RouterLink}
            to="/dashboard/admin/newkitchen"
          >
            Thêm bếp
          </ColorButton>
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
                  rowCount={kitchen.length}
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
                        address,
                        phone,
                        ability,
                        email,
                        openTime,
                        closeTime,
                        status,
                        createdAt,
                        updatedAt,
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
                          <TableCell padding="checkbox">
                            {/* <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, fullName)}
                            /> */}
                          </TableCell>

                          <TableCell align="left">
                            {row.account.profile.fullName}
                          </TableCell>
                          <TableCell align="left">{address}</TableCell>

                          <TableCell align="left">
                            {row.account.phone}
                          </TableCell>
                          <TableCell align="left">{ability}</TableCell>
                          <TableCell align="left">
                            {row.account.profile.email}
                          </TableCell>

                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (row.account.status === "inActive" &&
                                  "error") ||
                                "success"
                              }
                            >
                              {row.account.status}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            <Button1
                              variant="outlined"
                              onClick={() => {
                                handleDelete(id, fullName);
                              }}
                            >
                              Đổi
                            </Button1>
                          </TableCell>

                          <TableCell align="left">
                            <Button1
                              variant="outlined"
                              display="TableCell"
                              component={RouterLink}
                              to={`${location.pathname}/updatekitchen/${id}`}
                            >
                              Chi tiết
                            </Button1>
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
            count={kitchen.length}
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
