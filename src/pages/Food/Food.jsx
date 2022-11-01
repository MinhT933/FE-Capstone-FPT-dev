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
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../sections/@dashboard/user";
// mock
// import food from "../../_mock/foodsample";

import { callAPIgetListFood } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Iconify from "../../components/hook-form/Iconify";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import { Button } from "@mui/joy";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "images", name: "Hình", alignRight: false },
  { id: "name", label: "Tên", alignRight: false },
  { id: "price", label: "Giá", alignRight: false },
  { id: "type", label: "Phân loại", alignRight: false },

  { id: "createdate", label: "Ngày thêm", alignRight: false },
  { id: "updatedate", label: "Ngày sửa", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "description", label: "Mô tả", alignRight: false },
  { id: "SetStatus", label: "Thay đổi trạng thái", alignRight: false },
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
const getIcon = (name) => (
  <Iconify icon={name} width={15} height={15} color={"red"} />
);

export default function Food() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [categoryName, setcategoryName] = useState([]);

  const dispatch = useDispatch();

  //gọi trên action.js ==> accctions.js
  //đây khởi chạy lần đầu tiên gọi thằng gọi tra gg để useEffect()
  // theo toa hiểu  ở đây useEffect sẽ được gọi mỗi khi components thay đổi
  // kiểu cái gì mà ko có lần đầu tiên project cũng vậy cũng có lần đầu tiên gọi api chứu

  // nó lifecycle gg.com để biết thêm thông tin

  // cách search một vần đề why  + 'vấn đề ' in 'thư viện or component'
  //vd: why slectBox not working in mui
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
  const location = useLocation();

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListFood(token));
    };
    callAPI();
  }, [dispatch]);

  const handleDelete = (id) => {
    API("PUT", URL_API + `/foods/update-status/${id}`, null, token).then(
      (res) => {
        try {
          dispatch(callAPIgetListFood(token));
        } catch (err) {
          alert("Ban fail" + id);
        }
      },
      []
    );
  };

  //useSelector kéo data từ store(userReducer.js) zìa mà xài
  const food = useSelector((state) => {
    return state.userReducer.listFood;
  });
  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = food.map((n) => n.name);
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
    food,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filterFood.length === 0;

  return (
    <Page title="food">
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
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1200 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={food.length}
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
                        name,
                        price,
                        description,
                        createdAt,
                        updatedAt,
                        status,
                        foodCategory,
                        image,
                      } = row;

                      const isItemSelected = selected.indexOf(name) !== -1;

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
                            <Avatar alt={name} src={image} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{price}</TableCell>
                          <TableCell align="left">
                            {foodCategory.name}
                          </TableCell>
                          <TableCell align="left">
                            {new Date(createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">
                            {new Date(updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "inActive" && "error") || "success"
                              }
                            >
                              {status}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>

                          <TableCell align="left">
                            {decoded.role === "manager" && (
                              <ButtonCustomize
                                nameButton="Cập nhập"
                                onClick={() => handleDelete(id, token)}
                              />
                            )}
                          </TableCell>

                          <TableCell align="right">
                            {/* <UserMoreMenu id={id} /> */}
                          </TableCell>
                          <TableCell align="right">
                            <ButtonCustomize
                              nameButton="Chi Tiết"
                              component={RouterLink}
                              to={`${location.pathname}/${id}`}
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
            count={food.length}
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
