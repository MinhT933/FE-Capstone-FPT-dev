import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../../Axios/URL_API/URL";
import API from "../../Axios/API/API";
import { useState } from "react";

export default function ButtonBootrap(props) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  if (token === null) {
    Navigate("/");
  }

  const [count, setCount] = useState(0);
  React.useEffect(() => {
    const callAPI = async () => {
      // await dispatch(callAPIgetAPIcount(token, props.status));
      const res = await API(
        "GET",
        URL_API + `/delivery_trips?status=${props.status}`,
        null,
        token
      );
      setCount(res.data.result.length);
    };

    callAPI();
  }, [dispatch, token, props.status]);

  function hehe() {
    switch (props.nameButton) {
      case "Đang chờ":
        return "#FFCC00";

      case "Từ chối":
        return "red";

      case "Đã giao":
        return "green";

      case "Đang giao":
        return "blue";

      default:
        break;
    }
  }
  const BootstrapButton = styled(Button)({
    // boxShadow: "none",
    marginLeft: "22%",
    width: "11rem",
    textTransform: "none",
    color: hehe(),
    // fontSize: 16,
    padding: "6px 12px",
    fontWeight: "0.1px",
    // border: "1px solid",
    // lineHeight: 1.5,
    backgroundColor: "white",
    borderColor: "white",
    fontFamily: [
      // "-apple-system",
      // "BlinkMacSystemFont",
      // '"Segoe UI"',
      // "Roboto",
      // '"Helvetica Neue"',
      // "Arial",
      // "sans-serif",
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
      "Source Sans Pro",
      "sans - serif",
    ].join(","),
    "&:hover": {
      backgroundColor: "white",
      borderColor: "#FFD700",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      color: "black",
      backgroundColor: hehe(),
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });
  const { nameButton, onClick } = props;
  return (
    <Stack spacing={2} direction="row">
      <BootstrapButton variant="contained" disableRipple onClick={onClick}>
        {nameButton} {count > 0 && "(" + count + ")"}
      </BootstrapButton>
    </Stack>
  );
}
