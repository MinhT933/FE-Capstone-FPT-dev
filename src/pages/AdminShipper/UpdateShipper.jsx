import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "../../components/hook-form/Iconify";

import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";

//time
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";

//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
//validate
import { useFormik } from "formik";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate, useParams } from "react-router-dom";

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
  fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
  email: yup.string().email("email Không đúng").trim(),
  noPlate: yup.string().required("Điền đầy đủ thông tin").trim(),
  vehicleType: yup.string().required("Điền đầy đủ thông tin").trim(),
});

//callAPIforCreateStation========================================
export default function UpdateShipper() {
  const [valueStarTime, setValueStarTime] = React.useState(
    dayjs("2022-10-23T21:11:5")
  );
  //callAPIforCreateStation========================================
  let { id } = useParams();

  const navigate = useNavigate();

  // const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  React.useEffect(() => {
    API("GET", URL_API + `/shippers/${id}`, null, token)
      .then((res) => {
        console.log(res);
        formik.setFieldValue(
          "fullName",
          res.data.result.account.profile.fullName
        );
        formik.setFieldValue(
          "DOB",
          setValueStarTime(res.data.result.account.profile.DOB)
        );
        formik.setFieldValue("email", res.data.result.account.profile.email);
        formik.setFieldValue("noPlate", res.data.result.noPlate);
        formik.setFieldValue("vehicleType", res.data.result.vehicleType);
      })
      .catch((error) => {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      });
  }, []);

  const handleDate = (time) => {
    const a = new Date(time).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-${a[1]}-0${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
  };
  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      fullName: "",
      DOB: "",
      email: "",
      noPlate: "",
      vehicleType: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      const data = {
        fullName: formik.values.fullName,
        DOB: handleDate(valueStarTime),
        email: formik.values.email,
        noPlate: formik.values.noPlate,
        vehicleType: formik.values.vehicleType,
      };
      try {
        const res = await API("PUT", URL_API + `/shippers/${id}`, data, token);
        if (res) {
          CustomizedToast({
            message: `Cập nhập ${formik.values.fullName} thành công`,
            type: "SUCCESS",
          });
        }
        navigate("/dashboard/admin/adminshipper");
      } catch (error) {
        CustomizedToast({ message: "Cập nhập thất bại", type: "ERROR" });
      }
    },
  });
  const b = new Date(valueStarTime).toLocaleDateString().split("/");
  console.log(b);
  return (
    <Paper
      title="Cập nhập bếp"
      elevation={3}
      sx={{
        padding: "2%",
        marginBottom: "10%",
        margin: "2%",
        marginTop: "2%",
      }}
    >
      <PageHeader
        display="left"
        title="Cập nhập tài xế"
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("carbon:delivery")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          //   space-around="space-around"
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
                  label="Họ tên"
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

                <Controls.DatePicker
                  label="Ngày sinh"
                  inputFormat="DD-MM-YYYY"
                  value={valueStarTime}
                  onChange={(e) => {
                    console.log(e);
                    setValueStarTime(e);
                  }}
                />
                {formik.touched.DOB && formik.errors.DOB && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.DOB}
                  </FormHelperText>
                )}

                <Controls.TextField
                  type="email"
                  sx={{ width: "85%" }}
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
                  label="Biển số xe"
                  name="noPlate"
                  value={formik.values.noPlate}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
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
                  label="Loại xe"
                  name="vehicleType"
                  value={formik.values.vehicleType}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
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
          <Stack
            width="20%"
            justifyContent="center"
            marginLeft={"40%"}
            marginTop={"2%"}
          >
            <ButtonCustomize nameButton="Cập nhập" type="submit" />
          </Stack>
        </Box>
      </form>
    </Paper>
  );
}
