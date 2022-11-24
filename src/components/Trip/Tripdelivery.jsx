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
  callAPIgetOrdertoCreateDeliveryTrip,
  callAPIgetShipperOfKitchen,
  callAPIGetSlot,
  callAPIGetStationByKitchen,
} from "../../redux/action/acction";
import { useSelector } from "react-redux";
import { useState } from "react";
import { slotShouldForwardProp } from "@mui/material/styles/styled";
import TripdeliveryPopUp from "./TripdeliveryPopUp";
import { ChargingStationOutlined } from "@mui/icons-material";


export default function Tripdelivery() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [OpenPopUpCate, SetOpenPopUpCate] = useState(false);
  const [OpenPopUpDetail, SetOpenPopUpDetail] = useState(false);
  const [page, setPage] = useState(0);

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
    for (var i = 0; i < Slot.length; i++) {
      item.push({
        id: Slot[i]?.id,

        title: Slot[i]?.startTime,
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
  console.log(valueStarTime)
  const [stationID, setStationID] = useState("");
  const [slot, setSlot] = useState("");
  const [result, setResult] = useState("");

  const columns = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "nameFood", headerName: "Tên Món", flex: 1 },
    {
      field: "name", headerName: "Tên trạm", flex: 1,
      renderCell: (param) => {
        return param.row.station.name
      }

    },
    {
      field: "station", headerName: "Địa chỉ", flex: 1,
      renderCell: (param) => {
        return param.row.station.address
      }

    },

    {
      field: "openTime", headerName: "Giờ mở cửa", flex: 1,
      renderCell: (param) => {
        return param.row.station.openTime
      }

    },
    {
      field: "phone", headerName: "Điện thoại ", flex: 1,
      renderCell: (param) => {
        return param.row.station.phone
      }

    },
    {
      field: "deliveryDate", headerName: "Ngày giao", flex: 1,
      renderCell: (param) => {
        return param.row.station.deliveryDate
      }

    },
    // {
    //   field: "timeslotID", headerName: "Ngày giao", flex: 1,
    //   renderCell: (param) => {
    //     return param.row.station.deliveryDate
    //   }

    // },
  ];

  const rows = [

  ];

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
  console.log(resultList)


  const handleClickFind = async () => {

    dispatch(
      await callAPIgetOrdertoCreateDeliveryTrip(
        token,
        slot,
        convert(valueStarTime.$d),
        stationID
      ))

    // .then((res) =>
    //   console.log(res)
    // ).catch((error) => {
    //   console.log(error)
    // })

  }

  const [selectionModel, setSelectionModel] = React.useState([]);

  console.log(resultList);

  return (
    // <div>Tripdelivery</div>
    <Paper title="Chuyến hàng"
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
        <Box sx={{ marginLeft: '9%', height: '35rem', width: '100%', marginTop: '2%' }}>
          <Grid container>
            <Grid item xs={3}>
              <DatePicker
                variant="outlined"
                name="valueStarTime"
                label="Ngày giao"
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
                name="stationID"
                label="Địa điểm giao"
                width="14rem"
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
                name="slot"
                label="Thời gian giao"
                width="14rem"
                onChange={(e) => {
                  const a = Slot.find(
                    (c) => c.id === e.target.value
                  );
                  console.log(a)
                  console.log(e.target.value)
                  setSlot(e.target.value);
                }}
                options={getSlot()}
              />
            </Grid>

            <Grid item xs={3}>
              <ButtonCustomize
                marginTop="1%"
                nameButton="Tìm kiếm"
                onClick={handleClickFind}
              />
            </Grid>
          </Grid>
          <Box>
            <div style={{ height: '25rem', width: '83%', marginTop: '2%' }}>

              {resultList ? <DataGrid
                rows={resultList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                  console.log(newSelectionModel)
                  setSelectionModel(newSelectionModel);
                }}
                pagination
              /> : <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
                checkboxSelection
                pagination
              />}

            </div>
          </Box>
          <ButtonCustomize
            // variant="contained"
            component={RouterLink}
            to="#"
            onClick={() => {
              SetOpenPopUp(true);
            }}
            nameButton="Thêm tài xế cho chuyến"
            width='20%'
            marginLeft='30%'
            marginTop='3%'
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
      >

      </TripdeliveryPopUp>
    </Paper>
  );
}
