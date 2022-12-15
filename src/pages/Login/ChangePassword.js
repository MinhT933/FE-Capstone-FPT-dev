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

export default function ChangePassword() {
  const [pass, setPass] = useState({
    newPass: "",
    confirmPass: "",
    showPass: false,
  });

  const handlePassVisibilty = () => {
    setPass({
      ...pass,
      showPass: !pass.showPass,
    });
  };
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");


  const formik = useFormik({
    //gắn schema để so sánh
    // validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    // initialValues: {
    //   pass,
    // },

    //onSubmit ngay từ cái tên đầu nó dùng đẩy data xuống BE
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await API(
          "PUT",
          URL_API + "/accounts/forgotPassword",
          pass.newPass,
          token
        );

        CustomizedToast({
          message: `Đã đổi mật khẩu thành công`,
          type: "SUCCESS",
        });
        Navigate("/");
      } catch (error) {
        CustomizedToast({
          message: `đã đổi mật khẩu không thành công`,
          type: "ERROR",
        });
      }
    },
  });
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
                <h1> Tạo mật khẩu mới </h1>
                <p sx={{ paddingLeft: "1%", paddingBottom: "2%" }}>
                  Tạo mật khẩu mới có tối thiểu 6 ký tự. Mật khẩu mạnh là mật
                  khẩu được kết hợp từ các ký tự, số và dấu câu.
                </p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      type={pass.showPass ? "text" : "newPass"}
                      fullWidth
                      label="Nhập mật khẩu mới"
                      placeholder="Mật khẩu"
                      variant="outlined"
                      value={pass.newPass}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handlePassVisibilty}
                              aria-label="toggle password"
                              edge="end"
                            >
                              {pass.showPass ? (
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
                      type={pass.showPass ? "text" : "confirmPass"}
                      fullWidth
                      label="Nhập lại mật khẩu"
                      placeholder="Mật khẩu"
                      variant="outlined"
                      // value={pass.confirmPass}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handlePassVisibilty}
                              aria-label="toggle password"
                              edge="end"
                            >
                              {pass.showPass ? (
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
                  <Grid container columnSpacing={2}>
                    <Grid item sx={2}>
                      <div>
                        <Checkbox {...label} />
                        <label>Nhớ mật khẩu</label>
                      </div>
                    </Grid>
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
