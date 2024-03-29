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

import { callAPIgetAccountManager } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate } from "react-router-dom";

import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
  // fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
  // phone: yup.string().required("Điền đầy đủ thông tin").trim(),
  // email: yup.string().required("Điền đầy đủ thông tin").trim(),
  // password: yup.string().required("Điền đầy đủ thông tin").trim(),
  fullName: yup.string().required("").trim(),
  phone: yup
    .number()
    .min(100000000, "Quá ngắn")
    .max(9999999999, "Quá dài")
    .typeError("Số điện thoại phải nhập số")
    .required("Số điện thoại phải nhập số"),
  email: yup.string().email("email Không đúng").trim(),
  password: yup.string().required("").trim(),
});

//callAPIforCreateStation========================================
export default function NewManager() {
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

  // const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  const dispatch = useDispatch();
  React.useEffect(() => {
    const getlistStation = async () => {
      await dispatch(callAPIgetAccountManager());
    };
    getlistStation();
  }, [dispatch, token]);

  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const data = {
        fullName: formik.values.fullName,
        phone: formik.values.phone,
        email: formik.values.email,
        password: formik.values.password,
      };
      try {
        const res = await API(
          "POST",
          URL_API + "/auths/register/manager",
          data,
          token
        );
        CustomizedToast({
          message: `Đã thêm ${formik.values.fullName}`,
          type: "SUCCESS",
        });
      } catch (error) {
        // error.response.data.message === "Account already exists"
        //   ? CustomizedToast({ message: "Tài khoản đã tồn tại", type: "ERROR" })
        //   : CustomizedToast({
        //       message: "Thêm không thành công",
        //       type: "ERROR",
        //     });
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

  return (
    <Paper
      title="Quản lí"
      elevation={3}
      sx={{
        padding: "2%",
        marginBottom: "10%",
        margin: "2%",
      }}
    >
      <PageHeader
        display="left"
        title="Thêm tài khoản quản lí"
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("wpf:administrator")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          space-around="space-around"
          // sx={{ float: "right", width: "60%", flexGrow: 1 }}
          display="flex"
          justifyContent="left"
          alignItems="left"
          sx={{ marginLeft: "30%", marginTop: "2%" }}
        >
          <Grid container spacing={4} columns={20}>
            <Grid item xs={12}>
              <Stack spacing={3}>
                <Controls.TextField
                  // type="fullName"
                  fullWidth
                  name="fullName"
                  label="Họ tên"
                  placeholder="Họ tên"
                  variant="outlined"
                  required
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
                  fullWidth
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

                <TextField
                  type={values.showPass ? "text" : "password"}
                  name="password"
                  // sx={{'.css-r0m7rw-MuiInputBase-root-MuiOutlinedInput-root: 20rem'}}
                  // sx={{ width: "23.2rem" }}
                  fullWidth
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
            <ButtonCustomize nameButton="Thêm tài khoản" type="submit" />
          </Stack>
        </Box>
      </form>
    </Paper>
  );
}
