import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { URL_API } from "../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import API from "../../Axios/API/API";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  // name: yup.string().required("Điền đầy đủ thông tin").trim(),
  // address: yup.string().required("Điền đầy đủ thông tin").trim(),
  // phone: yup
  //   .number()
  //   .min(100000000, "Quá ngắn")
  //   .max(9999999999, "Quá dài")
  //   .typeError("Số điện thoại phải nhập số")
  //   .required("Số điện thoại phải nhập số"),
  // kitchenId: yup.string().required("Điền đầy đủ thông tin").trim(),
});
export default function ChangePassword() {
  const [newpass, setPassnewpass] = useState({
    newPassword: "",
    showPass: false,
  });

  const [oldpass, setPassOld] = useState({
    oldPassword: "",
    showPass: false,
  });

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");

  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },

    //onSubmit ngay từ cái tên đầu nó dùng đẩy data xuống BE
    onSubmit: async (values) => {
      const data = {
        oldPassword: formik.values.oldPassword,
        newPassword: formik.values.newPassword,
      };
      try {
        const res = await API(
          "PUT",
          URL_API + "/accounts/changePassword",
          data,
          token
        );

        CustomizedToast({
          message: `Đã đổi mật khẩu thành công`,
          type: "SUCCESS",
        });
        Navigate("/");
      } catch (error) {
        CustomizedToast({
          message: `Đổi mật khẩu không thành công`,
          type: "ERROR",
        });
      }
    },
  });

  const handlePassVisibilty = () => {
    setPassnewpass({
      ...newpass,
      showPass: !newpass.showPass,
    });
  };

  const handlePass = () => {
    setPassOld({
      ...oldpass,
      showPass: !oldpass.showPass,
    });
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#5dc9bc"),
    backgroundColor: "#ffeb3b",
    "&:hover": {
      backgroundColor: "#5dc9bc",
    },
    display: "center",
  }));

  return (
    <Box
      sx={{ float: "center", width: "100%" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <div>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Paper elevation={3} sx={{ padding: 10, marginBottom: 0.5 }}>
              <div style={{ marginBottom: "4%" }}>
                <h1>Đổi mật khẩu </h1>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      type={oldpass.showPass ? "text" : "password"}
                      fullWidth
                      name="oldPassword"
                      label="Nhập mật khẩu cũ"
                      placeholder="Mật khẩu"
                      variant="outlined"
                      value={formik.values.oldPassword}
                      required
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handlePass}
                              aria-label="toggle password"
                              edge="end"
                            >
                              {oldpass.showPass ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      type={newpass.showPass ? "text" : "password"}
                      fullWidth
                      name="newPassword"
                      label="Nhập mật khẩu mới"
                      placeholder="Mật khẩu"
                      variant="outlined"
                      value={formik.values.newPassword}
                      required
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
                              {newpass.showPass ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <ColorButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ padding: "3.5%" }}
                      //   href="/lo"
                    >
                      Đổi mật khẩu
                    </ColorButton>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Container>
      </div>
    </Box>
  );
}
