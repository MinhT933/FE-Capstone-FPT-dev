import { Container, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Fragment } from "react";
// import { Button } from '@material-ui/core';
import Redirect from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#5dc9bc"),
  backgroundColor: "#ffeb3b",
  "&:hover": {
    backgroundColor: "#5dc9bc"
  },
  display: "center"
}));

export default function FindAccount() {
  const [values, setValues] = useState({
    phoneNumber: ""
  });

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
                <p sx={{ paddingLeft: "1%", paddingBottom: "2%" }}>Nhập số điện thoại để tìm kiếm tài khoản của bạn.</p>
              </div>
              <form>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      type="phoneNumber"
                      fullWidth
                      label="Nhập số điện thoại"
                      placeholder="Số điện thoại"
                      variant="outlined"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid item style={{ margin: "7%" }} >
                  <ColorButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    href="/verifyphone"
                    sx={{padding: "5%"}}
                  >
                    Xác nhận
                  </ColorButton>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Container>
      </div>
    </Box>
  );
}
