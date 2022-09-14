import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
export default function StyleTextfield() {
  const PREFIX = "Demo";
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

  const StyledTextField = styled(TextField)(({ theme: { spacing } }) => ({
    [`&.${classes.textField}`]: {
      width: "75px",
      marginLeft: spacing(1),
      marginTop: 0,
      marginBottom: 0,
      height: spacing(4.875),
    },
  }));
  return (
    <React.Fragment>
      <StyledTextField />
    </React.Fragment>
  );
}
