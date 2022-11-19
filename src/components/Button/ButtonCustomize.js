import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export default function ButtonCustomize(props) {
  const {
    nameButton,
    onClick,
    component,
    to,
    type,
    width,
    marginTop,
    marginLeft,
    paddingBottom,
  } = props;
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC32",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));
  return (
    <ColorButton
      type={type}
      onClick={onClick}
      component={component}
      to={to}
      sx={{
        width: { width },
        marginTop: { marginTop },
        marginLeft: { marginLeft },
        paddingBottom: { paddingBottom },
      }}
    >
      {nameButton}
    </ColorButton>
  );
}
