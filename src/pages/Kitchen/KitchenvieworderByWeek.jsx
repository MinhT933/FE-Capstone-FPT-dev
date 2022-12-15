import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import Scrollbar from "./../../components/hook-form/Scrollbar";
import SearchNotFound from "./../../components/topbar/SearchNotFound";
import Page from "./../../components/setPage/Page";
import { UserListHead } from "../../sections/@dashboard/user";
// mock
// import food from "../../_mock/foodsample";

import { getFoodPrepareByWeek } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import OrderListByWeekToolBar from "../../sections/@dashboard/user/OrderListByWeekToolBar";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "images", name: "Hình", alignRight: false },
  { id: "name", label: "Tên", alignRight: false },
  { id: "quantity", label: "Số lượng", alignRight: false },
  { id: "deliveryDate", label: "Ngày giao", alignRight: false },
  { id: "description", label: "Mô tả", alignRight: false },
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
      (_user) =>
        _user.deliveryDate.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function KitchenvieworderByWeek() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("deliveryDate");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [open, setOpen] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState(null);
  // const handleClickOpen = React.useCallback((item) => {
  //   setOpen(true);
  //   setValue(item);
  // }, []);

  //   console.log(last_date);

  const handleDate = (date) => {
    date = new Date(date).toLocaleDateString().split("/");
    return date[2] + "-" + date[1] + "-" + date[0];
  };

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

  const getOptions = () => [
    { id: "active", title: "Đang bán" },
    { id: "inActive", title: "Ngưng bán" },
    { id: "All", title: "Tất cả" },
  ];

  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 7; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first + 1)).toUTCString();
  console.log(firstday);
  var lastday = new Date(curr.setDate(last)).toUTCString();

  const monthA = new Date(firstday).getMonth() + 1;
  const dateA = new Date(firstday).getDate().toString();
  const yearA = new Date(firstday).getFullYear().toString();

  const monthB = new Date(lastday).getMonth() + 1;
  const dateB = new Date(lastday).getDate().toString();
  const yearB = new Date(lastday).getFullYear().toString();

  let firstdate = yearA + "-" + monthA + "-" + dateA;
  let lastdate = yearB + "-" + monthB + "-" + dateB;
  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await getFoodPrepareByWeek(token, firstdate, lastdate));
    };
    callAPI();
  }, [dispatch, token, firstdate, lastdate]);

  //useSelector kéo data từ store(userReducer.js) zìa mà xài
  const foodPrepare = useSelector((state) => {
    return state.userReducer.listFoodPrepare;
  });

  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = foodPrepare.map((n) => n.name);
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

  const filterFood = applySortFilter(
    foodPrepare,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filterFood.length === 0;

  return (
    <Page title="Thức ăn">
      <Container maxWidth={false}>
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
          <OrderListByWeekToolBar
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
                  rowCount={foodPrepare.length}
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
                        nameFood,
                        quantity,
                        description,
                        deliveryDate,
                        image,
                      } = row;

                      const isItemSelected = selected.indexOf(nameFood) !== -1;

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
                            <Avatar alt={nameFood} src={image} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" noWrap>
                              {nameFood}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">{quantity}</TableCell>

                          <TableCell align="left">
                            {handleDate(deliveryDate)}
                          </TableCell>

                          <TableCell align="left">{description}</TableCell>
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
            count={foodPrepare.length}
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
    </Page>
  );
}
