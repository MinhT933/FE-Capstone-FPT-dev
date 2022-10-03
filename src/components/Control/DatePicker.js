import * as React from "react";
import { FormControl } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";


export default function DatePicker(props) {

  // const [value, setValue] = React.useState(dayjs("2022-10-18T21:11:5"));

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  //   // console.log(newValue);
  // };
  // console.log(value);

  // console.log(value);
  const { label, name, value, onChange } = props;
  // console.log(<DesktopDatePicker />);
  return (
    <FormControl
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "6fr 1fr" },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          name={name}
          label={label}
          inputFormat="YYYY-MM-DD"
          value={value}
          onChange={onChange}
          minDate={new Date()}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
