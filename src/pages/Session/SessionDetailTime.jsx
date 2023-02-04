import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Table,
} from "@mui/material";
// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

import { UserListHead } from "../../sections/@dashboard/user";
import Box from "@mui/material/Box";

import { useDispatch } from "react-redux";
import TableHead from "@mui/material/TableHead";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  callAPIGetListSessionDetail,
  callAPIGetListTottalFood,
  sendIdSessions,
} from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import StationListtoolbar from "../../sections/@dashboard/user/StationListtoolbar";
import AddShipper from "./AddShipper";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import OrderinSessionToolBar from "../../sections/@dashboard/user/OrderinSessionToolBar";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "", alignRight: false },
  { id: "batch", label: "Túi", alignRight: false },
  { id: "name", label: "Tên Trạm", alignRight: false },
  { id: "batch", label: "Tổng đơn", alignRight: false },
  { id: "workDate", label: "Ngày giao hàng", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },

  { id: "" },
];

const TABLE_HEAD_TOTAL = [
  { id: "images", name: "Hình", alignRight: false },
  { id: "name", label: "Tên", alignRight: false },
  { id: "total", label: "Tống số", alignRight: false },
  { id: "description", label: "Mô tả", alignRight: false },
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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_stations) =>
        _stations.orders.packageItem.foodGroup.name
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function SessionDetailTime(props) {
  const { id } = props;
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");
  const [sessionID, setSessionID] = useState();
  const [OpenSetShipper, setOpenSetShipper] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openCell, setOpenCell] = useState([]);

  //CALL API====================================================
  const location = useLocation();
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

  const dispatch = useDispatch();

  React.useEffect(() => {
    const getDetailSession = async () => {
      await dispatch(callAPIGetListSessionDetail(token, id));
      await dispatch(callAPIGetListTottalFood(token, id));
    };
    getDetailSession();
  }, [dispatch, id, token]);

  const detailSession = useSelector((state) => {
    return state.userReducer.detailSession.batchs;
  });

  React.useEffect(() => {
    if (detailSession) {
      const tempArr = [];
      for (const item of detailSession) {
        tempArr.push({ id: item.id, value: false });
      }
      setOpenCell(tempArr);
    }
  }, [detailSession]);

  const detail = useSelector((state) => {
    return state.userReducer.detailSession;
  });

  //CALL API=====================================================
  //Thay đổi trạng thái
  const getOptions = () => [
    { id: "active", title: "Hoạt động" },
    { id: "inActive", title: "Đóng cửa" },
    { id: "All", title: "Tất cả" },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = detailSession.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const openChecked = React.useCallback(
    (id) => {
      if (openCell.length > 0) {
        return openCell.find((item) => item.id === id)?.value;
      }
    },
    [openCell]
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filter = applySortFilter(
    detailSession,
    getComparator(order, orderBy),
    filterName
  );

  const isStationNotFound = filter?.length === 0;

  return (
    <Page title="Phiên làm việc">
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
          {decoded.role === "admin" && (
            <ButtonCustomize
              variant="contained"
              component={RouterLink}
              to="/dashboard/admin/newstation"
              nameButton="Thêm trạm"
            />
          )}
        </Stack>

        <Card>
          {/* <OrderinSessionToolBar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={detailSession?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filter
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => {
                      console.log(row);
                      const { id, station, status, orders } = row;
                      return (
                        <>
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            sx={{ "& > *": { borderBottom: "unset" } }}
                          >
                            <TableCell>
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => {
                                  setOpenCell((prev) => {
                                    return prev.map((item) => {
                                      if (item.id === id) {
                                        return { ...item, value: !item.value };
                                      }
                                      return item;
                                    });
                                  });
                                }}
                              >
                                {openChecked(id) ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            </TableCell>
                            <TableCell align="left">Túi {index + 1}</TableCell>
                            <TableCell align="left">{station.name}</TableCell>
                            {/* <TableCell align="left">
                              {station.address}
                            </TableCell> */}
                            <TableCell align="left">{orders.length}</TableCell>
                            <TableCell align="left">
                              {detail.workDate}
                            </TableCell>

                            <TableCell align="left">
                              <div>
                                {status === "waiting" && (
                                  <Label color="warning">Đang xử lí</Label>
                                )}

                                {status === "ready" && (
                                  <Label color="primary">Sẵn sàng</Label>
                                )}
                                {/* {status === "ready" && (
                                  <Label color="primary">Sẵn sàng</Label>
                                )} */}
                                {status === "delivery" && (
                                  <Label color="primary">Đang tiến hành</Label>
                                )}
                                {status === "done" && (
                                  <Label color="success">Hoàn thành</Label>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              style={{
                                paddingBottom: 0,
                                paddingTop: 0,
                                marginLeft: 12,
                              }}
                              colSpan={3}
                            >
                              <Collapse
                                in={openChecked(id)}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 2 }}>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                  >
                                    Đơn hàng
                                  </Typography>
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Tên nhóm</TableCell>
                                        <TableCell>Tên khách hàng</TableCell>
                                        <TableCell>Số điện thoại</TableCell>
                                        <TableCell align="center">
                                          Tên món
                                        </TableCell>
                                        <TableCell align="center">
                                          Trạng thái
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {orders.map((i, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <TableCell>
                                              {i.packageItem.foodGroup.name}
                                            </TableCell>
                                            <TableCell>
                                              {
                                                i.subscription.account.profile
                                                  .fullName
                                              }
                                            </TableCell>
                                            <TableCell>
                                              {i.subscription.account.phone}
                                            </TableCell>

                                            {i.packageItem.foodGroup.foods.map(
                                              (item, index) => {
                                                return (
                                                  <TableRow>
                                                    <TableCell>
                                                      <Avatar
                                                        alt={item.name}
                                                        src={item.image}
                                                      />
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.name}
                                                    </TableCell>
                                                  </TableRow>
                                                );
                                              }
                                            )}

                                            <TableCell align="center">
                                              <div>
                                                {i.status === "waiting" && (
                                                  <Label color="Warning">
                                                    Đang chờ
                                                  </Label>
                                                )}

                                                {i.status === "ready" && (
                                                  <Label color="primary">
                                                    Sẵn sàng
                                                  </Label>
                                                )}
                                                {i.status === "delivery" && (
                                                  <Label color="primary">
                                                    Đang tiến hành
                                                  </Label>
                                                )}
                                                {i.status === "arrived" && (
                                                  <Label color="success">
                                                    Hoàng thành
                                                  </Label>
                                                )}
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  ;
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
            {/* <ButtonCustomize
              nameButton="Tạo chuyến"
              marginLeft="45%"
              marginTop="2%"
              onClick={async () =>
                await dispatch(sendIdSessions(token, id, Navigate))
              }
            /> */}
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={detailSession?.length}
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

      <AddShipper
        id={sessionID}
        setOpenSetShipper={setOpenSetShipper}
        OpenSetShipper={OpenSetShipper}
      />
    </Page>
  );
}
