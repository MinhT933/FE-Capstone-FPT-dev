import React from "react";
import BaseOptionChart from "../../components/chart/BaseOptionChart";
import AppWebsiteVisits from "./../../sections/@dashboard/app/AppWebsiteVisits";
import AppWidgetSummary from "./../../sections/@dashboard/app/AppWidgetSummary";
import { Grid } from "@mui/material";

export default function Home() {
  return (
    // <div className="home">
    //   <div className="homeWidgets">
    //     <BaseOptionChart />
    //   </div>
    // </div>
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
            icon={"ant-design:android-filled"}
          />
        </Grid>

        <Grid item xs={6}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={"ant-design:apple-filled"}
          />
        </Grid>
      </Grid>
      <AppWebsiteVisits
        title="Thống kê người dùng"
        subheader="(+43%) than last year"
        chartLabels={[
          "01/01/2003",
          "02/01/2003",
          "03/01/2003",
          "04/01/2003",
          "05/01/2003",
          "06/01/2003",
          "07/01/2003",
          "08/01/2003",
          "09/01/2003",
          "10/01/2003",
          "11/01/2003",
        ]}
        chartData={[
          {
            name: "Team A",
            type: "column",
            fill: "solid",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          },
        ]}
      />
    </>
  );
}
