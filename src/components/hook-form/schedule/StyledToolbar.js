import { Toolbar } from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";
import classes from "./class";
import { styled } from "@mui/material/styles";

export default function StyledToolbar() {
  const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
    [`&.${classes.flexibleSpace}`]: {
      margin: "0 auto 0 0",
      display: "flex",
      alignItems: "center",
    },
  }));
  return (
    <React.Fragment>
      <StyledToolbarFlexibleSpace />;
    </React.Fragment>
  );
}
