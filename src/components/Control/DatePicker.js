import * as React from "react";
import { FormControl } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { width } from "@mui/system";

export default function DatePicker(props) {
  // const [value, setValue] = React.useState(dayjs("2022-10-18T21:11:5"));

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  //   // console.log(newValue);
  // };
  // console.log(value);

  // console.log(value);
  const { label, name, value, onChange, inputFormat, width } = props;

  // const CustomPickersDay = styled(DesktopDatePicker, {
  //   '&.Mui-selected':{
  //     backgroundColor:'red'
  //   }
  // });
  // console.log(<DesktopDatePicker />);
  return (
    <FormControl
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "6fr 1fr" },
        width: { width },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          name={name}
          label={label}
          // inputFormat="YYYY-MM-DD"
          //hihi
          // inputFormat="DD-MM-YYYY"
          inputFormat={inputFormat}

          value={value}
          onChange={onChange}
          minDate={new Date()}
          renderInput={(params) => <TextField {...params} />}
          sx={{
            ".css-4bvrx5-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
              backgroundColor: "#f16037",
              color: "white",
              borderColor: "transparent",
              fontSize: 16,
              height: "32px",
              width: "32px",
              borderRadius: "8px",
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
