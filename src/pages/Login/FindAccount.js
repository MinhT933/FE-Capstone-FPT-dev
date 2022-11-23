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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#5dc9bc"),
  backgroundColor: "#ffeb3b",
  "&:hover": {
    backgroundColor: "#5dc9bc",
  },
  display: "center",
}));

// const configureCaptcha = () => {
//   window.recaptchaVerifier = new auth.RecaptchaVerifier("sign-in-button", {
//     size: "invisible",
//     callback: (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       this.onSignInSubmit();
//       console.log("Recaptca varified");
//     },
//     defaultCountry: "IN",
//   });
// };

export default function FindAccount() {
  // const [values, setValues] = useState({
  //   phoneNumber: "",
  // });
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const navigate = useNavigate();

  // function setUpRecaptha(number) {
  //   const recaptchaVerifier = new RecaptchaVerifier(
  //     "recaptcha-container",
  //     {},
  //     auth
  //   );
  //   recaptchaVerifier.render();
  //   return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  // }

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      console.log(response);
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
      await result.confirm(otp);
      navigate("/");
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
              <div style={{ marginBottom: "4%" }}>
                <h1> Tìm tài khoản của bạn </h1>
                <p sx={{ paddingLeft: "1%", paddingBottom: "2%" }}>
                  Nhập số điện thoại để tìm kiếm tài khoản của bạn.
                </p>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
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
                    {/* <Link to="/">
                      <Button variant="secondary">Cancel</Button>
                    </Link> */}
                    &nbsp;
                    <ColorButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      // href="/verifyphone"
                      sx={{ padding: "5%" }}
                    >
                      Xác nhận
                    </ColorButton>
                  </div>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Container>
      </div>
    </Box>
    // <>
    //   <div className="p-4 box">
    //     <h2 className="mb-3">Firebase Phone Auth</h2>
    //     {error && <Alert variant="danger">{error}</Alert>}
    //     <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
    //       {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
    //       <TextField
    //         type="phoneNumber"
    //         fullWidth
    //         label="Nhập số điện thoại"
    //         placeholder="Số điện thoại"
    //         variant="outlined"
    //         required
    //         value={number}
    //         onChange={(e) => {
    //           setNumber(e.target.value);
    //         }}
    //       />
    //       <div id="recaptcha-container"></div>
    //       {/* </Form.Group> */}
    //       <div className="button-right">
    //         <Link to="/">
    //           <Button variant="secondary">Cancel</Button>
    //         </Link>
    //         &nbsp;
    //         <Button type="submit" variant="primary">
    //           Send Otp
    //         </Button>
    //       </div>
    //     </form>

    //     <form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
    //       {/* <Form.Group className="mb-3" controlId="formBasicOtp"> */}
    //       {/* <Form.Control
    //         type="otp"
    //         placeholder="Enter OTP"

    //       /> */}
    //       <TextField
    //         type="phoneNumber"
    //         fullWidth
    //         label="Nhập số điện thoại"
    //         placeholder="Số điện thoại"
    //         variant="outlined"
    //         required
    //         value={number}
    //         onChange={(e) => {
    //           setOtp(e.target.value);
    //         }}
    //       />
    //       {/* onChange={(e) => setOtp(e.target.value)} */}
    //       {/* </Form.Group> */}
    //       <div className="button-right">
    //         <Link to="/">
    //           <Button variant="secondary">Cancel</Button>
    //         </Link>
    //         &nbsp;
    //         <Button type="submit" variant="primary">
    //           Verify
    //         </Button>
    //       </div>
    //     </form>
    //   </div>
    // </>
  );
}
