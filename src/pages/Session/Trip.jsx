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
} from "@mui/material";
// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

import { UserListHead } from "../../sections/@dashboard/user";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import { useDispatch } from "react-redux";
import TableHead from "@mui/material/TableHead";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  callAPIGetListSessionDetail,
  callAPIgetListStation,
  sendIdSessions,
} from "../../redux/action/acction";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import jwt_decode from "jwt-decode";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import StationListtoolbar from "../../sections/@dashboard/user/StationListtoolbar";
import moment from "moment";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import SessionDetail from "./SessionDetail";
import PageHeader from "../../components/PageHeader";
import Iconify from "../../components/hook-form/Iconify";
import addShipper from "./AddShipper";
import AddShipper from "./AddShipper";
import Avatar from "@mui/material/Avatar";
import { array } from "yup/lib/locale";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "", alignRight: false },
  { id: "name", label: "id", alignRight: false },
  { id: "workDelivery", label: "Ngày giao hàng", alignRight: false },
  { id: "address", label: "Ngày thêm", alignRight: false },
  { id: "workDate", label: "Ngày sửa", alignRight: false },

  { id: "status", label: "Trạng thái", alignRight: false },
  // { id: "detail", label: "Chi tiết", alignRight: false },
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

export default function Trip() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");
  const [sessionID, setSessionID] = useState();
  const [OpenSetShipper, setOpenSetShipper] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const [openRow, setOpenRow] = React.useState(false);

  const [OpenPopUpDetail, SetOpenPopUpDetail] = useState(false);
  const [orderFood, setOrderFood] = useState([]);

  const [openCell, setOpenCell] = useState([]);

  //CALL API====================================================
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

  let { id } = useParams();

  const listTrip = useSelector((state) => {
    return state.userReducer.listTrip;
  });
  React.useEffect(() => {
    if (listTrip) {
      const tempArr = [];
      for (const item of listTrip) {
        tempArr.push({ id: item.id, value: false });
      }
      setOpenCell(tempArr);
    }
  }, [listTrip]);

  const [arrBatch, setArrBatch] = useState([]);
  const handlebatch = () => {
    const arr = [];
    for (let index = 0; index < listTrip.length; index++) {
      if (listTrip[index].batchs !== null) {
        arr.push(listTrip[index]);
      }
    }
    // setArrBatch(arr);
    return arr;
  };

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
      const newSelecteds = listTrip.map((n) => n.name);
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
    handlebatch(),
    // arrBatch,
    getComparator(order, orderBy),
    filterName
  );

  const handleClickSetShipper = (id) => {
    setSessionID(id);
    setOpenSetShipper(true);
  };

  const isStationNotFound = filter?.length === 0;

  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  return (
    <Page title="Phiên làm việc">
      <PageHeader
        title="Xem chi tiết phiên làm việc"
        subTitle={`Chi tiếc phiên làm việc `}
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
                  rowCount={listTrip?.length}
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
                    .map((row) => {
                      const {
                        id,
                        status,
                        createdAt,
                        updatedAt,
                        deliveryDate,
                        batchs,
                      } = row;
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
                            <TableCell align="left">{id}</TableCell>
                            <TableCell align="left">{deliveryDate}</TableCell>
                            <TableCell align="left">
                              {new Date(createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="left">
                              {new Date(updatedAt).toLocaleDateString()}
                            </TableCell>

                            <TableCell align="left">
                              <div>
                                {status === "waiting" && (
                                  <Label color="warning">Đang chờ</Label>
                                )}
                                {status === "active" && (
                                  <Label color="success">Hoạt động</Label>
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
                                    Chặn đi
                                  </Typography>
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="center">
                                          Tên Trạm
                                        </TableCell>
                                        <TableCell align="center">
                                          Địa chỉ
                                        </TableCell>
                                        <TableCell align="center">
                                          Thời gian hoạt động
                                        </TableCell>
                                        <TableCell align="center">
                                          Số điện thoại
                                        </TableCell>
                                        <TableCell align="center">
                                          Trạng thái
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {batchs.map((i, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <TableCell align="center">
                                              {i.station.name}
                                            </TableCell>
                                            <TableCell align="center">
                                              {i.station.address}
                                            </TableCell>
                                            <TableCell align="center">
                                              {i.station.openTime} -
                                              {i.station.closeTime}
                                            </TableCell>
                                            <TableCell align="center">
                                              {i.station.phone}
                                            </TableCell>

                                            <TableCell align="center">
                                              <div>
                                                {i.status === "inActive" && (
                                                  // <Alert severity="warning">inActive</Alert>
                                                  <Label color="error">
                                                    Ngưng bán
                                                  </Label>
                                                )}
                                                {i.status === "waiting" && (
                                                  // <Alert severity="info">waiting</Alert>
                                                  <Label color="warning">
                                                    Đang chờ
                                                  </Label>
                                                )}
                                                {i.status === "active" && (
                                                  <Label color="success">
                                                    Đang bán
                                                  </Label>
                                                )}
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                          //   <h1>hihi</h1>
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
            <ButtonCustomize
              nameButton="Thêm Shipper"
              marginLeft="45%"
              marginTop="2%"
              onClick={() => handleClickSetShipper(id)}
            />
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={listTrip?.length}
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
        SetOpenPopUpDetail={SetOpenPopUpDetail}
        OpenPopUpDetail={OpenPopUpDetail}
        orderFood={orderFood}
      />
      <AddShipper
        id={sessionID}
        setOpenSetShipper={setOpenSetShipper}
        OpenSetShipper={OpenSetShipper}
      />
    </Page>
  );
}

// const data = {
//   {
//     kitchenId: "string",
//     shippers: [
//       {
//         idShipper: "string",
//         idShipper: "string",
//         idShipper: "string"
//       }
//     ]
//   }
// }
