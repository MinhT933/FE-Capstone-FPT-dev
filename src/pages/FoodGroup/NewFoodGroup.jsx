import { Dialog, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";

import React from "react";
import { purple } from "@mui/material/colors";
import UseCreateForm from "../../components/PopUp/useForm";
import Controls from "../../components/Control/Controls";
import * as UpdateService from "../../utils/UpdateService/UpdateService";
import PageHeader from "../../components/PageHeader";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Iconify from "../../components/hook-form/Iconify";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const initialValue = {
  id: 0,
  fullName: "",
  mobile: "",
  email: "",
  city: "",
  gender: "",
  departmentId: "",
  hireDate: new Date(),
  isActive: false,
};

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FFCC32"),
  backgroundColor: "#FFCC32",
  "&:hover": {
    backgroundColor: "#ffee32",
  },
  display: "center",
}));

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function NewFoodGroup(props) {
  const { values, setValue, handleInputChange } = UseCreateForm(initialValue);
  const { OpenPopUp, SetOpenPopUp } = props;
  const handleClose = () => {
    SetOpenPopUp(false);
  };

  return (
    <Paper>
      <Dialog open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Thiết kế gói ăn"
            subTitle="Tinh hoa ẩm thực "
            icon={getIcon("emojione-monotone:pot-of-food")}
          />
        </DialogTitle>

        <DialogContent>
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
          <div style={{ marginLeft: "240px", marginTop: "20px" }}>
            <Stack spacing={2} direction="row" width="40%">
              <ColorButton variant="contained">Cập Nhập </ColorButton>
            </Stack>
          </div>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
