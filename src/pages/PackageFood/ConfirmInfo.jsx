import React from "react";
import { Typography, Grid, ListItemText } from "@mui/material";
import { List } from "@mui/icons-material";
import { ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import PageHeader from "../../components/PageHeader";
import Iconify from "../../components/hook-form/Iconify";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const TimeFrame = [
  { name: " Buổi trong ngày  ", detail: "Trưa ,tối" },
  { name: "Ngày trong tuần", detail: "thứ 2 , thứ 3 , thứ 4" },
];

const styles = (theme) => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: "700",
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

const getIcon = (name) => <Iconify icon={name} width={30} height={30} />;
export default function ConfirmInfo(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <PageHeader
        title="Xác nhân thông tin gói ăn"
        subTitle="Tinh hoa ẩm thực "
        icon={getIcon("line-md:confirm-circle-twotone")}
      />

      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
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
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Khung thời gian giao hàng
          </Typography>
          <Grid container>
            {TimeFrame.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
