import React from 'react'
import classes from './class';
import StyleAppointments from './Appointments';


const AppointmentContent = ({
    data, formatDate, ...restProps
  }) => (
    <StyleAppointments {...restProps} formatDate={formatDate} data={data}>
      <div className={classes.container}>
        <div className={classes.title}>
          {data.title}
        </div>
        <div className={classes.text}>
          {data.location}
        </div>
        <div className={classes.textContainer}>
          <div className={classes.time}>
            {formatDate(data.startDate, { hour: 'numeric', minute: 'numeric' })}
          </div>
          <div className={classes.time}>
            {' - '}
          </div>
          <div className={classes.time}>
            {formatDate(data.endDate, { hour: 'numeric', minute: 'numeric' })}
          </div>
        </div>
      </div>
    </StyleAppointments>
  );

export default AppointmentContent