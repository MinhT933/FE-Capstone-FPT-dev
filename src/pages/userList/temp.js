import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState,EditingState,IntegratedEditing} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  ConfirmationDialog,
  AppointmentForm,
  AppointmentTooltip,
  CurrentTimeIndicator 
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import { fade, lighten } from "@material-ui/core/styles/colorManipulator";
import { appointments } from "./../../_mock/data";
import { useState } from "react";
const theme = createMuiTheme({ palette: { type: "light", primary: blue } });
const styles = ({ spacing }) => ({
  customCell: {
    verticalAlign: "Top",
    borderBottom: `1px solid ${lighten(fade(theme.palette.divider, 1), 0.88)}`,
    height: spacing(12) + 1,
  },
});
const TimeSacaleCell = withStyles(styles, { name: "TimeScaleCell" })(
  ({ classes, endDate, ...restProps }) => {
    const nextEndDate = new Date(endDate);
    nextEndDate.setMinutes(0);
    return (
      <WeekView.TimeScaleCell
        className={classes.customCell}
        endDate={nextEndDate}
        {...restProps}
      />
    );
  }
);

export default function ScheduleFood() {
  const [data, setData]= useState();
  const commitChanges = ({ added, changed, deleted }) => {
    let newData = [...data.data];
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      data = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      data = data.filter((appointment) => appointment.id !== deleted);
    }
    setData(newData);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState />
          <WeekView
            startDayHour={0}
            endDayHour={24}
            timeScaleCellComponent={TimeSacaleCell}
          />
          <EditingState onCommitChanges={commitChanges}/>
          <ConfirmationDialog />
          {/* <IntegratedEditing /> */}
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton/>
          <AppointmentForm />
          <CurrentTimeIndicator updateInterval/>
        </Scheduler>
      </Paper>
    </MuiThemeProvider>
  );
}