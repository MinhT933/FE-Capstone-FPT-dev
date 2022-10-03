import React from "react";
import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "../../components/hook-form/Iconify";

import Button from "@mui/material/Button";
import UseCreateForm from "../../components/PopUp/useForm";
import * as UpdateService from "../../utils/UpdateService/UpdateService";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import InputImg from "./../../components/InputImg/inputImg";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const initialValue = {
  id: 0,
  name: "",
  createDate: new Date(),
  endDate: new Date(),
  description: "",
  img: "",
  price: "",
  isActive: false,
  status: "",
};
const useStyles = styled((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(9),
    borderRadius: 4,
    bgcolor: "background.paper",
    m: 1,
    // width: "80%",
    // height: "100%",
    display: "flex",
    justifyContent: "center",
    boxShadow: 12,
    // marginLeft: "23%",
    // border: 1,
  },
}));

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FFCC32"),
  backgroundColor: "#FFCC32",
  "&:hover": {
    backgroundColor: "#ffee32",
  },
  display: "center",
}));

export default function NewPackage() {
  const { values, setValue, handleInputChange } = UseCreateForm(initialValue);
  const classes = useStyles();
  ///css pag bo tròn và đỗ bóng lên ///
  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: "background.paper",
        m: 1,
        // width: "80%",
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        boxShadow: 12,
        // marginLeft: "12%",
        // border: 1,
      }}
    >
      <Box sx={{ float: "left", width: "60%" }}>
        <Grid
          container
          spacing={2.5}
          sx={{ marginLeft: "6%", marginTop: "1%", marginBottom: "2%" }}
        >
          <Grid item xs={6}>
            <Controls.Input
              variant="outlined"
              label="Name"
              value={values.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              variant="outlined"
              label="Giá"
              value={values.name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Controls.InputTagCheckBox
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              label="Địa điểm giao {chưa có data từ từ em đỗ vào}"
              value={values.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              variant="outlined"
              label="Tổng Buổi"
              value={values.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              variant="outlined"
              label="Tổng Các địa điểm giao"
              value={values.price}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Controls.DatePicker
              variant="outlined"
              name="Ngày mở bán"
              label="StartSale"
              value={values.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.DatePicker
              variant="outlined"
              name="Ngày kết thúc bán"
              label="EndSale"
              value={values.name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Controls.TextArea
              variant="outlined"
              placeholder="Mô tả"
              value={values}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ float: "right", width: "30%", marginLeft: "10%" }}>
        <Paper
          // bo ở trên kia thì phải bo ở đây
          sx={{
            marginBottom: "50%",
            paddingBottom: "10%",
            paddingTop: "8%",
            borderRadius: 4,
          }}
        >
          <InputImg />
        </Paper>
      </Box>
    </Box>
  );
}
