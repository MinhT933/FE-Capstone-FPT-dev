import React from "react";
import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import Iconify from "../../components/hook-form/Iconify";

import Button from "@mui/material/Button";
import UseCreateForm from "../../components/PopUp/useForm";
import * as UpdateService from "../../utils/UpdateService/UpdateService";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// import InputImg from "./../../components/InputImg/inputImg";
// import TagInput from "./../../components/Control/Taginput";
import Timeframe from "./timeframe/Timeframe";

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
const DayofWeek = [
  { label: "Sunday", value: "Sunday" },
  { label: "Sunday", value: "Sunday" },
  { label: "Sunday", value: "Sunday" },
  { label: "Sunday", value: "Sunday" },
];
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function NewPackageItem() {
  const { values, setValue, handleInputChange } = UseCreateForm(initialValue);
  const classes = useStyles();
  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          // border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }
  ///css pag bo tròn và đỗ bóng lên ///
  return (
    <Box
      sx={{
        // borderRadius: 4,
        bgcolor: "background.paper",
        m: 1,
        // width: "80%",
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        boxShadow: 12,

        // marginLeft: "23%",
        // border: 1,
      }}
    >
      <Paper className={classes.pageContent}>
        <PageHeader
          title="Tạo mục thức ăn"
          subTitle="Tinh hoa ẩm thực "
          icon={getIcon("healthicons:i-schedule-school-date-time")}
        />

        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)",
              marginBottom: "5%",
            }}
          >
            <Box>
              <Timeframe />
            </Box>
            <Item>
              <Controls.InputTagCheckBox
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Sáng"
                value={values.name}
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <Controls.InputTagCheckBox
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Trưa"
                value={values.name}
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <Controls.InputTagCheckBox
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Tối"
                value={values.name}
                onChange={handleInputChange}
              />
            </Item>
          </Box>
        </div>
      </Paper>
    </Box>
  );
}
