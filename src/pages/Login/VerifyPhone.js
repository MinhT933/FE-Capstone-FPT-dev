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
// import { firebase } from "firebase/app";
import * as firebase from "./firebase";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#5dc9bc"),
  backgroundColor: "#ffeb3b",
  "&:hover": {
    backgroundColor: "#5dc9bc",
  },
  display: "center",
}));

export default function VerifyPhone() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
                <h1> Xác thực số điện thoại </h1>
                <p sx={{ paddingLeft: "1%", paddingBottom: "2%" }}>
                  Nhập mã OTP được gửi đến số điện thoại để xác thực.
                </p>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              {/* <form onSubmit={verifyOtp}>
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
              </form> */}
            </Paper>
          </Grid>
        </Container>
      </div>
    </Box>
  );
}
