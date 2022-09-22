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
import CustomDay from "./timeframe/Timeframe";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { MarginRounded } from "@mui/icons-material";

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
  return (
    <Box sx={{ borderRadius: 4, boxShadow: 12 }}>
      <Paper className={classes.pageContent}>
        <PageHeader
          title="Thiết kế gói ăn"
          subTitle="Tinh hoa ẩm thực "
          icon={getIcon("emojione-monotone:pot-of-food")}
        />

        <Box sx={{ float: "right", width: "30%" }}>
          <Paper>
            <InputImg />
          </Paper>
        </Box>
        <Box
          sx={{
            float: "left",
            // borderRadius: 2,
            width: "60%",
            // boxShadow: 12,
            // height: "100%",
            marginLeft: "2%",
          }}
        >
          <Grid
            container
            spacing={1.5}
            sx={{ marginLeft: "10%" }}
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
              <Controls.Input
                variant="outlined"
                label="Giá"
                value={values.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Select
                name="mục gói ăn"
                label="chọn mục thức ăn"
                value={values.departmentId}
                onChange={handleInputChange}
                options={UpdateService.PakageItem()}
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
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={UpdateService.getDay()}
                placeholder="nhấp vào em này"
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chon ngày trong tuần"
                    placeholder="thứ"
                  />
                )}
                sx={{ width: "87%" }}
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
      </Paper>

      <Box>
        <Stack
          width="200px"
          justifyContent="center"
          marginLeft={"35%"}
          marginTop={"20rem"}
          paddingBottom="2rem"
        >
          <ColorButton variant="contained">Chấp thuận </ColorButton>
        </Stack>
      </Box>
    </Box>
  );
}
