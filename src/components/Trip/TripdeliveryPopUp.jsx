import { Dialog, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import React from "react";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import * as yup from "yup";
// import { URL_API } from "./../../Axios/URL_API/URL";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Controls from "../Control/Controls";
import PageHeader from "../PageHeader";
import Iconify from "../hook-form/Iconify";
import { CustomizedToast } from "../Toast/ToastCustom";
import ButtonCustomize from "../Button/ButtonCustomize";
import {
  callAPIgetShipperActive,
  callAPIgetShipperOfKitchen,
  callAPIGetSlot,
  callAPIGetStationByKitchen,
} from "../../redux/action/acction";
import { URL_API } from "../../Axios/URL_API/URL";
import API from "../../Axios/API/API";

const schema = yup.object().shape({
  fullName: yup.string().required("Vui lòng điền đầy đủ thông tin").trim(),
  // description: yup.string().required("Vui lòng điền đầy đủ thông tin").trim(),
});

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function TripdeliveryPopUp(props) {
  const {
    OpenPopUp,
    SetOpenPopUp,
    stationID,
    valueStarTime,
    selectionModel,
    slot,
  } = props;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const profiles = useSelector((state) => {
    return state.userReducer.profiles;
  });
  const idKitchen = profiles.id;
  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      dispatch(await callAPIgetShipperActive(token));
      dispatch(await callAPIGetStationByKitchen(token));
      dispatch(await callAPIGetSlot(token));
    };
    getfoodByFoodGroupId();
  }, [dispatch, idKitchen, token]);

  const stationOfkichen = useSelector((state) => {
    return state.userReducer.listShipperActive;
  });
  const Slot = useSelector((state) => {
    return state.userReducer.listSlots;
  });

  const [valueTag, setValueTag] = React.useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);

    setValueTag(e.target.value);
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const listShipperSelectbox = useSelector((state) => {
    return state.userReducer.listShipperActive;
  });
  // console.log(listShipperSelectbox)

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      shippers: [],
    },
    onSubmit: async (values) => {
      // const a = [];

      console.log(1);
      // for (const i of valueTag) {
      //     const arr = listShipperSelectbox.filter((item) => item.name === i);

      //     if (arr.length > 0) {
      //         a.push(arr[0].id);
      //     }
      // }
      const data = {
        shipperId: valueTag,
        // shipperId: formik.values.shipperId,
        timeSlotId: slot,
        stationId: stationID,
        deliveryDate: convert(valueStarTime.$d),
        ordersIds: selectionModel,
        // ordersIds: a,
      };

      console.log(data);
      try {
        const res = await API("POST", URL_API + `/delivery_trips`, data, token);
        CustomizedToast({
          message: `Đã tạo chuyếns thành công`,
          type: "SUCCESS",
        });
      } catch (error) {
        CustomizedToast({
          message: "Vui lòng xem lại thông tin",
          type: "ERROR",
        });
      }
    },
  });

  return (
    <Paper>
      <Dialog open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Chọn tài xế"
            subTitle="Vui lòng chọn 1 tài xế"
            icon={getIcon("carbon:delivery")}
          />
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ width: "28rem", height: "8rem", marginTop: "2%" }}>
              <div>
                <FormControl sx={{ width: "28rem" }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Tài xế
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={valueTag}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput label="Shipper" />}
                    MenuProps={MenuProps}
                  >
                    {listShipperSelectbox.map((item) => (
                      <MenuItem value={item.id}>
                        {/* <Avatar src={item.account.profile.avatar} alt="food" />
                        <ListItemText primary={item.account.profile.fullName} /> */}
                        {item.account.profile.fullName}
                      </MenuItem>
                    ))}

                    {formik.touched.fullName && formik.errors.fullName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-username-login"
                      >
                        {formik.errors.fullName}
                      </FormHelperText>
                    )}
                  </Select>
                </FormControl>
              </div>
              <Box sx={{ marginLeft: "6.5rem", marginTop: "2rem" }}>
                <ButtonCustomize
                  nameButton="Tạo chuyến đi"
                  type="submit"
                  width="15rem"
                />
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
