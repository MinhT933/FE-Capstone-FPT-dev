import React from "react";
import "./home.css";
import FeaturedInfo from "./../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "./../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <div className="homeWidgets">
        <h1>heheh</h1>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
