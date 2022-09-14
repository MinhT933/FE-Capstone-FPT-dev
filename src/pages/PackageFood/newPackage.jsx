
import React from "react";
import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Grid } from "@mui/material";

import Button from "@mui/material/Button";
import UseCreateForm from "../../components/PopUp/useForm";
import * as UpdateService from "../../utils/UpdateService/UpdateService";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";

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
  display: "center",
}));

export default function NewPackage() {
  const { values, setValue, handleInputChange } = UseCreateForm(initialValue);
  return (
    <Paper>
      <PageHeader
        title="Thêm thức ăn"
        subTitle="Form design with validation"
        icon={<PeopleAltIcon fontSize="smail" />}
      />
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 3, md: 2 }}>
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
            name="Ngày bán"
            label="Date of Birth"
            value={values.DatePicker}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.DatePicker
            name="Ngày kết thúc bán"
            label="Date of Birth"
            value={values.DatePicker}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="Nhóm Package"
            label="Nhóm Package"
            values={values.departmentId}
            onChange={handleInputChange}
            options={UpdateService.getOptionsGroup()}
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
        {/* thêm để chỉnh github */}
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            values={values.gender}
            onChange={handleInputChange}
            items={genderItems}
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
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            values={values.gender}
            onChange={handleInputChange}
            items={genderItems}
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
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            values={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
        </Grid>
        {/* //-------------------------------------- */}
        <Grid item xs={6} >
          <div>
            <Stack spacing={2} direction="row" width="200px">
              <ColorButton variant="contained">Create </ColorButton>
            </Stack>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
