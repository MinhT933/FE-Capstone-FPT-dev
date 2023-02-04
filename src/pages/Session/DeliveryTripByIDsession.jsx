import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
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
  TableHead,
} from "@mui/material";
// components

import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { UserListHead } from "../../sections/@dashboard/user";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import Collapse from "@mui/material/Collapse";

import { callAPIGetListTripByID } from "../../redux/action/acction";
import Iconify from "../../components/hook-form/Iconify";
import Avatar from "@mui/material/Avatar";
import TripBySessionIDtoolbar from "./../../sections/@dashboard/user/TripBySessionIDtoolbar";
import Label from "../../components/label/label";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import SessionDetail from "./SessionDetail";
import SetOpenPopUp from "./../../components/Trip/ChangeShipper";

// ----------------------------------------------------------------------

const TABLE_HEAD_TOTAL = [
  { id: "images", name: "", alignRight: false },
  { id: "images", name: "Hình" },
  { id: "name", label: "Tên shipper", alignRight: false },
  { id: "deliveryDate", label: "Ngày giao" },
  { id: "createAt", label: "Ngày tạo", alignRight: false },
  { id: "deliveryTime", label: "Thời gian lấy đơn" },
  { id: "arrivedTime", label: "Thời gian kết thúc đơn" },
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

export default function DeliveryTripByIDsession(props) {
  const { id } = props;
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openCell, setOpenCell] = useState([]);

  const [orderFood, setOderFood] = useState([]);

  const [OpenPopUpDetail, SetOpenPopUpDetail] = useState(false);

  //CALL API====================================================
  const location = useLocation();
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  const dispatch = useDispatch();

  // let { id } = useParams();

  React.useEffect(() => {
    const getDetailSession = async () => {
      await dispatch(callAPIGetListTripByID(token, id));
    };
    getDetailSession();
  }, [dispatch, id, token]);

  const trip = useSelector((state) => {
    return state.userReducer.listripByID;
  });

  React.useEffect(() => {
    if (trip) {
      const tempArr = [];
      for (const item of trip) {
        tempArr.push({ id: item.id, value: false });
      }
      setOpenCell(tempArr);
    }
  }, [trip]);
  const [SetOpenPopUp, OpenPopUp] = React.useState(false);
  // console.log(trip);

  //CALL API=====================================================
  //Thay đổi trạng thái
  const getOptions = () => [
    { id: "active", title: "Hoạt động" },
    { id: "inActive", title: "Đóng cửa" },
    { id: "All", title: "Tất cả" },
  ];

  const openChecked = React.useCallback(
    (id) => {
      if (openCell.length > 0) {
        return openCell.find((item) => item.id === id)?.value;
      }
    },
    [openCell]
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = trip.map((n) => n.name);
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

  const fillter = applySortFilter(
    trip,
    getComparator(order, orderBy),
    filterName
  );
  const isStationNotFound = filter?.length === 0;
  //cmt
  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  return (
    <Page title="Phiên làm việc">
      <Box>
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
          </Stack>

          <Card>
            {/* <TripBySessionIDtoolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              options={getOptions()}
            /> */}

            <Scrollbar>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD_TOTAL}
                    rowCount={trip?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {fillter
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const {
                          id,
                          batchs,
                          shipper,
                          session,
                          deliveryDate,
                          deliveryTime,
                          arrivedTime,
                          createdAt,
                          status,
                        } = row;
                        return (
                          <>
                            <TableRow hover key={id} tabIndex={-1}>
                              <TableCell>
                                <IconButton
                                  aria-label="expand row"
                                  size="small"
                                  onClick={() => {
                                    setOpenCell((prev) => {
                                      return prev.map((item) => {
                                        if (item.id === id) {
                                          return {
                                            ...item,
                                            value: !item.value,
                                          };
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
                              <TableCell>
                                <Avatar
                                  alt={shipper?.account.profile.fullName}
                                  src={shipper?.account.profile.avatar}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {shipper?.account.profile.fullName}
                                </Typography>
                              </TableCell>

                              <TableCell>{deliveryDate}</TableCell>
                              <TableCell>
                                {" "}
                                {new Date(createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{deliveryTime}</TableCell>
                              <TableCell>{arrivedTime}</TableCell>
                              <TableCell align="left">
                                <div>
                                  {status === "ready" && (
                                    <Label color="info">Sẵn sàng</Label>
                                  )}
                                  {status === "delivery" && (
                                    <Label color="warning">Đang giao</Label>
                                  )}
                                  {status === "waiting" && (
                                    <Label color="warning"> Đang xử lý</Label>
                                  )}
                                  {status === "arrived" && (
                                    <Label color="success">Hoàn thành</Label>
                                  )}
                                  {status === "reject" && (
                                    <Label color="error">Từ chối</Label>
                                  )}
                                </div>
                              </TableCell>
                              {/* {status === "reject" && (
                                <TableCell align="left">hehe</TableCell>
                              )} */}
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
                                  <Box sx={{ margin: 2, width: "900px" }}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      component="div"
                                    >
                                      Thông tin chuyến
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Túi</TableCell>
                                          {/* <TableCell>Khách hàng</TableCell> */}
                                          <TableCell>Điểm giao</TableCell>
                                          <TableCell>Tổng đơn</TableCell>
                                          <TableCell>Thời gian giao</TableCell>

                                          <TableCell align="center">
                                            Trạng thái
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {batchs.map((item, idex) => {
                                          console.log(item);
                                          return (
                                            <TableRow>
                                              <TableCell>
                                                Túi {idex + 1}
                                              </TableCell>
                                              {/* <TableCell>
                                                {item.orders.map((i, index) => {
                                                  console.log(i);
                                                  return (
                                                    <TableCell>
                                                      {
                                                        i.subscription.account
                                                          .profile.fullName
                                                      }
                                                    </TableCell>
                                                  );
                                                })}
                                              </TableCell> */}
                                              <TableCell>
                                                {item.station.name}
                                              </TableCell>
                                              <TableCell>
                                                {item.orders.length}
                                              </TableCell>
                                              <TableCell>
                                                {session.workDate}
                                              </TableCell>
                                              <TableCell>
                                                <div>
                                                  {item.status ===
                                                    "waiting" && (
                                                    <Label color="warning">
                                                      Đang xử lý
                                                    </Label>
                                                  )}

                                                  {item.status === "ready" && (
                                                    <Label color="primary">
                                                      Sẵn sàng
                                                    </Label>
                                                  )}
                                                  {item.status ===
                                                    "delivery" && (
                                                    <Label color="primary">
                                                      Đang giao
                                                    </Label>
                                                  )}
                                                  {item.status ===
                                                    "arrived" && (
                                                    <Label color="success">
                                                      Hoàn thành
                                                    </Label>
                                                  )}
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <ButtonCustomize
                                                  nameButton="Xem chi tiết"
                                                  onClick={() => {
                                                    SetOpenPopUpDetail(true);
                                                    setOderFood(item.orders);
                                                  }}
                                                />
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
              count={trip?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={"Số hàng trên một trang"}
              labelDisplayedRows={({ from, to, count }) => {
                return "" + from + "-" + to + " của " + count;
              }}
            />
          </Card>
        </Container>
      </Box>
      <SessionDetail
        orderFood={orderFood}
        SetOpenPopUpDetail={SetOpenPopUpDetail}
        OpenPopUpDetail={OpenPopUpDetail}
      />
      {/* <SetOpenPopUp OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} /> */}
    </Page>
  );
}
