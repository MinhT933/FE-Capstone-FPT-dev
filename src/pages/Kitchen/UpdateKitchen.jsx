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
import Paper from "@mui/material/Paper";

//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
//validate
import { useFormik } from "formik";
import * as yup from "yup";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from 'jwt-decode';

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
  fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
  email: yup.string().required("Điền đầy đủ thông tin").trim(),
  address: yup.string().required("Điền đầy đủ thông tin").trim(),
  ability: yup.string().required("Điền đầy đủ thông tin").trim(),
});

//callAPIforCreateStation========================================
export default function UpdateKitchen() {
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
    API("GET", URL_API + `/kitchens/${id}`, null, token)
      .then((res) => {
        formik.setFieldValue(
          "fullName",
          res.data.result.account.profile.fullName
        );
        formik.setFieldValue("email", res.data.result.account.profile.email);
        formik.setFieldValue("address", res.data.result.address);
        formik.setFieldValue("ability", res.data.result.ability);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const station = useSelector((state) => {
    return state.userReducer.listKitchen;
  });


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
      ability: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      const data = {
        fullName: formik.values.fullName,
        email: formik.values.email,
        address: formik.values.address,
        ability: formik.values.ability,
      };
      try {
        const res = await API("PUT", URL_API + `/kitchens/${id}`, data, token);

        if (res) {
          CustomizedToast({
            message: `Cập nhập ${formik.values.fullName} thành công`,
            type: "SUCCESS",
          });
        }
        navigate("/dashboard/admin/kitchen");
      } catch (error) {
        console.log(error);
        CustomizedToast({ message: "Cập nhập thất bại", type: "ERROR" });
      }
    },
  });


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
        title="Cập nhập bếp"
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("mdi:chef-hat")}
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
            <Grid item xs={12} >
              <Stack spacing={3}>
                <Controls.Input
                  variant="outlined"
                  label="Tên bếp"
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

                <Controls.Input
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
                  variant="outlined"
                  label="Email"
                  name="email"
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
                  label="Công suất"
                  name="ability"
                  value={formik.values.ability}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ability && formik.errors.ability && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.ability}
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
