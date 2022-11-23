import { Dialog, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";

import React from "react";
import { purple } from "@mui/material/colors";
import UseCreateForm, { TForm } from "./useForm";
import Controls from "./../Control/Controls";

import * as UpdateService from "../../utils/UpdateService/UpdateService";
import PageHeader from "../PageHeader";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
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
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: "#5dc9bc",
  },
}));



export default function NewUserPopup(props) {
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
            title="New User"
            subTitle="Form design with validation"
            icon={<PeopleAltIcon fontSize="smail" />}
          />
        </DialogTitle>

        <DialogContent>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 3, md: 2 }}
            >
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  label="Name"
                  values={values.fullName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  label="Email"
                  values={values.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.DatePicker
                  name="date"
                  label="Date of Birth"
                  value={values.DatePicker}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Select
                  name="department"
                  label="Department"
                  values={values.departmentId}
                  onChange={handleInputChange}
                  options={UpdateService.getOptions()}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.RadioGroup
                  name="gender"
                  label="Gender"
                  values={values.gender}
                  onChange={handleInputChange}
                  items={genderItems}
                />
              </Grid>
            </Grid>
          
          <div style={{ marginLeft: "240px", marginTop: "20px" }}>
            <Stack spacing={2} direction="row" width="200px">
              <ColorButton variant="contained">Create </ColorButton>
            </Stack>
          </div>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

{
  /* <Grid item xs={6}>
                <Controls.Checkbox
                  name="status"
                  label="Active"
                  values={values.status}
                  onChange={handleInputChange}
                />
              </Grid> */
}
