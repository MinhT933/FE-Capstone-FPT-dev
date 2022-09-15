import * as React from "react";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { styled, alpha } from "@mui/material/styles";
import { teal, orange, red } from "@mui/material/colors";
import { ViewState } from "@devexpress/dx-react-scheduler";
import classes from "./../../components/hook-form/schedule/class";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  DayView,
  ViewSwitcher,
  Resources,
  ConfirmationDialog,
  AppointmentForm,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import StyledAppointmentsAppointmentContent from "./../../components/hook-form/schedule/Appointments";
import { appointments } from "../../../src/_mock/appointments";
import LocationSelector from "../../components/hook-form/schedule/LocationSelector";
import { CurrentTimeIndicator } from "@devexpress/dx-react-scheduler";                
import { EditingState } from "@devexpress/dx-react-scheduler";
import { useState } from "react";

const LOCATIONS = ["Món Chay", "món mặn"];
const resources = [
  {
    fieldName: "location",
    title: "Location",
    instances: [
      { id: LOCATIONS[0], text: LOCATIONS[0], color: teal },
      { id: LOCATIONS[1], text: LOCATIONS[1], color: orange },
      // { id: LOCATIONS[2], text: LOCATIONS[2], color: red },
    ],
  },
];
const StyledTextField = styled(TextField)(({ theme: { spacing } }) => ({
  [`&.${classes.textField}`]: {
    width: "75px",
    marginLeft: spacing(1),
    marginTop: 0,
    marginBottom: 0,
    height: spacing(4.875),
  },
}));

const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    margin: "0 auto 0 0",
    display: "flex",
    alignItems: "center",
  },
}));
// #FOLD_BLOCK
const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
  ({ theme: { palette } }) => ({
    [`&.${classes.weekendCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      "&:hover": {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      "&:focus": {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
    },
  })
);
// #FOLD_BLOCK
const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
  ({ theme: { palette } }) => ({
    [`&.${classes.weekEnd}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06),
    },
  })
);

//custome appoinment form


const AppointmentContent = ({ data, formatDate, ...restProps }) => (
  <StyledAppointmentsAppointmentContent
    {...restProps}
    formatDate={formatDate}
    data={data}
  >
    <div className={classes.container}>
      <div className={classes.title}>{data.title}</div>
      <div className={classes.text}>{data.location}</div>
      <div className={classes.textContainer}>
        <div className={classes.time}>
          {formatDate(data.startDate, { hour: "numeric", minute: "numeric" })}
        </div>
        <div className={classes.time}>{" - "}</div>
        <div className={classes.time}>
          {formatDate(data.endDate, { hour: "numeric", minute: "numeric" })}
        </div>
      </div>
    </div>
  </StyledAppointmentsAppointmentContent>
);

const Filter = ({ onCurrentFilterChange, currentFilter }) => (
  <StyledTextField
    size="small"
    placeholder="Filter"
    className={classes.textField}
    value={currentFilter}
    onChange={({ target }) => onCurrentFilterChange(target.value)}
    variant="outlined"
    hiddenLabel
    margin="dense"
  />
);

const FlexibleSpace = ({ props }) => (
  <StyledToolbarFlexibleSpace {...props} className={classes.flexibleSpace}>
    <ReduxFilterContainer />
    <ReduxLocationSelector />
  </StyledToolbarFlexibleSpace>
);

const isRestTime = (date) =>
  date.getDay() === 0 ||
  date.getDay() === 6 ||
  date.getHours() < 9 ||
  date.getHours() >= 18;

const TimeTableCell = ({ ...restProps }) => {
  const { startDate } = restProps;
  if (isRestTime(startDate)) {
    return (
      <StyledWeekViewTimeTableCell
        {...restProps}
        className={classes.weekendCell}
      />
    );
  }
  return <StyledWeekViewTimeTableCell {...restProps} />;
};

const DayScaleCell = ({ ...restProps }) => {
  const { startDate } = restProps;
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return (
      <StyledWeekViewDayScaleCell {...restProps} className={classes.weekEnd} />
    );
  }
  return <StyledWeekViewDayScaleCell {...restProps} />;
};

const SCHEDULER_STATE_CHANGE_ACTION = "SCHEDULER_STATE_CHANGE";

const commitChanges = ({ added, changed, deleted,data,setData }) => {
 
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

const SchedulerContainer = ({
  data,
  currentDate,
  onCurrentDateChange,
  currentViewName,
  onCurrentViewNameChange,
}) => (
  <Paper>
    <Scheduler data={data} height={660}>
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={onCurrentDateChange}
        currentViewName={currentViewName}
        onCurrentViewNameChange={onCurrentViewNameChange}
      />
      <DayView startDayHour={6} endDayHour={20} />
      <WeekView
        startDayHour={6}
        endDayHour={20}
        timeTableCellComponent={TimeTableCell}
        dayScaleCellComponent={DayScaleCell}
      />

      <Appointments appointmentContentComponent={AppointmentContent} />
      <Resources data={resources} />
      <EditingState onCommitChanges={commitChanges}/>
      <Toolbar flexibleSpaceComponent={FlexibleSpace} />
      <DateNavigator />
      <ViewSwitcher />
      <EditingState onCommitChanges={commitChanges}/>
          <ConfirmationDialog />
          {/* <IntegratedEditing /> */}
          <Appointments />
          <AppointmentTooltip />
          <AppointmentForm />
        

    </Scheduler>
  </Paper>
);

const schedulerInitialState = {
  data: appointments,
  currentDate: { CurrentTimeIndicator },
  currentViewName: "Week",
  currentFilter: "",
  locations: LOCATIONS,
};

const schedulerReducer = (state = schedulerInitialState, action) => {
  if (action.type === SCHEDULER_STATE_CHANGE_ACTION) {
    return {
      ...state,
      [action.payload.partialStateName]: action.payload.partialStateValue,
    };
  }
  return state;
};

export const createSchedulerAction = (partialStateName, partialStateValue) => ({
  type: SCHEDULER_STATE_CHANGE_ACTION,
  payload: {
    partialStateName,
    partialStateValue,
  },
});

const mapStateToProps = (state) => {
  let data = state.data.filter(
    (dataItem) => state.locations.indexOf(dataItem.location) > -1
  );
  const lowerCaseFilter = state.currentFilter.toLowerCase();
  data = data.filter(
    (dataItem) =>
      dataItem.title.toLowerCase().includes(lowerCaseFilter) ||
      dataItem.location.toLowerCase().includes(lowerCaseFilter)
  );
  return { ...state, data };
};

const mapDispatchToProps = (dispatch) => ({
  onCurrentDateChange: (currentDate) =>
    dispatch(createSchedulerAction("currentDate", currentDate)),
  onCurrentViewNameChange: (currentViewName) =>
    dispatch(createSchedulerAction("currentViewName", currentViewName)),
  onCurrentFilterChange: (currentFilter) =>
    dispatch(createSchedulerAction("currentFilter", currentFilter)),
  onLocationsChange: (locations) =>
    dispatch(createSchedulerAction("locations", locations)),
});

const ReduxSchedulerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulerContainer);
const ReduxFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
const ReduxLocationSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSelector);

const store = createStore(
  schedulerReducer,
  // Enabling Redux DevTools Extension (https://github.com/zalmoxisus/redux-devtools-extension)
  // eslint-disable-next-line no-underscore-dangle
  typeof window !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
  // eslint-enable
);

export default function ScheduleFood() {
  const [data, setData]= useState();
  return (
    <Provider store={store}>
      <ReduxSchedulerContainer />
    </Provider>
  );
}




