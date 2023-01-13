import React from "react";
// import BaseOptionChart from "../../components/chart/BaseOptionChart";
import AppWidgetSummary from "./../../sections/@dashboard/app/AppWidgetSummary";
import { Grid, Box } from "@mui/material";
// import { useDispatch } from "react-redux";
import API from "./../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminViewFeedBackList from "../AdminViewFeedBack/AdminViewFeedBack";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { callAPIAdminGetListOrder } from "../../redux/action/acction";
import AppWidgetSummaryPacka from "../../sections/@dashboard/app/AppWidgetSummaryPacka";

export default function Home() {
  const [count, setCount] = useState();
  const [countPac, setCountPac] = useState();
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  const handleDate = () => {
    let dataDate = [];
    const date = new Date();

    for (let index = 0; index < 12; index++) {
      var newDate = new Date(date.setMonth(date.getMonth() + 1));
      const format = newDate.toLocaleDateString().split("/");
      dataDate.push(`${format[1]}/${format[0]}/${format[2]}`);
    }

    return dataDate;
  };

  const subcription = useSelector((state) => {
    return state.userReducer.listOrder;
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIAdminGetListOrder(token));
    };
    callAPI();
  }, [dispatch, token]);
  console.log(subcription);

  ///hàm tìm gói ăn được mua nhiều nhất
  const findMostPakackagebuy = () => {
    let item = [];
    if (subcription.length > 0) {
      var map = new Map();
      const packageBuy = subcription
        .filter((c) => c.status === "done")
        .map((c) => c.packages.id)
        .reduce(function (prev, cur) {
          prev[cur] = (prev[cur] || 0) + 1;
          return prev;
        }, {});

      //hàm trả key
      const key = Object.keys(packageBuy).reduce(function (a, b) {
        return packageBuy[a] > packageBuy[b] ? a : b;
      });
      const packageBuyhihi = subcription
        .filter((c) => c.status === "done")
        .find((c) => c.packages.id === key);

      const data = {
        name: packageBuyhihi.packages.name,
        image: packageBuyhihi.packages.image,
        count: packageBuy[key],
      };
      return data;
    }
  };
  //----------------------------------------------------------------

  const findSubCription = () => {
    if (subcription.length > 0) {
      const packageBuy = subcription.filter((c) => c.status === "done");
    }
  };
  findSubCription();
  // ----------------------------------------------------------------
  React.useEffect(() => {
    const res = API(
      "GET",
      URL_API + "/accounts?role=customer&status=active",
      null,
      token
    ).then((res) => {
      setCount(res.data.result.length);
    });
    const resPac = API(
      "GET",
      URL_API + "/packages/byStatus?statusPackage=active",
      null,
      token
    ).then((resPac) => {
      setCountPac(resPac.data.result.length);
    });
  });
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <AppWidgetSummary
            title="Khách hàng"
            total={count}
            icon={"mdi:user"}
          />
        </Grid>
        <Grid item xs={4}>
          <AppWidgetSummary
            title="Số gói ăn đang bán"
            total={countPac}
            color="info"
            icon={"uil:schedule"}
          />
        </Grid>
        <Grid item xs={4}>
          <AppWidgetSummaryPacka
            title="Gói ăn được mua nhiều nhất"
            total={findMostPakackagebuy()?.count}
            color="info"
            name={findMostPakackagebuy()?.name}
            url={findMostPakackagebuy()?.image}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <AppWebsiteVisits
            title="Doanh số bán ra"
            // subheader="(+43%) than last year"
            chartLabels={handleDate()}
            chartData={[
              {
                name: "Doanh số bán ra",
                type: "column",
                fill: "solid",
                data: [12, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
            ]}
          />
        </Grid> */}
        {/* <Grid item xs={6}> */}

        {/* </Grid> */}
      </Grid>
      <Box sx={{ marginTop: "3%" }}>
        <AdminViewFeedBackList />
      </Box>
    </>
  );
}
