import React from "react";
import "./home.css";

import WidgetSm from './../../components/widgetSm/WidgetSm';


export default function Home() {
  return (
    <div className="home">
      <div className="homeWidgets">
          <WidgetSm/>
      </div>
    </div>
  );
}
