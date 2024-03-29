import React, { useState } from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { FormHelperText, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import Iconify from "../../components/hook-form/Iconify";
//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import ButtonCustomize from "../../components/Button/ButtonCustomize";

//validate
import { useFormik } from "formik";
import * as yup from "yup";
import { callAPIAdminCreateShipper, callAPIgetListKitchenActive } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//time
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";

import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

//callAPIAdminCreateShipper=================================
const schema = yup.object().shape({
  phone: yup
    .number()
    .min(100000000, "Quá ngắn")
    .max(9999999999, "Quá dài")
    .typeError("Số điện thoại phải nhập số")
    .required("Số điện thoại phải nhập số"),
  email: yup.string().email("email Không đúng").trim(),
  noPlate: yup.string().required("Điền đầy đủ thông tin").trim(),
  vehicleType: yup.string().required("Điền đầy đủ thông tin").trim(),
});
//callAPIAdminCreateShipper=================================

export default function NewShipper() {
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
  //callAPIAdminCreateShipper=================================
  const dispatch = useDispatch();
  React.useEffect(() => {
    const createShipper = async () => {
      await dispatch(callAPIAdminCreateShipper());
      dispatch(await callAPIgetListKitchenActive(token));
    };
    createShipper();
    //disparch để kết thúc vào lặp vô tận loop infinity á
  }, [dispatch]);

  // const token = localStorage.getItem("token");

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }
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

  //selected dùng để lí ảnh

  //dùng use formik để validate giá trị nhập vào
  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      fullName: "",
      phone: "",
      noPlate: "",
      vehicleType: "",
      image: null,
      kitchenId: "",
    },

    //onSubmit ngay từ cái tên đầu nó dùng đẩy data xuống BE
    onSubmit: async (values) => {
      const data = {
        fullName: formik.values.fullName,
        kitchenId: formik.values.kitchenId,
        phone: formik.values.phone,
        noPlate: formik.values.noPlate,
        password: formik.values.password,
        email: formik.values.email,
        vehicleType: formik.values.vehicleType,
        DOB: setValueStarTime(formik.values.DOB),
      };
      try {
        const res = await API(
          "POST",
          URL_API + "/auths/register/shipper",
          data,
          token
        );
        CustomizedToast({
          message: `Đã thêm tài xế ${formik.values.fullName}`,
          type: "SUCCESS",
        });
        // window.location.reload(true);
      } catch (error) {
        if (error.response.data.message === "Account already exists") {
          CustomizedToast({ message: "Tài khoản đã tồn tại", type: "ERROR" });
        } else if (error.response.data.message === "Email already exists") {
          CustomizedToast({ message: "Email đã tồn tại", type: "ERROR" });
        } else if (error.response.data.message === "noPlate already exists") {
          CustomizedToast({ message: "Biển số xe đã tồn tại", type: "ERROR" });
        } else {
          CustomizedToast({ message: "Thêm không thành công", type: "ERROR" });
        }
      }
    },
  });

  const [valueStarTime, setValueStarTime] = React.useState(
    dayjs("2022-10-23T21:11:5")
  );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2%",
        marginBottom: "10%",
        margin: "2%",

        marginTop: "2%",
        // marginLeft: "5%",
        // MarginRounded: "4%"
      }}
    >
      <PageHeader
        display="left"
        title="Thêm tài xế "
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("carbon:delivery")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          space-around="space-around"
          // sx={{ float: "right", width: "60%", flexGrow: 1 }}
          display="flex"
          justifyContent="left"
          alignItems="left"
          sx={{ marginLeft: "33%" }}
        >
          <Grid container spacing={4} columns={20}>
            <Grid item xs={12}>
              <Stack spacing={3}>
                <Controls.Input
                  variant="outlined"
                  name="fullName"
                  label="Họ Tên"
                  width="102%"
                  required
                  value={formik.values.fullName || ""}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {/* nếu sai thì nó đỏ */}
                {formik.touched.fullName && formik.errors.fullName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.fullName}
                  </FormHelperText>
                )}

                <TextField
                  type={values.showPass ? "text" : "password"}
                  name="password"
                  // sx={{'.css-r0m7rw-MuiInputBase-root-MuiOutlinedInput-root: 20rem'}}
                  sx={{ width: "88%" }}
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

                <Controls.TextField
                  type="email"
                  name="email"
                  sx={{ width: "88%" }}
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

                <Controls.TextField
                  // type="number"
                  // fullWidth
                  sx={{ width: "88%" }}
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
                <Controls.DatePicker
                  label="Ngày tháng năm sinh"
                  width="102%"
                  required
                  inputFormat="DD-MM-YYYY"
                  value={valueStarTime}
                  onChange={(e) => {
                    setValueStarTime(e);
                  }}
                />

                <Controls.Input
                  variant="outlined"
                  required
                  name="noPlate"
                  label="Biển số xe"
                  width="102%"
                  value={formik.values.noPlate || ""}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {/* nếu sai thì nó đỏ */}
                {formik.touched.noPlate && formik.errors.noPlate && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.noPlate}
                  </FormHelperText>
                )}
                <Controls.Input
                  variant="outlined"
                  name="vehicleType"
                  width="102%"
                  label="Loại xe"
                  value={formik.values.vehicleType}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {/* nếu sai thì nó đỏ */}
                {formik.touched.vehicleType && formik.errors.vehicleType && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.vehicleType}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <ButtonCustomize
            nameButton="Thêm tài xế"
            type="submit"
            marginLeft="45%"
            marginTop="2%"
          />
        </Box>
      </form>
    </Paper>
  );
}
