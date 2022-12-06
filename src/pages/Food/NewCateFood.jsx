import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import PageHeader from "../../components/PageHeader";
import DialogTitle from "@mui/material/DialogTitle";
import Iconify from "../../components/hook-form/Iconify";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import Controls from "./../../components/Control/Controls";
import FormHelperText from "@mui/material/FormHelperText";
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  callAPIgetCatePackage,
  callAPIgetListCategory,
} from "./../../redux/action/acction";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const shema = yup.object().shape({
  name: yup.string().required(" Vui điền đầy đủ thông tin"),
});

const Inputs = styled("input")({
  display: "none",
});
export default function NewCateFood(props) {
  const { OpenPopUpCate, SetOpenPopUpCate } = props;
  const [inputImage, setInputImage] = useState();
  // const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  const dispatch = useDispatch();
  const handleClose = () => {
    SetOpenPopUpCate(false);
  };

  function _ontreat(e) {
    console.log(e.target.files);
    formik.setFieldValue("img", e.target.files[0]);

    setInputImage(URL.createObjectURL(e.target.files[0]));
  }

  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  const formData = new FormData();
  const formik = useFormik({
    validationSchema: shema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      img: null,
    },

    onSubmit: async (values) => {
      const data = {
        name: formik.values.name,
      };
      try {
        const res = await API(
          "POST",
          URL_API + "/food-categories",
          data,
          token
        ).then((res) => {
          dispatch(callAPIgetListCategory(token));
        });
        CustomizedToast({
          message: `Đã thêm loại thức ${formik.values.name}`,
          type: "SUCCESS",
        });
        SetOpenPopUpCate(false);
      } catch (error) {
        CustomizedToast({
          message: "Thêm thất bại vui lòng kiểm tra thông tin",
          type: "ERROR",
        });
      }
    },
  });

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "center",
        boxShadow: 12,
      }}
    >
      <Paper>
        <Box>
          <Dialog
            open={OpenPopUpCate}
            onClose={handleClose}
            style={{ minHeight: "80vh", maxHeight: "120vh" }}
          >
            <DialogTitle>
              <PageHeader
                title="Tạo loại món ăn"
                subTitle="Điền đầy đủ thông tin"
                icon={getIcon("carbon:collapse-categories")}
              />
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <Controls.Input
                label="Tên loại món ăn"
                name="name"
                width="90%"
                marginLeft="13%"
                marginTop="8%"
                marginBottom="8%"
                value={formik.values.name}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              {formik.touched.name && formik.errors.name && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-username-login"
                >
                  {formik.errors.name}
                </FormHelperText>
              )}
              <Box>
                <Box
                  sx={{
                    marginLeft: "38%",
                    paddingBottom: "1rem",
                    marginTop: "0.15rem",
                  }}
                >
                  <ButtonCustomize nameButton="Thêm" type="submit" />
                </Box>
              </Box>
            </form>
          </Dialog>
        </Box>
      </Paper>
    </Box>
  );
}
