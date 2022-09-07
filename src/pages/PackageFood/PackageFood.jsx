import { filter } from "lodash";
import { useState } from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
// import { Icon } from '@iconify/react';
// import { DataGrid } from '@mui/x-data-grid';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
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
import Label from "./../../components/label/label";
import Scrollbar from "./../../components/hook-form/Scrollbar";
import Iconify from "./../../components/hook-form/Iconify";
import SearchNotFound from "./../../components/topbar/SearchNotFound";
import Page from "./../../components/setPage/Page";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../sections/@dashboard/user";
// mock
import PACKAGELIST from "../../_mock/packagsample";
import NewUserPopup from "../../components/PopUp/NewUserPopup";

//Link routers


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Tên", alignRight: false },
  { id: "price", label: "Giá", alignRight: false },
  { id: "type", label: "phân loại", alignRight: false },
  { id: "createdate", label: "Ngày thêm", alignRight: false },
  { id: "updatedate", label: "Ngày ngày sửa", alignRight: false },
  { id: "startSale", label: "ngày bán", alignRight: false },
  { id: "endSale", label: "Không Bán", alignRight: false },
  { id: "totalMeal", label: "Tổng buổi ăn", alignRight: false },
  { id: "totalfood", label: "Tổng số thức ăn", alignRight: false },

  { id: "areaSale", label: "địa điểm bán", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  console.log(PACKAGELIST);
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

export default function PackageFood() {
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
      const newSelecteds = PACKAGELIST.map((n) => n.name);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PACKAGELIST.length) : 0;

  const filteredUsers = applySortFilter(
    PACKAGELIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="package">
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
         
            <Button
              variant="contained"
              component={RouterLink}
              startIcon={<Iconify icon="eva:plus-fill" />}
              to='/dashboard/newpackage'
            >
              Thêm Gói Ăn
            </Button>
        
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={PACKAGELIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        price,
                        description,
                        createDate,
                        updateDate,
                        startSale,
                        endSale,
                        totalMeal,
                        totalfood,
                        areaSale,
                        status,
                        datatype,
                        avatarUrl,
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
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{price}</TableCell>
                          <TableCell align="left">{datatype}</TableCell>
                          <TableCell align="left">{createDate}</TableCell>
                          <TableCell align="left">{updateDate}</TableCell>
                          <TableCell align="left">{startSale}</TableCell>
                          <TableCell align="left">{endSale}</TableCell>
                          <TableCell align="left">{totalMeal}</TableCell>
                          <TableCell align="left">{totalfood}</TableCell>
                          <TableCell align="left">{areaSale}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "active" && "error") || "success"
                              }
                            >
                              {status}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
            count={PACKAGELIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      
    </Page>
  );
}
