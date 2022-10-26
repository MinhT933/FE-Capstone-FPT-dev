import { filter } from "lodash";
import { useState } from "react";
import {
  Card,
  Table,
  Stack,
  // Avatar,
  // Button,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TabScrollButton,
  createTheme,
  // TablePagination,
} from "@mui/material";
// components
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

import dayjs from "dayjs";
import * as React from "react";

import Iconify from "../../components/hook-form/Iconify";

// mock
import KITCHENORDERLIST from "./KitchenOrderSample";
import {
  UserListHead,
  // UserListToolbar,
} from "../../sections/@dashboard/user";
import MealListToolBar from "../../sections/@dashboard/user/MealListToolBar";
import PageHeader from "../../components/PageHeader";
import { Grid } from "@mui/joy";
import Scrollbar from "./../../components/hook-form/Scrollbar";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/styles";
import SimpleBarReact from "simplebar-react";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------
// ở đây fix được tên tên table
// ko nhát thiết phải thêm table head ở dưới

const TABLE_HEAD = [
  { id: "id", label: "Tên món", alignRight: false },
  { id: "name", label: "Số lượng", alignRight: false },
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

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

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
      (_kitchen) =>
        _kitchen.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListBreakfast() {
  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

  // const [OpenPopUp, SetOpenPopUp] = useState(false);
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
      const newSelecteds = KITCHENORDERLIST.map((n) => n.name);
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredKitchen = applySortFilter(
    KITCHENORDERLIST,
    getComparator(order, orderBy),
    filterName
  );
  const isKitchenNotFound = filteredKitchen.length === 0;

  return (
    // <SimpleBarStyle>
    <Page title="Breakfast">
      <Container>
        <Card>
          <Paper
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              background: "#FFCC33",
              color: "black",
              // height: "50%",
              // width: "33%",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    marginLeft: "65%",
                    marginTop: "9%",
                  }}
                >
                  SÁNG
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Card
                  sx={{
                    display: "inline-block",
                    padding: "20%",
                    marginTop: "14%",
                    marginLeft: "45%",
                  }}
                >
                  {" "}
                  {getIcon("emojione:sun-behind-cloud")}
                </Card>
              </Grid>
            </Grid>
          </Paper>

          {/* <MealListToolBar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    /> */}

          <TableContainer
            sx={{
              width: 360,
              maxWidth: 360,
              "&::-webkit-scrollbar": {
                width: 20,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "orange",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "red",
                borderRadius: 2,
              },
              overflowX: "auto",
            }}
          >
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={KITCHENORDERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredKitchen
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, name } = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

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
                        <TableCell align="left">{name}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>

              {isKitchenNotFound && (
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
        </Card>
      </Container>
    </Page>
    // </SimpleBarStyle>
  );
}
