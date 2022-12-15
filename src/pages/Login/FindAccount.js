import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  Alert,
} from "@mui/material";
import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { auth } from "./firebase";
// import { Button } from '@material-ui/core';
import Redirect, { Link, useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useUserAuth } from "./UserAuthContextProvider";
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import VerifyPhone from "./VerifyPhone";
import { useDispatch } from "react-redux";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#5dc9bc"),
  backgroundColor: "#ffeb3b",
  "&:hover": {
    backgroundColor: "#5dc9bc",
  },
  display: "center",
}));

export default function FindAccount() {
  // const [values, setValues] = useState({
  //   phoneNumber: "",
  // });
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("sdt" + phoneNumber);

  const checkphone = async () => {
    try {
      const res = await API(
        "POST",
        URL_API + `/auths/checkPhone`,
        number,
        null
      );
      localStorage.setItem("hihi", res.data.result.access_token);
    } catch (err) {
      console.log(err);
    }
  };
  const getOtp = async (e) => {
    e.preventDefault();
    const numberArr = [...number];
    let temp = numberArr.shift();
    let a = numberArr.join("");

    const phoneNumber = "+84" + a;
    setPhoneNumber(phoneNumber);
    console.log(phoneNumber);
    setError("");
    if (phoneNumber === "" || phoneNumber === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(phoneNumber);
      if (response) {
        setResult(response);
        setFlag(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      const res = await result.confirm(otp);
      navigate("/changepassword");

      // console.log(res);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Box
      sx={{ float: "center", width: "100%", boxShadow: "none" }}
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
              {/* <div style={{ marginBottom: "4%" }}>
                <h1> Tìm tài khoản của bạn </h1>
                <p sx={{ paddingLeft: "1%", paddingBottom: "2%" }}>
                  Nhập số điện thoại để tìm kiếm tài khoản của bạn.
                </p>
              </div> */}
              {error && <Alert variant="danger">{error}</Alert>}
              {flag ? (
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
                        <Paper
                          elevation={3}
                          sx={{ padding: 10, marginBottom: 0.5 }}
                        >
                          <div style={{ marginBottom: "4%" }}>
                            <h1> Xác thực số điện thoại </h1>
                            <p sx={{ paddingLeft: "1%", paddingBottom: "2%" }}>
                              Nhập mã OTP được gửi đến số điện thoại để xác
                              thực.
                            </p>
                          </div>
                          {error && <Alert variant="danger">{error}</Alert>}
                          <form onSubmit={verifyOtp}>
                            <Grid container direction="column" spacing={2}>
                              <Grid item>
                                <TextField
                                  type="otp"
                                  fullWidth
                                  label="Mã xác thực OTP"
                                  placeholder="Mã OTP"
                                  variant="outlined"
                                  onChange={(e) => setOtp(e.target.value)}
                                  required
                                />
                              </Grid>
                            </Grid>
                            <Grid item style={{ margin: "7%" }}>
                              <ColorButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ padding: "5%" }}
                                // href="/changepassword"
                              >
                                Xác thực
                              </ColorButton>
                            </Grid>
                          </form>
                        </Paper>
                      </Grid>
                    </Container>
                  </div>
                </Box>
              ) : (
                <Grid>
                  <div style={{ marginBottom: "4%" }}>
                    <h1> Tìm tài khoản của bạn </h1>
                    <p sx={{ paddingLeft: "1%", paddingBottom: "2%" }}>
                      Nhập số điện thoại để tìm kiếm tài khoản của bạn.
                    </p>
                  </div>
                  <form onSubmit={getOtp}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="phoneNumber"
                          fullWidth
                          label="Nhập số điện thoại"
                          placeholder="Số điện thoại"
                          variant="outlined"
                          required
                          value={number}
                          onChange={(e) => {
                            setNumber(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <div id="recaptcha-container"></div>
                    <Grid item style={{ margin: "7%" }}>
                      <div className="button-right">
                        &nbsp;
                        <ColorButton
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ padding: "5%" }}
                          onClick={() => checkphone()}
                        >
                          Xác nhận
                        </ColorButton>
                      </div>
                    </Grid>
                  </form>
                </Grid>
              )}
            </Paper>
          </Grid>
        </Container>
      </div>
    </Box>
  );
}
