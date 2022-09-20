import React from "react";
import DnDFoodGroup from "./DnDFoodGroup";
import Box from "@mui/material/Box";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";
import UseCreateForm from "../../components/PopUp/useForm";
import Iconify from "../../components/hook-form/Iconify";
import * as UpdateService from "../../utils/UpdateService/UpdateService";
import InputImg from "./../../components/InputImg/inputImg";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Drawer } from "@material-ui/core";
import TableFoodGr from "./TableFoodGr";

//------------------------------------------------------------------
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

//------------------------------------------------------------------
export default function ManagerFoodGroup() {
  //geticon
  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
  const { values, setValue, handleInputChange } = UseCreateForm(initialValue);

  const useStyles = styled((theme) => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(9),
    },
  }));
  //css button
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC32",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));
  //------------------------------------------------------------------

  const classes = useStyles();
  return (
    <Box sx={{ paddingBottom: "3%" }}>
      <Paper className={classes.pageContent}>
        <PageHeader
          title="Thiết kế gói ăn"
          subTitle="Tinh hoa ẩm thực "
          icon={getIcon("emojione-monotone:pot-of-food")}
        />

        <Box
          sx={{
            flexGrow: 1,
            height: "40%",
            width: "50%",
            border: "1px solip",
            boxShadow: 8,
            borderRadius: 2,
            float: "right",
          }}
        >
          <DnDFoodGroup />
        </Box>
        <Box
          sx={{
            float: "left",
            borderRadius: 1,
            width: "45%",
            boxShadow: 9,
            // height: "100%",
            marginLeft: "2%",
            paddingTop: "2%",
            height: "15rem",
          }}
        >
          <Grid container spacing={1.5} sx={{ marginLeft: "2%" }}>
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
                label="Tổng số lượng"
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
          <Box>
            <Stack
              width="200px"
              justifyContent="center"
              marginLeft={"29%"}
              marginTop={"1rem"}
            >
              <ColorButton variant="contained">Tạo nhóm thức ăn </ColorButton>
            </Stack>
          </Box>
          <Box sx={{ marginTop: "20%", boxShadow: 9, borderRadius: 1 }}>
            <Paper>
              <TableFoodGr />
            </Paper>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
