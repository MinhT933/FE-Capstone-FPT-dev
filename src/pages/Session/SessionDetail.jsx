import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Box,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import { Link as useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Iconify from "../../components/hook-form/Iconify";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import PageHeaderFoodDetail from "../../components/PageHeaderFoodDetail";

//----------------------------------------------------------------

export default function SessionDetail(props) {
  const { OpenPopUpDetail, SetOpenPopUpDetail, orderFood } = props;

  const handleArray = () => {
    for (let index = 0; index < orderFood?.length; index++) {
      const element = orderFood[index];
      return element.subscription.account.profile.fullName;
    }
  };
  const handleArrayPhone = () => {
    for (let index = 0; index < orderFood?.length; index++) {
      const element = orderFood[index];
      return element.subscription.account.phone;
    }
  };

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }
  const handleClose = () => {
    SetOpenPopUpDetail(false);
  };

  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  return (
    <Paper>
      <Dialog open={OpenPopUpDetail} onClose={handleClose}>
        <DialogTitle>
          <PageHeaderFoodDetail
            title="Xem chi tiết món có trong phiên làm việc"
            subTitle={`Khách Hàng:${handleArray()}`}
            subTitle1={`Số điện thoại:${handleArrayPhone()}`}
            icon={getIcon("fluent-mdl2:work-item")}
          />
        </DialogTitle>
        <DialogContent>
          <Box>
            {orderFood?.map((items, index) => (
              <Paper
                sx={{
                  height: "7rem",
                  width: "27.5rem",
                  marginBottom: "1rem",
                  boxShadow: 2,
                  display: "flex",
                  // backgroundColor: "#FFCC30",
                }}
                key={index}
              >
                <Grid container>
                  {items.packageItem.foodGroup.foods?.map((it, index) => (
                    <Grid container xs={12} marginTop={1} marginLeft={2}>
                      <Grid xs={2}>
                        <Avatar alt={it.name} src={it.image} />
                      </Grid>
                      <Grid xs={6} marginTop={1}>
                        <Typography variant="subtitle2" noWrap>
                          {it.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            ))}
          </Box>
          <ButtonCustomize marginLeft="40%" nameButton="Thêm shipper" />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
