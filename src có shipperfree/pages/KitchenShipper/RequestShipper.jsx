import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { Grid } from "@mui/material";


import Iconify from "../../components/hook-form/Iconify";

import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";

import { useFormik } from "formik";

//time
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import API from "../../Axios/API/API";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { URL_API } from "../../Axios/URL_API/URL";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

/// csss button

const getOptionsGroup = () => [
  { id: "1", title: "1" },
  { id: "2", title: "2" },
  { id: "3", title: "3" },
  { id: "4", title: "4" },
  { id: "5", title: "5" },
];

export default function RequestShipper(props) {
  const { Open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");

  const Navigate = useNavigate();
  if (token === null) {
    Navigate("/");
  }
  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      reason: "",
      numberReq: "",
    },

    onSubmit: async (values) => {
      const data = {
        reason: formik.values.reason,
        numberReq: formik.values.numberReq,
      };

      //gọi API để đẩy data xuống   
      try {
        const res = await API("POST", URL_API + "/request", data, token);
        CustomizedToast({
          message: `Đã gửi yêu cầu`,
          type: "SUCCESS",
        });
        setOpen(false);
        // dispatch(callAPIgetListReq(token));
      } catch (error) {
        CustomizedToast({
          message: `Vui lòng xem lại thông tin`,
          type: "ERROR",
        });
      }
    },
  });
  return (
    <Dialog open={Open} onClose={handleClose}>
      <PageHeader
        display="center"
        title="Yêu cầu thêm tài xế "
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("emojione-v1:double-exclamation-mark")}
      />
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1} sx={{ width: "28rem", height: "15rem", marginTop: "2%" }}>
            <Grid item xs={12} marginLeft="10%">
              <Stack spacing={4}>
                <Controls.Input
                  variant="outlined"
                  label="Lí do"
                  name="reason"
                  width="22rem"
                  value={formik.values.reason}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.reason && formik.errors.reason && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.reason}
                  </FormHelperText>
                )}
                <Controls.Select
                  variant="outlined"
                  label="Số lượng"
                  width="22rem"
                  name="numberReq"
                  value={formik.values.numberReq}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  options={getOptionsGroup()}
                />
                {formik.touched.numberReq && formik.errors.numberReq && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.numberReq}
                  </FormHelperText>
                )}
              </Stack>
              <ButtonCustomize
                nameButton="Yêu cầu"
                width="8rem"
                marginLeft="7rem"
                marginTop="2rem"
                type="submit"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
