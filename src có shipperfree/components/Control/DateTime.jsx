import * as React from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTime(props) {
  //   const [value, setValue] = React.useState(dayjs("2022-10-29T21:11:54"));

  //   const handleChange = (newValue) => {
  //     setValue(newValue);
  //   };
  const { label, value, onChange, width, disabled, disablePast } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} sx={{ width: { width } }}>
        <DateTimePicker
          label={label}
          value={value}
          // minDate={new Date()}
          disabled={disabled}
          disablePast={disablePast}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
