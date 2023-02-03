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
  Collapse,
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

import {
  callAPIGetListSessionDetail,
  callAPIGetListTottalFood,
  sendIdSessions,
} from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import StationListtoolbar from "../../sections/@dashboard/user/StationListtoolbar";
import SessionDetail from "./SessionDetail";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "gigi", label: "" },

  { id: "name", label: "Khách hàng", alignCenter: false },
  { id: "phone", label: "Số điện thoại", alignCenter: false },
  { id: "foodGroup", label: "Gói ăn", align: "center" },
  { id: "customer", label: "Buổi", align: "center" },
  { id: "station", label: "Điểm giao", alignRight: false },
  { id: "subscriptionDate", label: "Ngày giao", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
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

export default function ViewOrderInSession(props) {
  const { id } = props;
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [OpenPopUpDetail, SetOpenPopUpDetail] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [sessionID, setSessionID] = useState();
  const [OpenSetShipper, setOpenSetShipper] = useState(false);
  const [orderFood, setOderFood] = useState([]);

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

  const detail = useSelector((state) => {
    return state.userReducer.detailSession;
  });

  React.useEffect(() => {
    if (detailSession) {
      const tempArr = [];
      for (const item of detailSession) {
        for (const i of item.orders) {
          tempArr.push({ id: i.id, value: false });
        }
      }
      setOpenCell(tempArr);
    }
  }, [detailSession]);

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
          <StationListtoolbar
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
                    .map((item) => {
                      return item.orders;
                    })
                    .map((row, index) => {
                      return (
                        <>
                          {row.map((i, index) => {
                            return (
                              <>
                                <TableRow
                                  hover
                                  key={i.id}
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
                                            if (item.id === i.id) {
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
                                      {openChecked(i.id) ? (
                                        <KeyboardArrowUpIcon />
                                      ) : (
                                        <KeyboardArrowDownIcon />
                                      )}
                                    </IconButton>
                                  </TableCell>
                                  <TableCell>
                                    {i?.subscription?.account.profile.fullName}
                                  </TableCell>
                                  <TableCell>
                                    {i?.subscription?.account.phone}
                                  </TableCell>
                                  <TableCell>
                                    {i?.subscription?.packages.name}
                                  </TableCell>

                                  <TableCell>{i?.packageItem.flag}</TableCell>

                                  <TableCell>{i?.station.name}</TableCell>
                                  <TableCell>
                                    {i?.subscription?.subscriptionDate}
                                  </TableCell>
                                  <TableCell>
                                    {" "}
                                    <div>
                                      {i.status === "delivery" && (
                                        <Label color="warning">Đang giao</Label>
                                      )}
                                      {i.status === "progress" && (
                                        <Label color="warning">
                                          Đang tiến hành
                                        </Label>
                                      )}
                                      {i.status === "ready" && (
                                        <Label color="primary">Sẵn sàng</Label>
                                      )}
                                      {i.status === "arrived" && (
                                        <Label color="success">Đã giao</Label>
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
                                      in={openChecked(i.id)}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Box sx={{ margin: 2 }}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          component="div"
                                        >
                                          Món ăn
                                        </Typography>
                                        <Table
                                          size="small"
                                          aria-label="purchases"
                                        >
                                          <TableHead>
                                            <TableRow>
                                              {/* <TableCell></TableCell> */}
                                              <TableCell>Tên Món</TableCell>
                                              <TableCell>Nhóm</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            <TableRow>
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
                                              <TableCell>
                                                {i.packageItem.foodGroup.name}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </Box>
                                    </Collapse>
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })}
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
            <ButtonCustomize
              nameButton="Tạo chuyến"
              marginLeft="45%"
              marginTop="2%"
              onClick={async () =>
                await dispatch(sendIdSessions(token, id, Navigate))
              }
            />
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

      <SessionDetail
        orderFood={orderFood}
        SetOpenPopUpDetail={SetOpenPopUpDetail}
        OpenPopUpDetail={OpenPopUpDetail}
      />
    </Page>
  );
}
