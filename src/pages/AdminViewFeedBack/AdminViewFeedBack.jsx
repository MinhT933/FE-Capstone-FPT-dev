import { filter } from "lodash";
import { useState } from "react";

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components

import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { callAPIgetListFeedback } from "../../redux/action/acction";

// import NewStationPopup from "src/pages/Station/NewStationPopup";
// import KitchenMoreMenu from "./KitchenMoreMenu";
// mock

import { UserListHead } from "../../sections/@dashboard/user";

import Feedbacktoolbar from "../../sections/@dashboard/user/Feedbacktoolbar";
import { useNavigate } from "react-router-dom";
import Iconify from "../../components/hook-form/Iconify";

// ----------------------------------------------------------------------
// ở đây fix được tên tên table
// ko nhất thiết phải thêm table head ở dưới

const TABLE_HEAD = [
  { id: "id", label: "Mã đơn", alignRight: false },
  { id: "name", label: "Người đặt", alignRight: false },
  { id: "phone", label: "Điện thoại", alignRight: false },
  { id: "order", label: "Gói ăn", alignRight: false },
  { id: "ratePackage", label: "Đánh giá gói ăn", alignRight: false },
  { id: "rateFood", label: "Đánh giá món ăn", alignRight: false },
  { id: "rate", label: "Đánh giá giao hàng", alignRight: false },
  { id: "comment", label: "Nội dung đánh giá ", alignRight: false },
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

export default function AdminViewFeedBackList() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  //CALL API====================================================
  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListFeedback(token));
    };
    callAPI();
  }, [dispatch, token]);

  const feedback = useSelector((state) => {
    return state.userReducer.feedback;
  });
  //CALL API=====================================================

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = feedback.map((n) => n.name);
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

  const handlefilterRate = (e) => {
    const fillter = feedback.filter((c) => c.packageRate === e.target.value);
    return fillter;
  };

  // const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - station.length) : 0;

  const filteredStations = applySortFilter(
    feedback,
    getComparator(order, orderBy),
    filterName
  );

  const isStationNotFound = filteredStations.length === 0;

  return (
    <Page title="Home">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="h4" gutterBottom>
            Phản hồi khách hàng
          </Typography>
        </Stack>
        <Card Card>
          <Feedbacktoolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            // onChange={handlefilterRate(e)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1400 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={feedback.length}
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
                        customer,
                        packages,
                        foodRate,
                        comment,
                        packageRate,
                        deliveryRate,
                      } = row;
                      const isItemSelected =
                        selected.indexOf(customer.account.profile?.fullNam) !==
                        -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">
                            {customer.account.profile?.fullName}
                          </TableCell>
                          <TableCell align="left">
                            {customer.account.phone}
                          </TableCell>
                          <TableCell align="left">{packages.name}</TableCell>
                          {/* <TableCell align="left">{`${packageRate}/5`}</TableCell> */}
                          <TableCell align="left">
                            {packageRate === 0 && <></>}
                            {packageRate === 5 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {packageRate === 4 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {packageRate === 3 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {packageRate === 2 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {packageRate === 1 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {foodRate === 0 && <>0/5</>}
                            {foodRate === 5 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {foodRate === 4 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {foodRate === 3 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {foodRate === 2 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {foodRate === 1 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {deliveryRate === 0 && <>0/5</>}
                            {deliveryRate === 5 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {deliveryRate === 4 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {deliveryRate === 3 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {deliveryRate === 2 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                            {deliveryRate === 1 && (
                              <>
                                <Iconify
                                  icon="fluent-emoji-flat:star"
                                  width={22}
                                  height={22}
                                />
                              </>
                            )}
                          </TableCell>
                          <TableCell align="left">{comment}</TableCell>

                          <TableCell align="left"></TableCell>
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
            count={feedback.length}
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
