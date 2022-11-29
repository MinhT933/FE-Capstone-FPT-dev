import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "../../components/hook-form/Iconify";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
//time
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Paper from "@mui/material/Paper";

//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
//validate
import { useFormik } from "formik";
import * as yup from "yup";

import { useSelector } from "react-redux";
import {
  callAPIgetListCategory,
  callAPIgetListKitchen,
  callAPIgetListKitchenActive,
  callAPIgetListKitchenById,
  callAPIgetListStation,
  callAPIgetListStationbyidKitchen,
} from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
  name: yup.string().required("Điền đầy đủ thông tin").trim(),
  address: yup.string().required("Điền đầy đủ thông tin").trim(),
  phone: yup.string().required("Điền đầy đủ thông tin").trim(),
  kitchen: yup.string().required("Điền đầy đủ thông tin").trim(),
});

//callAPIforCreateStation========================================
export default function NewStation() {

  const navigate = useNavigate();
  //callAPIforCreateStation========================================
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   const getlistStation = async () => {
  //     await dispatch(callAPIgetListStation());

  //   };
  //   getlistStation();
  // }, []);

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token === null) {
    Navigate("/");
  }
  try {
    var decoded = jwt_decode(token);
    // valid token format
  } catch (error) {
    // return <Navigate to="/" replace />;
    Navigate("/");
  }
  // const decoded = jwt_decode(token);

  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [idkitchen, setIdkitchen] = useState("");


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

  React.useEffect(() => {
    const getlistStation = async () => {
      dispatch(await callAPIgetListStation(token));

      dispatch(await callAPIgetListKitchenActive(token));
    };
    getlistStation();
  }, [dispatch, token, idkitchen]);

  const [valueTag, setValueTag] = React.useState([]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;

    const a = listKitchenActive.find((c) => c.id === value);
    console.log(a);
    setValueTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // React.useEffect(() => {
  //   const getfoodByFoodGroupId = async () => {
  //     // dispatch(await callAPIgetShipperOfKitchen(token, idKitchen));
  //     // dispatch(await callAPIgetListStation(token));
  //     dispatch(await callAPIgetListStation(token));
  //     // dispatch(await callAPIgetListStationbyidKitchen(token, idkitchen));
  //     dispatch(await callAPIgetListKitchen(token));
  //   };
  //   getfoodByFoodGroupId();
  // }, [dispatch, token, idkitchen]);

  const station = useSelector((state) => {
    return state.userReducer.listStation;
  });

  const listKitchenActive = useSelector((state) => {
    return state.userReducer.listKitchenActive;
  });

  const getOptionsKichen = () => {
    const item = [];
    for (var i = 0; i < listKitchenActive.length; i++) {
      item.push({
        id: listKitchenActive[i].id,
        title: listKitchenActive[i].account.profile.fullName,
      });
    }
    return item;
  };

  const Input = styled("input")({
    display: "none",
  });
  //xử lí hình ảnh

  const [opentime, setOpentime] = useState([dayjs("2022-10-18T21:11:5")]);
  const [closetime, setClosetime] = useState([dayjs("2022-10-18T21:11:5")]);
  // const token = localStorage.getItem("token");


  //formData để lưu data

  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      name: "",
      address: "",
      phone: "",
      opentime: "",
      closetime: "",

      kitchenIds: [],
    },

    onSubmit: async (values) => {

      const a = [];
      for (const i of valueTag) {
        const arr = listKitchenActive.filter((item) => item.name === i);

        if (arr.length > 0) {
          a.push(arr[0].id);
        }
      }

      const closeTimeSplit = new Date(closetime).toTimeString().split(":");
      const openTimeSplit = new Date(opentime).toTimeString().split(":");
      const data = {
        name: formik.values.name,
        address: formik.values.address,
        phone: formik.values.phone,
        openTime: `${openTimeSplit[0]}:${openTimeSplit[1]}`,
        closeTime: `${closeTimeSplit[0]}:${closeTimeSplit[1]}`,

        kitchenIds: a,
      };
      try {
        const res = await API("POST", URL_API + "/stations", data, token);

        if (res) {
          CustomizedToast({
            message: `Đã thêm ${formik.values.name}`,
            type: "SUCCESS",
          });
        }
        navigate("/dashboard/admin/station");

      } catch (error) {
        CustomizedToast({
          message: "Vui lòng xem lại thông tin",
          type: "ERROR"
        });
      }
    },
  });

  //   function _treat(e) {
  //     formik.setFieldValue("image", e.target.files[0]);

  //     setInput(URL.createObjectURL(e.target.files[0]));
  //   }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));
  console.log(new Date(opentime).toTimeString());
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2%",
        marginBottom: "10%",
        margin: "2%",
      }}
    >
      <PageHeader
        display="left"
        title="Thêm trạm"
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("carbon:location-company")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          //   space-around="space-around"
          // sx={{ float: "right", width: "60%", flexGrow: 1 }}
          display="flex"
          // justifyContent="left"
          // alignItems="left"
          sx={{
            // marginLeft: "33%", 
            marginTop: "2%",
          }}
        >
          <Grid
            // container spacing={4}
            // columns={20}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} >
              <Stack spacing={3}>
                <Controls.Input
                  fullWidth
                  variant="outlined"
                  label="Tên trạm"
                  name="name"
                  value={formik.values.name}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.name}
                  </FormHelperText>
                )}


                <Controls.Input
                  fullWidth
                  variant="outlined"
                  label="Địa chỉ"
                  name="address"
                  value={formik.values.address}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.address}
                  </FormHelperText>
                )}


                <Controls.Input
                  fullWidth
                  variant="outlined"
                  label="Điện thoại"
                  name="phone"
                  value={formik.values.phone}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.phone}
                  </FormHelperText>
                )}

                <FormControl
                  sx={{
                    // width: "25.1rem",
                    width: "85.8%",
                  }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Bếp
                  </InputLabel>
                  <Select
                    // fullWidth
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    // multiple={true}
                    value={valueTag}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput label="Bếp" />}
                    // renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {listKitchenActive.map((item) => (
                      <MenuItem key={item.id} value={item.account.profile.fullName}>
                        <Checkbox
                          checked={valueTag.indexOf(item.account.profile.fullName) > -1}
                        />
                        <ListItemText primary={item.account.profile.fullName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.kitchen && formik.errors.kitchen && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.kitchen}
                  </FormHelperText>
                )}


                <Box sx={{ padding: "0" }}>
                  <Grid
                    container spacing={3}
                    // columns={24}
                    // container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid
                      item xs={5.2}
                    >
                      <Item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Mở cửa"
                            name="openTime"
                            value={opentime}
                            onChange={(e) => {
                              setOpentime(e);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Item>
                    </Grid>
                    <Grid
                      item xs={5.2}
                    >
                      <Item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Đóng cửa"
                            name="closeTime"
                            value={closetime}
                            onChange={(e) => {
                              setClosetime(e);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Grid>

          </Grid>
        </Box>

        <Box>
          <Stack
            width="20%"
            justifyContent="center"
            marginLeft={"40%"}
            marginTop={"2%"}
          >
            <ButtonCustomize nameButton="Thêm trạm" type="submit" />
          </Stack>
        </Box>
      </form>
    </Paper>
  );
}
