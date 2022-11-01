import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
  Card,
  Table,
  Stack,
  // Avatar,
  Paper,
  Box,
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

//callAPI
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { callAPIKitchenGetListOrder } from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import DatePicker from "../../components/Control/DatePicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// import NewStationPopup from "src/pages/Station/NewStationPopup";
// import KitchenMoreMenu from "./KitchenMoreMenu";
// mock
import KITCHENVIEWORDERLIST from "./KitchenViewOrderSample";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import KitchenListToolbar from "./../../sections/@dashboard/user/KitchenListToolbar";

// ----------------------------------------------------------------------
// ở đây fix được tên tên table
// ko nhát thiết phải thêm table head ở dưới

const TABLE_HEAD = [
  { id: "id", label: "Mã đơn", alignRight: false },
  { id: "name", label: "Người đặt", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "station", label: "Điểm giao", alignRight: false },
  { id: "order", label: "Món ăn", alignRight: false },
  { id: "note", label: "Ghi chú", alignRight: false },
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
        _kitchen.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function KitchenViewOrderList() {
  //callAPIKitchenGetListOrder========================================
  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIKitchenGetListOrder());
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

  const handleDelete = (id) => {
    API("PUT", URL_API + `/kitchens/update-status/${id}`, null, token).then(
      (res) => {
        try {
          dispatch(callAPIKitchenGetListOrder());
        } catch (err) {
          alert("Ban faild " + id);
        }
      },
      []
    );
  };

  const kitchen = useSelector((state) => {
    return state.userReducer.listKitchen;
  });

  //callAPIKitchenGetListOrder========================================

  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = KITCHENVIEWORDERLIST.map((n) => n.name);
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
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - KITCHENVIEWORDERLIST.length) : 0;

  const filteredKitchen = applySortFilter(
    KITCHENVIEWORDERLIST,
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

    // display: "center"
  }));

  const isKitchenNotFound = filteredKitchen.length === 0;

  //LỊCH CHỌN NGÀY TRONG TUẦN
  const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  const [value, setValue] = React.useState(dayjs());

  //CHỌN BỮA ĂN
  const [meal, setMeal] = React.useState("");

  const handleChange = (event) => {
    setMeal(event.target.value);
  };

  return (
    <Page title="Kitchen">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Paper
            sx={{
              background: "#FFCC33",
              color: "black",
              height: "50%",
              width: "33%",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                display: "flex",
                marginLeft: "7%",
                marginTop: "2%",
              }}
            >
              Đơn hàng trong ngày
            </Typography>
          </Paper>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <FormControl sx={{ width: "25%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                inputFormat="DD-MM-YYYY"
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <input ref={inputRef} {...inputProps} />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </FormControl>

          {/* CHỌN BỮA ĂN */}
          <FormControl sx={{ minWidth: 120, marginRight: "67%" }}>
            <InputLabel id="demo-simple-select-helper-label">Buổi</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={meal}
              label="Buổi"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Sáng</MenuItem>
              <MenuItem value={20}>Trưa</MenuItem>
              <MenuItem value={30}>Tối</MenuItem>
            </Select>
          </FormControl>
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
                  rowCount={KITCHENVIEWORDERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredKitchen
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, phone, station, order, note, status } =
                        row;
                      const isItemSelected = selected.indexOf(id) !== -1;

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
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">{station}</TableCell>
                          <TableCell align="left">{order}</TableCell>
                          <TableCell align="left">{note}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "Cooking" && "error") || "success"
                              }
                            >
                              {status}
                            </Label>
                          </TableCell>
                          {/* <Button1 sx={{ marginTop: "10%", marginRight: "8%", marginBottom: "5%" }} */}

                          <TableCell align="left">
                            {decoded.role === "kitchen" && (
                              <ButtonCustomize
                                nameButton="Cập nhập"
                                onClick={() => handleDelete(id, token)}
                              />
                            )}
                          </TableCell>

                          {/* <Button1 sx={{ marginTop: "7%", }}
                                                        variant="outlined"
                                                        component={RouterLink}
                                                        to="/dashboard/admin/updatekitchen"

                                                    >
                                                        Cập nhập
                                                    </Button1> */}

                          {/* <TableCell align="right"> */}
                          {/* //props */}
                          {/* <KitchenMoreMenu id={id} /> */}
                          {/* </TableCell> */}
                        </TableRow>
                      );
                    })}
                  {/* {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )} */}
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
            count={KITCHENVIEWORDERLIST.length}
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
