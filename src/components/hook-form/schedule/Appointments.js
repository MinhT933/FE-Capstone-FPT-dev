
import { styled } from "@mui/material/styles";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

const PREFIX = "Demo";
// #FOLD_BLOCK
const classes = {
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  textField: `${PREFIX}-textField`,
  locationSelector: `${PREFIX}-locationSelector`,
  button: `${PREFIX}-button`,
  selectedButton: `${PREFIX}-selectedButton`,
  longButtonText: `${PREFIX}-longButtonText`,
  shortButtonText: `${PREFIX}-shortButtonText`,
  title: `${PREFIX}-title`,
  textContainer: `${PREFIX}-textContainer`,
  time: `${PREFIX}-time`,
  text: `${PREFIX}-text`,
  container: `${PREFIX}-container`,
  weekendCell: `${PREFIX}-weekendCell`,
  weekEnd: `${PREFIX}-weekEnd`,
};


  const StyledAppointmentsAppointmentContent = styled(
    Appointments.AppointmentContent
  )(() => ({
    [`& .${classes.title}`]: {
      fontWeight: "bold",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    [`& .${classes.textContainer}`]: {
      lineHeight: 1,
      whiteSpace: "pre-wrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
    },
    [`& .${classes.time}`]: {
      display: "inline-block",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    [`& .${classes.text}`]: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    [`& .${classes.container}`]: {
      width: "100%",
    },
  }));

export default StyledAppointmentsAppointmentContent;
