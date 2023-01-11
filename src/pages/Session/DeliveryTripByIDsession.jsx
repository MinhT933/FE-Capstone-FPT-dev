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
import PageHeader from "../../components/PageHeader";
import Iconify from "../../components/hook-form/Iconify";
import Avatar from "@mui/material/Avatar";
import TripBySessionIDtoolbar from "./../../sections/@dashboard/user/TripBySessionIDtoolbar";
import Label from "../../components/label/label";

// ----------------------------------------------------------------------

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

export default function DeliveryTripByIDsession(props) {
  const { id } = props;
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openCell, setOpenCell] = useState([]);

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
      <Box sx={{ marginTop: "5%" }}>
        <PageHeader
          title="Món ăn cần phải chuẩn bị trong phiên"
          subTitle={`Tổng số món ăn `}
          icon={getIcon("fluent:apps-list-detail-20-filled")}
        />
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
            <TripBySessionIDtoolbar
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
                        const { id, image, name, count, description } = row;
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
                                <Avatar alt={name} src={image} />
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">{count}</TableCell>

                              <TableCell align="left">{description}</TableCell>
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
                                      <TableBody></TableBody>
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
    </Page>
  );
}
