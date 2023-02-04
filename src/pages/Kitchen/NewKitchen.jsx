import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "../../components/hook-form/Iconify";

import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";

//time
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";

//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
//validate
import { useFormik } from "formik";
import * as yup from "yup";

import { callAPIgetListKitchen } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { styled } from "@mui/material/styles";

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
  phone: yup
    .number()
    .min(100000000, "Quá ngắn")
    .max(9999999999, "Quá dài")
    .typeError("Số điện thoại phải nhập số")
    .required("Số điện thoại phải nhập số"),

  email: yup.string().email("Email Không đúng").trim(),
  password: yup.string().required("Điền đầy đủ thông tin").trim(),
  fullName: yup.string().required("Điền đầy đủ thông tin").trim(),

  address: yup.string().required("Điền đầy đủ thông tin").trim(),
  ability: yup.string().required("Điền đầy đủ thông tin").trim(),
  openingDate: yup.string().required("Điền đầy đủ thông tin").trim(),
});
//================================================================

//callAPIforCreateStation========================================
export default function NewKitchen() {
  const [valueStarTime, setValueStarTime] = React.useState(
    dayjs("2022-10-23T21:11:5")
  );

  const [values, setValues] = useState({
    phone: "",
    password: "",
    showPass: false,
  });
  const handlePassVisibilty = () => {
    setValues({
      ...formik.values.password,
      showPass: !values.showPass,
    });
  };

  //callAPIforCreateStation========================================
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  if (token === null) {
    navigate("/");
  }

  React.useEffect(() => {
    const getlistStation = async () => {
      await dispatch(callAPIgetListKitchen());
    };
    getlistStation();
  }, []);

  const [opentime, setOpentime] = useState(null);
  const [closetime, setClosetime] = useState(null);
  // const [coordinate,setCoordinate] = useState(0);
  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      opentime: "",
      closetime: "",
      openingDate: "",
    },

    onSubmit: async (values) => {
      const closeTimeSplit = new Date(closetime).toTimeString().split(":");
      const openTimeSplit = new Date(opentime).toTimeString().split(":");
      const data = {
        password: formik.values.password,
        fullName: formik.values.fullName,
        email: formik.values.email,
        address: formik.values.address,
        phone: formik.values.phone,
        openTime: `${openTimeSplit[0]}:${openTimeSplit[1]}`,
        closeTime: `${closeTimeSplit[0]}:${closeTimeSplit[1]}`,
      };
      try {
        const res = await API(
          "POST",
          URL_API + "/auths/register/kitchen",
          data,
          token
        );
        if (res) {
          CustomizedToast({
            message: `Đã thêm ${formik.values.fullName}`,
            type: "SUCCESS",
          });
        }
        navigate("/dashboard/admin/kitchen");
      } catch (error) {
        if (error.response.data.message === "Account already exists") {
          CustomizedToast({ message: "Tài khoản đã tồn tại", type: "ERROR" });
        } else if (error.response.data.message === "Email already exists") {
          CustomizedToast({ message: "Email đã tồn tại", type: "ERROR" });
        } else {
          CustomizedToast({ message: "Thêm không thành công", type: "ERROR" });
        }
      }
    },
  });
  console.log(formik);
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
        title="Thêm bếp"
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("mdi:chef-hat")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          justifyContent="left"
          alignItems="left"
          sx={{ marginLeft: "33%", marginTop: "2%" }}
        >
          <Grid container spacing={4} columns={20}>
            <Grid item xs={12}>
              <Stack spacing={3}>
                <Controls.Input
                  sx={{ width: "23.2rem" }}
                  variant="outlined"
                  required
                  label="Tên bếp"
                  placeholder="Tên bếp"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.fullName}
                  </FormHelperText>
                )}

                <Controls.TextField
                  // type="number"
                  sx={{ width: "23.2rem" }}
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

                <Controls.TextField
                  type="email"
                  sx={{ width: "23.2rem" }}
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="Email"
                  variant="outlined"
                  required
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.email}
                  </FormHelperText>
                )}

                <Controls.Input
                  variant="outlined"
                  label="Địa chỉ"
                  placeholder="Địa chỉ"
                  required
                  // fullWidth
                  sx={{ width: "24rem" }}
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

                <TextField
                  type={values.showPass ? "text" : "password"}
                  name="password"
                  sx={{ width: "23.2rem" }}
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  variant="outlined"
                  required
                  value={formik.values.password}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePassVisibilty}
                          aria-label="toggle password"
                          edge="end"
                        >
                          {values.showPass ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.password}
                  </FormHelperText>
                )}

                <Controls.DatePicker
                  // sx={{ width: "22.2rem" }}
                  label="Ngày mở cửa"
                  name="openingDate"
                  width="27rem"
                  inputFormat="DD-MM-YYYY"
                  value={valueStarTime}
                  onChange={(e) => {
                    setValueStarTime(e);
                  }}
                />

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
            <ButtonCustomize nameButton="Thêm bếp" type="submit" />
          </Stack>
        </Box>
      </form>
    </Paper>
  );
}
