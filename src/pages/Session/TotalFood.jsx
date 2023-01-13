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

import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

import { UserListHead } from "../../sections/@dashboard/user";
import Box from "@mui/material/Box";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import {
  callAPIGetListSessionDetail,
  callAPIGetListTottalFood,
} from "../../redux/action/acction";
import StationListtoolbar from "../../sections/@dashboard/user/StationListtoolbar";
import Iconify from "../../components/hook-form/Iconify";
import Avatar from "@mui/material/Avatar";
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

export default function TotalFood(props) {
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
      await dispatch(callAPIGetListSessionDetail(token, id));
      await dispatch(callAPIGetListTottalFood(token, id));
    };
    getDetailSession();
  }, [dispatch, id, token]);

  const detailSession = useSelector((state) => {
    return state.userReducer.detailSession.batchs;
  });

  const totalFood = useSelector((state) => {
    return state.userReducer.totalfood;
  });
  // console.log(detailSession);

  React.useEffect(() => {
    if (detailSession) {
      const tempArr = [];
      for (const item of detailSession) {
        tempArr.push({ id: item.id, value: false });
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

  const filterTotalFood = applySortFilter(
    totalFood,
    getComparator(order, orderBy),
    filterName
  );
  const isStationNotFound = filter?.length === 0;

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
                    headLabel={TABLE_HEAD_TOTAL}
                    rowCount={totalFood?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filterTotalFood
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
              count={totalFood?.length}
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
