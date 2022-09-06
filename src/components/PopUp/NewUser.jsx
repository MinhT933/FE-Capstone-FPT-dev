import React from "react";

import { UseForm, TForm } from "./useForm";

import Controls from "./../Control/Controls";
import RadioGroup from "./../Control/RadioGroup";

import * as UpdateService from "../../utils/UpdateService/UpdateService";

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

export default function NewUser() {
  const { values, setValue, handleInputChange } = UseForm(initialValue);

  return (
    <TForm>
      <Gird container>
        <Gird item xs={6}>
          <Controls.Input
            variant="outlined"
            label="Mobile"
            values={values.mobile}
            onChange={handleInputChange}
          />
          <Controls.Input
            variant="outlined"
            label="City"
            values={values.city}
            onChange={handleInputChange}
          />
        </Gird>
        <Gird item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            values={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="department"
            label="department"
            values={values.departmentId}
            onChange={handleInputChange}
            Options={UpdateService.getOptions}
          />
          <Controls.Checkbox
            name="status"
            label="Status"
            values={values.status}
            onChange={handleInputChange}
          />
          <Controls.DatePicker
            name="date"
            label="Date of Birth"
            values={values.DatePicker}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button
              variant="containter"
              name="Create"
              size="large"
              text="Thêm"
            />
          </div>
        </Gird>
      </Gird>
    </TForm>
  );
}
