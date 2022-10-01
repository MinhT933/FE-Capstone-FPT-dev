import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";

export default function ButtonCustomize(props) {
  const { nameButton, onClick, component, to, type } = props;
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC32",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));
  return (
    <ColorButton type={type} onClick={onClick} component={component} to={to}>
      {nameButton}
    </ColorButton>
  );
}
