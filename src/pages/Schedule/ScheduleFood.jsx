import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import {appointments} from "../../_mock/appointments";
import { data } from './../../_mock/grouping';
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';



export default function ScheduleFood() {
  const [dataa, setDataa]= useState();
// thêm xóa sửa cái lịch nha
  const commitChanges = ({ added, changed, deleted }) => {

    let newData =[...data.data] ;
    if (added) {
        const startingAddedId = dataa.length > 0 ? dataa[dataa.length - 1].id + 1 : 0;
        dataa = [...dataa, { id: startingAddedId, ...added }];
    }
    if (changed) {
      dataa = dataa.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    }
    if (deleted !== undefined) {
      dataa = dataa.filter(appointment => appointment.id !== deleted);
    }
    setDataa(newData) ;
};
  return (
    <Paper>
      <Scheduler data={dataa} height={660}>
          <ViewState currentDate={dataa}/>
          <EditingState onCommitChanges={commitChanges}/>
          <IntegratedEditing />
          <DayView startDayHour={9} endDayHour={19}/>
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton/>
          <AppointmentForm />
        </Scheduler>
    </Paper>
  );
}
