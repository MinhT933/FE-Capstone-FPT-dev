import React from "react";
import { Typography, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import ButtonCustomize from "../../components/Button/ButtonCustomize";

export default function ConfirmInfo(props) {
  // const { classes } = props;
  return (
    <React.Fragment>
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
          boxShadow: 12,
          marginLeft: "0.75%",
          marginRight: "0.75%",
          marginTop: "3%",
        }}
      >
        <Grid container spacing={16} sx={{ paddingTop: "3%" }}>
          <Grid item xs={12} sm={5} marginLeft="10%">
            <Typography variant="h6" gutterBottom>
              Thông tin gói
            </Typography>
            <Typography gutterBottom>Gói Vip</Typography>
            <Typography gutterBottom>Giá: 8 000 000đ</Typography>
            <Typography gutterBottom>Tổng buổi : 20</Typography>
            <Typography gutterBottom>Tổng số món : 120</Typography>
            <Typography gutterBottom>Tổng buổi : 20</Typography>
            <Typography gutterBottom>Số địa điểm giao : 5</Typography>
            <Typography gutterBottom>Ngày bán: 11/02/2222</Typography>
            <Typography gutterBottom>Ngày dừng bán: 11/02/2222</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={5}>
            <Typography variant="h6" gutterBottom>
              Khung thời gian giao hàng
            </Typography>
            <Grid container>
              {/* {TimeFrame.map((payment) => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))} */}
              <Grid item xs={6}>
                <Typography gutterBottom> buổi trong ngày</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>trưa, tối</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom> Ngày trong tuần</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>thứ 2 , thứ 3 , thứ 4</Typography>
              </Grid>
              <Grid sm={5} sx={{ mt: 20, mb: 5 }}>
                <ButtonCustomize
                  sx={{ width: "80%" }}
                  nameButton="Xác nhận"
                  type="submit"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box></Box>
      </Box>
    </React.Fragment>
  );
}
