import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "../../components/hook-form/Iconify";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
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
  callAPIgetListKitchenActive,
  callAPIgetListStation,
} from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate } from "react-router-dom";

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
  name: yup.string().required("Điền đầy đủ thông tin").trim(),
  address: yup.string().required("Điền đầy đủ thông tin").trim(),
  phone: yup
    .number()
    .min(100000000, "Quá ngắn")
    .max(9999999999, "Quá dài")
    .typeError("Số điện thoại phải nhập số")
    .required("Số điện thoại phải nhập số"),

  kitchenId: yup.string().required("Điền đầy đủ thông tin").trim(),
});

//callAPIforCreateStation========================================
export default function NewStation() {
  const navigate = useNavigate();
  //callAPIforCreateStation========================================
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token === null) {
    Navigate("/");
  }

  // const decoded = jwt_decode(token);

  const [idkitchen, setIdkitchen] = useState("");

  React.useEffect(() => {
    const getlistStation = async () => {
      dispatch(await callAPIgetListStation(token));

      dispatch(await callAPIgetListKitchenActive(token));
    };
    getlistStation();
  }, [dispatch, token, idkitchen]);

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

  //xử lí hình ảnh

  const [opentime, setOpentime] = useState([dayjs("2022-10-18T21:11:5")]);
  const [closetime, setClosetime] = useState([dayjs("2022-10-18T21:11:5")]);
  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      kitchenId: "",
      name: "",
      address: "",
      phone: "",
      opentime: "",
      closetime: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      const closeTimeSplit = new Date(closetime).toTimeString().split(":");
      const openTimeSplit = new Date(opentime).toTimeString().split(":");
      const data = {
        kitchenId: formik.values.kitchenId,
        name: formik.values.name,
        address: formik.values.address,
        phone: formik.values.phone,
        // openTime: opentime,
        // closeTime: closetime,
        openTime: `${openTimeSplit[0]}:${openTimeSplit[1]}`,
        closeTime: `${closeTimeSplit[0]}:${closeTimeSplit[1]}`,
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
          type: "ERROR",
        });
      }
    },
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

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
          display="flex"
          justifyContent="left"
          alignItems="left"
          sx={{
            marginTop: "2%",
            marginLeft: "9%",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
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

                <Controls.TextField
                  // type="number"
                  // fullWidth
                  sx={{ width: "86%" }}
                  name="phone"
                  label="Điện thoại"
                  placeholder="Điện thoại"
                  variant="outlined"
                  required
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

                <Controls.Select
                  label="Bếp"
                  width="86%"
                  name="kitchenId"
                  options={getOptionsKichen()}
                  value={formik.values.kitchenId}
                  onChange={async (e) => {
                    const a = listKitchenActive.find(
                      (c) => c.id === e.target.value
                    );

                    formik.setFieldValue("kitchenId", a.id);
                  }}
                />
                {formik.touched.kitchenId && formik.errors.kitchenId && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.kitchenId}
                  </FormHelperText>
                )}

                <Box sx={{ padding: "0" }}>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs={5.2}>
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
                    <Grid item xs={5.2}>
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
