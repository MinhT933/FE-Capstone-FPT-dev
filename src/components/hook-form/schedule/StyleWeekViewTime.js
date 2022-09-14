import React from "react";
import classes from "./class";

export default function StyleWeekViewTime() {
  const isRestTime = (date) =>
    date.getDay() === 0 ||
    date.getDay() === 6 ||
    date.getHours() < 9 ||
    date.getHours() >= 18;
  const TimeTableCell = ({ ...restProps }) => {
    const { startDate } = restProps;
    if (isRestTime(startDate)) {
      return (
        <>
          <TimeTableCell {...restProps} className={classes.weekendCell} />
        </>
      );
    }
    return (
      <React.Fragment>
        <TimeTableCell {...restProps} />
      </React.Fragment>
    );
  };
}
