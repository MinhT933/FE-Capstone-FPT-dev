import React from "react";
import Iconify from "./Iconify";

export default function getIcon(props) {
  const { names } = props;
  return <Iconify icon={names} width={22} height={22} />;
}
