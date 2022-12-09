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
import { callAPIgetCatePackage } from "./../../redux/action/acction";
import { useNavigate } from "react-router-dom";


const shema = yup.object().shape({
  name: yup.string().required(" Vui điền đầy đủ thông tin"),
});

const Inputs = styled("input")({
  display: "none",
});
export default function NewCate(props) {
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
      console.log(values);
      formData.append("image", formik.values.img);
      formData.append("name", formik.values.name);
      try {
        const res = await API(
          "POST",
          URL_API + "/package-categories",
          formData,
          token
        ).then((res) => {
          dispatch(callAPIgetCatePackage(token));
        });
        CustomizedToast({
          message: `Đã thêm khung thời gian ${formik.values.name}`,
          type: "SUCCESS",
        });
        SetOpenPopUpCate(false);
      } catch (error) {
        CustomizedToast({
          message: "Thêm không thành công Vui lòng kiểm tra thông tin",
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
                title="Tạo loại gói ăn"
                subTitle="Điền đầy đủ thông tin"
                icon={getIcon("uil:schedule")}
              />
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={8}>
                  <Controls.Input
                    label="Tên gói ăn"
                    name="name"
                    width="12rem"
                    marginLeft="16%"
                    marginTop="8%"
                    // marginBottom="1%"
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
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Paper
                      sx={{
                        marginBottom: "50%",
                        paddingBottom: "10%",
                        // paddingTop: "8%",
                        borderRadius: 4,
                      }}
                    >
                      <label htmlFor="contained-button-file">
                        <Inputs
                          accept="images/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={_ontreat}
                        />

                        <Button
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          variant="contained"
                          sx={{ marginLeft: "10%" }}
                        >
                          <input hidden type="file" onChange={_ontreat} />
                          Tải ảnh
                        </Button>
                        <Box
                          id="hihi"
                          sx={{
                            height: 90,
                            width: 90,
                            marginTop: "10%",
                            objectFit: "cover",
                          }}
                        >
                          <img id="haha" src={inputImage} alt=".." />
                        </Box>
                      </label>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
              <Box>
                <Box
                  sx={{
                    marginLeft: "38%",
                    paddingBottom: "1rem",
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
