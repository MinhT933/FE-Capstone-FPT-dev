import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import "./format.css";

import Login from "./login";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const WidthLogin = styled("div")(({ theme }) => ({
  width: "40%",
  backgroundColor: theme.palette.grey,
}));

const SignInOutContainer = () => {
  //  const paperStyle = { width: '20%', float: 'right' }
  // fixed bug
  return (
    <div style={{ width: "100%" }}>
      <Grid container spacing={1} sx={{ display: "flex" }}>
        <Grid item xs={8} sx={{ display: "flex", overflowX: "auto" }}>
          <Paper sx={{ height: "100%", width: "70%" }}>
            <Box style={{ marginBottom: "25%" }}>
              <img
                style={{ marginTop: "20%", marginLeft: "30%" }}
                src="/static/logo7.png"
                height={300}
                width={400}
                alt=""
              />
              <h1 style={{ marginTop: "2%", marginLeft: "33%" }}>
                Meal Subscription Plan
              </h1>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <WidthLogin>
            <div className="format-login">
              <Login />
            </div>
          </WidthLogin>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignInOutContainer;
