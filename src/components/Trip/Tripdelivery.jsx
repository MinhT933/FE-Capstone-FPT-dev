import React from "react";
import PageHeader from "../PageHeader";
// import Paper from "./../../theme/overrides/Paper";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Iconify from "../../components/hook-form/Iconify";
import { Paper } from "@mui/material";
import { Grid } from "@mui/joy";
import Controls from "./../Control/Controls";
import ButtonCustomize from "../Button/ButtonCustomize";
import DatePicker from "../Control/DatePicker";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import {
  callAPIgetListKitchen,
  callAPIgetListStationbyidKitchen,
  callAPIgetOrdertoCreateDeliveryTrip,
  callAPIGetSlot,
  callAPIgetAccountShipperByStatusActive,
  callAPIgetallOrder,
} from "../../redux/action/acction";
import { useSelector } from "react-redux";
import { useState } from "react";

import TripdeliveryPopUp from "./TripdeliveryPopUp";

export default function Tripdelivery() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [idkitchen, setIdkitchen] = useState("");

  //   const idKitchen = profiles.id;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  // const idKitchen = profiles.id;
  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      dispatch(await callAPIGetSlot(token));
      dispatch(await callAPIgetallOrder(token));
      dispatch(await callAPIgetListKitchen(token));
      dispatch(await callAPIgetAccountShipperByStatusActive(token));
    };
    getfoodByFoodGroupId();
  }, [dispatch, token, idkitchen]);

  // const shipperofkichen = useSelector((state) => {
  //   return state.userReducer.listShipperActive;
  // });

  const listKichen = useSelector((state) => {
    return state.userReducer.listKitchen;
  });

  const stationOfkichen = useSelector((state) => {
    return state.userReducer.listStatiobyidkitchen;
  });

  const Slot = useSelector((state) => {
    return state.userReducer.listSlots;
  });

  // const getOptions = () => {
  //   const item = [];
  //   for (var i = 0; i < shipperofkichen.length; i++) {
  //     item.push({
  //       id: shipperofkichen[i].id,
  //       title: shipperofkichen[i].account.profile.fullName,
  //     });
  //   }
  //   return item;
  // };

  const getOptionsKichen = () => {
    const item = [];
    for (var i = 0; i < listKichen.length; i++) {
      item.push({
        id: listKichen[i].id,
        title: listKichen[i].account.profile.fullName,
      });
    }
    return item;
  };

  const getSlot = () => {
    const item = [];
    // const textTile = "";
    for (var i = 0; i < Slot.length; i++) {
      item.push({
        id: Slot[i]?.id,

        title: `${Slot[i]?.startTime}-${Slot[i]?.endTime}`,
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

  const [pageSize, setPageSize] = React.useState(5);

  const columns = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "nameFood", headerName: "Tên Món", flex: 1 },
    {
      field: "kitchen",
      headerName: "Bếp",
      flex: 1,
      renderCell: (param) => {
        // setIdkitchen(param.row.kitchen.id);
        return param.row.kitchen.account?.profile.fullName;
      },
    },
    {
      field: "name",
      headerName: "Điểm giao",
      flex: 1,
      renderCell: (param) => {
        // setSlot(param.row.timeSlot.id);
        // setStationID(param.row.station.id);
        return param.row.station.name;
      },
    },

    {
      field: "phone",
      headerName: "Điện thoại ",
      flex: 1,
      renderCell: (param) => {
        return param.row.station.phone;
      },
    },
    {
      field: "Slot",
      headerName: "Thời gian giao ",
      flex: 1,
      renderCell: (param) => {
        // return param.row.station.phone;
        return `${param.row.timeSlot.startTime}-${param.row.timeSlot.endTime}`;
      },
    },
    {
      field: "deliveryDate",
      headerName: "Ngày giao",
      flex: 1,
      renderCell: (param) => {
        return param.row.station.deliveryDate;
      },
    },
  ];

  const rows = [];

  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const resultList = useSelector((state) => {
    return state.userReducer.orderToCreate;
  });

  // console.log(resultList);
  // console.log(resultList?.station?.id);

  const handleClickFind = async () => {
    dispatch(
      await callAPIgetOrdertoCreateDeliveryTrip(
        token,
        slot,
        convert(valueStarTime),
        stationID,
        idkitchen
      )
    );
  };

  const [selectionModel, setSelectionModel] = React.useState([]);

  return (
    // <div>Tripdelivery</div>
    <Paper
      title="Chuyến hàng"
      elevation={3}
      sx={{
        padding: "2%",
        marginBottom: "10%",
        margin: "2%",
      }}
    >
      <PageHeader
        title="Tạo chuyến giao hàng"
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("icon-park-outline:delivery")}
      />
      <form>
        <Box
          sx={{
            marginLeft: "0.5%",
            height: "35rem",
            width: "120%",
            marginTop: "2%",
          }}
        >
          <Grid container>
            <Grid item xs={2}>
              <DatePicker
                variant="outlined"
                name="valueStarTime"
                label="Ngày giao"
                width="90%"
                inputFormat="YYYY-MM-DD"
                value={valueStarTime}
                onChange={(e) => {
                  console.log(e);
                  setValueStarTime(e);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Controls.Select
                name="KitchenId"
                label="Bếp"
                width="90%"
                onChange={(e) => {
                  // map tên với adi hiện thị name nhưng chọn ẩn ở dưới là id
                  const a = listKichen.find((c) => c.id === e.target.value);
                  console.log(a.id);
                  dispatch(callAPIgetListStationbyidKitchen(token, a.id));
                  setIdkitchen(a.id);
                }}
                //   onBlur={formik.handleBlur}
                //   //getOption để lấy giá trị category
                options={getOptionsKichen()}
              />
            </Grid>

            <Grid item xs={2}>
              <Controls.Select
                name="stationID"
                label="Địa điểm giao"
                width="90%"
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

            <Grid item xs={2}>
              <Controls.Select
                name="slot"
                label="Thời gian giao"
                width="90%"
                onChange={(e) => {
                  // const a = Slot.find((c) => c.id === e.target.value);
                  setSlot(e.target.value);
                }}
                options={getSlot()}
              />
            </Grid>

            <Grid item xs={2}>
              <ButtonCustomize
                marginTop="1%"
                nameButton="Tìm kiếm"
                onClick={handleClickFind}
              />
            </Grid>
          </Grid>
          <Box>
            <div style={{ height: "25rem", width: "83%", marginTop: "2%" }}>
              {resultList ? (
                <DataGrid
                  rows={resultList}
                  columns={columns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  getRowId={(row) => row.id}
                  checkboxSelection
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  pagination
                  localeText={{
                    MuiTablePagination: {
                      labelRowsPerPage: "Số hàng trên một trang",
                      labelDisplayedRows: ({ from, to, count }) =>
                        `${from} - ${to} của ${count}`,
                    },
                  }}
                />
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5]}
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  getRowId={(row) => row.id}
                  checkboxSelection
                  pagination
                  localeText={{
                    MuiTablePagination: {
                      labelRowsPerPage: "Số hàng trên một trang",
                      labelDisplayedRows: ({ from, to, count }) =>
                        `${from} - ${to} của ${count}`,
                    },
                  }}
                />
              )}
            </div>
          </Box>
          <ButtonCustomize
            component={RouterLink}
            to="#"
            onClick={() => {
              SetOpenPopUp(true);
            }}
            nameButton="Thêm tài xế cho chuyến"
            width="20%"
            marginLeft="30%"
            marginTop="3%"
          />
        </Box>
      </form>
      <TripdeliveryPopUp
        OpenPopUp={OpenPopUp}
        SetOpenPopUp={SetOpenPopUp}
        stationID={stationID}
        valueStarTime={valueStarTime}
        selectionModel={selectionModel}
        slot={slot}
        idKitchen={idkitchen}
      ></TripdeliveryPopUp>
    </Paper>
  );
}
