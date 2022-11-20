import React from "react";
import PageHeader from "../PageHeader";
// import Paper from "./../../theme/overrides/Paper";
import Iconify from "../../components/hook-form/Iconify";
import { Paper } from "@mui/material";
import { Grid } from "@mui/joy";
import Controls from "./../Control/Controls";
import ButtonCustomize from "../Button/ButtonCustomize";
import DatePicker from "../Control/DatePicker";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";

// components
import Label from "../../components/label/label";
import Scrollbar from "../../components/hook-form/Scrollbar";
import SearchNotFound from "../../components/topbar/SearchNotFound";
import Page from "../../components/setPage/Page";

import {
  callAPIgetOrdertoCreateDeliveryTrip,
  callAPIgetShipperOfKitchen,
  callAPIGetSlot,
  callAPIGetStationByKitchen,
} from "../../redux/action/acction";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import {
  Card,
  Table,
  Stack,
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

import { useState } from "react";
import { filter } from "lodash";
import { styled } from "@mui/material/styles";


const TABLE_HEAD = [

  { id: "id", label: "", alignRight: false },
  { id: "nameFood", label: "Tên món", alignRight: false },
  { id: "name", label: "Địa điểm", alignRight: false },
  { id: "address", label: "Địa chỉ", alignRight: false },
  { id: "openTime", label: "Mở cửa", alignRight: false },
  { id: "" },
];

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


export default function Tripdelivery() {

  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);


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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderToCreate.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const filteredStations = applySortFilter(
    orderToCreate,
    getComparator(order, orderBy),
    filterName
  );

  const isStationNotFound = filteredStations.length === 0;


  const Button1 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC33"),
    backgroundColor: "#FFCC33",

    // display: "center"
  }));


  //   const idKitchen = profiles.id;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }
  const profiles = useSelector((state) => {
    return state.userReducer.profiles;
  });
  const idKitchen = profiles.id;
  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      dispatch(await callAPIgetShipperOfKitchen(token, idKitchen));
      dispatch(await callAPIGetStationByKitchen(token));
      dispatch(await callAPIGetSlot(token));
      dispatch(await callAPIgetOrdertoCreateDeliveryTrip(token));
    };

    getfoodByFoodGroupId();
  }, [dispatch, idKitchen, token]);

  const shipperofkichen = useSelector((state) => {
    return state.userReducer.shipPerOfKitchen;
  });

  const stationOfkichen = useSelector((state) => {
    return state.userReducer.stationOfKitchen;
  });
  const Slot = useSelector((state) => {
    return state.userReducer.listSlots;
  });

  // const orderToCreate = useSelector((state) => {
  //   return state.userReducer.orderToCreate;
  // });

  const getOptions = () => {
    const item = [];
    for (var i = 0; i < shipperofkichen.length; i++) {
      item.push({
        id: shipperofkichen[i].id,
        title: shipperofkichen[i].account.profile.fullName,
      });
    }
    return item;
  };
  const getSlot = () => {
    const item = [];
    const textTile = "";
    for (var i = 0; i < shipperofkichen.length; i++) {
      item.push({
        id: Slot[i].id,

        title: Slot[i].startTime,
      });
    }
    return item;
  };

  const getOptionsStation = () => {
    const item = [];
    for (var i = 0; i < stationOfkichen?.length; i++) {
      item.push({
        id: stationOfkichen[i].id,
        title: stationOfkichen[i].name,
      });
    }
    return item;
  };

  const [valueStarTime, setValueStarTime] = React.useState(new Date());
  const [stationID, setStationID] = useState("");
  const [slot, setSlot] = useState("");

  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   { field: "nameFood", headerName: "Tên Món", width: 130 },
  //   { field: "station", headerName: "Địa điểm", width: 130 },
  //   {
  //     field: "address",
  //     headerName: "địa chỉ",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "openTime",
  //     headerName: "Giờ mở cửa",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //   },
  // ];

  // const rows = [
  //   { id: 1, nameFood: "Phở bò", firstName: "Jon", age: 35 },
  //   { id: 2, nameFood: "Bún Bò", firstName: "Cersei", age: 42 },
  //   { id: 3, nameFood: "Cơm chiên", firstName: "Jaime", age: 45 },
  //   { id: 4, nameFood: "Phở bò", firstName: "Arya", age: 16 },
  //   { id: 5, nameFood: "Cơm hến", firstName: "Daenerys", age: null },
  //   { id: 6, nameFood: "ngon", firstName: null, age: 150 },
  //   { id: 7, nameFood: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, nameFood: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, nameFood: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
  return (
    // <div>Tripdelivery</div>
    <Paper>
      <PageHeader
        title="Tạo chuyến đi"
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("icon-park-outline:delivery")}
      />
      <form>
        <Box sx={{ marginLeft: 12 }}>
          <Grid container>
            <Grid item xs={3}>
              <DatePicker
                variant="outlined"
                name="startSale"
                label="Ngày mở bán"
                width="16rem"
                inputFormat="YYYY-MM-DD"
                value={valueStarTime}
                onChange={(e) => {
                  setValueStarTime(e);
                }}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <Controls.Select
                name="foodCategoryId"
                label="Shipper"
                // defaultValue={categoriesFood[0].name}

                //   value={formik.values.foodCategoryId}
                onChange={(e) => {
                  // map tên với adi hiện thị name nhưng chọn ẩn ở dưới là id
                  // const a = categoriesFood.find((c) => c.id === e.target.value);
                  // formik.setFieldValue("foodCategoryId", a.id);
                }}
                //   onBlur={formik.handleBlur}
                //   //getOption để lấy giá trị category
                options={getOptions()}
              />
            </Grid> */}
            <Grid item xs={3}>
              <Controls.Select
                name="foodCategoryId"
                label="Địa điểm"
                // defaultValue={categoriesFood[0].name}

                //   value={formik.values.foodCategoryId}
                onChange={(e) => {
                  const a = stationOfkichen.find(
                    (c) => c.id === e.target.value
                  );
                  setStationID(a.id);
                }}
                options={getOptionsStation()}
              />
            </Grid>
            <Grid item xs={3}>
              <Controls.Select
                name="Chỗ trống"
                label="Giờ"
                onChange={(e) => {
                  const a = stationOfkichen.find(
                    (c) => c.id === e.target.value
                  );
                  setSlot(a.id);
                }}
                options={getSlot()}
              />
            </Grid>


            <Grid item xs={3}>
              <ButtonCustomize
                nameButton="Tìm chuyến"
                onClick={dispatch(
                  callAPIgetOrdertoCreateDeliveryTrip(
                    token,
                    slot,
                    valueStarTime,
                    stationID
                  )
                )}
              />
            </Grid>
          </Grid>
          <Box>
            {/* <div style={{ height: 400, width: 800, marginTop: 20 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div> */}

          </Box>
          <ButtonCustomize
            nameButton="Tạo chuyến đi"
            marginLeft="35%"
            marginTop="3%"
          // paddingBottom="3%"
          />
        </Box>
      </form>
    </Paper>
  );
}
