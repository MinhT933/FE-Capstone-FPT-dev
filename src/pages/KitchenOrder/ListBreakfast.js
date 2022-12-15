import { filter } from "lodash";
import { useState } from "react";
import {
  Card,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from "@mui/material";
// components
import Page from "../../components/setPage/Page";

import * as React from "react";

import Iconify from "../../components/hook-form/Iconify";

// mock

import {
  UserListHead,
  // UserListToolbar,
} from "../../sections/@dashboard/user";

import { Grid } from "@mui/joy";
import { callAPIKitchenPrepareOrder } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------
// ở đây fix được tên tên table
// ko nhát thiết phải thêm table head ở dưới

const TABLE_HEAD = [
  // { id: "", label: "" },
  { id: "nameFood", label: "Tên món", alignRight: false },
  { id: "quantity", label: "Số lượng", alignRight: false },
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
      (_kitchen) =>
        _kitchen.nameFood.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListBreakfast(props) {
  const { kitchenMorning } = props;

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const [select, setSelect] = useState("");
  const [valueStarTime, setValueStarTime] = React.useState(new Date());

  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(
        callAPIKitchenPrepareOrder(token, convert(valueStarTime), select)
      );
    };
    callAPI();
  }, [select, valueStarTime, token, dispatch]);

  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

  // const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("nameFood");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = kitchenMorning.map((n) => n.nameFood);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };



  const filteredKitchen = applySortFilter(
    kitchenMorning,
    getComparator(order, orderBy)
  );

  return (
    <Page>
      <Container sx={{ minWidth: 380, width: 380 }}>
        <Card>
          <Paper
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              background: "#FFCC33",
              color: "black",
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

          <TableContainer sx={{ minWidth: 390, width: 390 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={kitchenMorning.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredKitchen
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { nameFood, quantity } = row;
                    // console.log(nameFood)
                    const isItemSelected = selected.indexOf(nameFood) !== -1;

                    return (
                      <TableRow
                        hover
                        key={nameFood}
                        tabIndex={-1}
                
                        aria-checked={isItemSelected}
                      >
                        <TableCell align="left">{nameFood}</TableCell>
                        <TableCell align="left">{quantity}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Page>
  );
}
