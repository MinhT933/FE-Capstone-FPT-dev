import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import classes from "./class";

export default function StyleWeekview() {
  const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
    ({ theme: { palette } }) => ({
      [`&.${classes.weekEnd}`]: {
        backgroundColor: alpha(palette.action.disabledBackground, 0.06),
      },
    })
  );
  return (
    <React.Fragment>
      <StyledWeekViewDayScaleCell />
    </React.Fragment>
  );
}
