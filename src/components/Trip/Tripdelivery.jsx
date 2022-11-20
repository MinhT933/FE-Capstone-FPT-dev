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
import { useNavigate } from "react-router-dom";
import {
  callAPIgetOrdertoCreateDeliveryTrip,
  callAPIgetShipperOfKitchen,
  callAPIGetSlot,
  callAPIGetStationByKitchen,
} from "../../redux/action/acction";
import { useSelector } from "react-redux";
import { useState } from "react";
import { slotShouldForwardProp } from "@mui/material/styles/styled";

export default function Tripdelivery() {
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
  const [result, setResult] = useState("");

  const columns = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "nameFood", headerName: "Tên Món", flex: 1 },
    {
      field: "station", headerName: "Địa điểm", flex: 1,
      renderCell: (param) => {
        return param.row.station.address
      }

    },
    {
      field: "name", headerName: "Tên trạm", flex: 1,
      renderCell: (param) => {
        return param.row.station.name
      }

    },
    // {
    //   field: "openTime", headerName: "Giờ mở cửa", flex: 1,
    //   renderCell: (param) => {
    //     return param.row.station.openTime
    //   }

    // },
    // {
    //   field: "phone", headerName: "Điện thoại ", flex: 1,
    //   renderCell: (param) => {
    //     return param.row.station.phone
    //   }

    // },
    // {
    //   field: "deliveryDate", headerName: "Ngày giao", flex: 1,
    //   renderCell: (param) => {
    //     return param.row.station.deliveryDate
    //   }

    // },
    // {
    //   field: "address",
    //   headerName: "địa chỉ",
    //   type: "number",
    //   width: 90,
    // },
    // {
    //   field: "openTime",
    //   headerName: "Giờ mở cửa",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
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
  console.log(rows)
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
                name="valueStarTime"
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
                name="stationID"
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
                name="slot"
                label="Giờ"
                onChange={(e) => {
                  const a = Slot.find(
                    (c) => c.id === e.target.value
                  );
                  console.log(a)
                  console.log(e.target.value)
                  setSlot(a.id);
                }}
                options={getSlot()}
              />
            </Grid>

            <Grid item xs={3}>
              <ButtonCustomize
                nameButton="Tìm chuyến"
                onClick={handleClickFind}
              />
            </Grid>
          </Grid>
          <Box>
            <div style={{ height: 400, width: 800, marginTop: 20 }}>

              {resultList ? <DataGrid
                rows={resultList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
                // checkboxSelection
                pagination
              /> : <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
                // checkboxSelection
                pagination
              />}

            </div>
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
