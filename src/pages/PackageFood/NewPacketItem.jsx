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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import InputImg from "./../../components/InputImg/inputImg";
// import TagInput from "./../../components/Control/Taginput";

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

export default function NewPackageItem() {
  const { values, setValue, handleInputChange } = UseCreateForm(initialValue);
  const classes = useStyles();
  ///css pag bo tròn và đỗ bóng lên ///
  return (
    <Box
      sx={{
        borderRadius: 4,
        bgcolor: "background.paper",
        m: 1,
        // width: "80%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        boxShadow: 12,
        // marginLeft: "23%",
      }}
    >
      <Paper className={classes.pageContent}>
        <PageHeader
          title="Tạo mục thức ăn"
          subTitle="Tinh hoa ẩm thực "
          icon={getIcon("emojione-monotone:pot-of-food")}
        />

        <Box
          sx={{ flexGrow: 1 }}
          justifyContent="center"
          alignItems="center"
          // marginLeft="35%"
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controls.Input
                variant="outlined"
                label="Buổi"
                value={values.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                variant="outlined"
                label="Số lượng"
                value={values.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.TimeInput label="Thời gian bán" />
            </Grid>
            <Grid item xs={6}>
              <Controls.TimeInput label="Thời gian kết thúc bán bán" />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={UpdateService.OptionGroupFood()}
                placeholder="nhấp vào em này"
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="chọn nhóm thức ăn"
                    placeholder="Chọn nhóm món ăn"
                  />
                )}
                sx={{ width: "87%" }}
              />
            </Grid>
          </Grid>
        </Box>
        {/* css cho button ở dưới cáchđều ra  */}
        <Box>
          <Stack
            width="200px"
            justifyContent="center"
            marginLeft={"35%"}
            marginTop={"2rem"}
            marginBottom={"2%"}
          >
            <ColorButton variant="contained">Chấp thuận </ColorButton>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
