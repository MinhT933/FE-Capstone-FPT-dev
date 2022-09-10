import * as React from "react";
import { FormControl } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
export default function DatePicker(props) {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const {name}= props

  return (
    <FormControl  sx={{
      display: "grid",
      gridTemplateColumns: { sm: "6fr 1fr" },
      
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={name}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

