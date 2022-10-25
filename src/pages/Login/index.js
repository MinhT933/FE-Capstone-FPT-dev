import React, { useState } from "react";
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./format.css";

import { width } from "@mui/system";
import Login from "./login";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TabsPacket from "./Tabs/ColorTabs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const WidthLogin = styled("div")(({ theme }) => ({
  width: "40%",
  // height: "auto",
}));

const SignInOutContainer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //  const paperStyle = { width: '20%', float: 'right' }
  // fixed bug
  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
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
              {/* <TabsPacket /> */}
              <Login />
            </div>
          </WidthLogin>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignInOutContainer;
