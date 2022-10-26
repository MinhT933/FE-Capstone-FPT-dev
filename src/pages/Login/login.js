import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginAthen, LoginAthenAdmin } from "./../../redux/action/acction";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
/////

const schema = yup.object().shape({
  phone: yup.string().required().trim(),
  password: yup.string().required().trim(),
});
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      phone: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      const adminData = {
        phone: formik.values.phone,
        password: formik.values.password,
      };
      dispatch(LoginAthen(adminData, navigate));
    },
  });

  const [values, setValues] = useState({
    phone: "",
    password: "",
    showPass: false,
  });

  const [age, setAge] = React.useState("");

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  const handlePassVisibilty = () => {
    setValues({
      ...formik.values.password,
      showPass: !values.showPass,
    });
  };

  var label = { inputProps: { "aria-label": "Checkbox demo" } };

  var preventDefault = function (event) {
    return event.preventDefault();
  };

  return (
    <Box
      sx={{ float: "right", width: "100%", flexGrow: 1 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <div>
        {/* <Container maxWidth="sm"> */}
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={3} sx={{ padding: 10, marginBottom: 0.5 }}>
            <div style={{ marginBottom: "8%" }}>
              <h1> Đăng Nhập </h1>
            </div>
            <>
              <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      type="phoneNumber"
                      fullWidth
                      name="phone"
                      label="Số điện thoại"
                      placeholder="số điện thoại"
                      variant="outlined"
                      value={formik.values.phone}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      // required
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-username-login"
                      >
                        {formik.values.phone}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item>
                    <TextField
                      type={values.showPass ? "text" : "password"}
                      fullWidth
                      name="password"
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
                  </Grid>
                  {formik.touched.password && formik.errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-username-login"
                    >
                      {formik.errors.password}
                    </FormHelperText>
                  )}
                  <Grid container columnSpacing={2}>
                    <Grid item sx={2}>
                      <div>
                        <Checkbox {...label} />
                        <label>Nhớ thông tin đăng nhập</label>
                      </div>
                    </Grid>

                    <Grid item sx={3}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "right",
                          typography: "body1",
                          "& > :not(style) + :not(style)": {
                            ml: 2,
                          },
                        }}
                        onClick={preventDefault}
                      >
                        <Link
                          to="/findaccount"
                          underline="hover"
                          style={{ marginBlock: "7%" }}
                        >
                          {"Quên mật khẩu?"}
                        </Link>
                      </Box>
                    </Grid>
                    <div></div>
                  </Grid>
                  <Grid item sx={3}>
                    <ButtonCustomize
                      type="submit"
                      variant="contained"
                      sx={{ padding: "8%" }}
                      width="20rem"
                      nameButton="Đăng nhập"
                    />
                  </Grid>
                </Grid>
              </form>
            </>
          </Paper>
        </Grid>
        {/* </Container> */}
      </div>
    </Box>
  );
};

////fix git hub1qwedqweqw
export default Login;
