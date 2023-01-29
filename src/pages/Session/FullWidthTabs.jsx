import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import SessionDetailTime from "./SessionDetailTime";
import TotalFood from "./TotalFood";
import { useState } from "react";
import DeliveryTripByIDsession from "./DeliveryTripByIDsession";
import Iconify from "../../components/hook-form/Iconify";
import PageDetailSession from "../../components/PageDetailSession";
import { useDispatch } from "react-redux";
import { callAPIGetListSessionDetail } from "../../redux/action/acction";
import { jwt_decode } from "jwt-decode";
import { useSelector } from "react-redux";
import ViewOrderInSession from "./ViewOrderInSession";
import Label from "./../../components/label/label";
import ButtonCustomize from "../../components/Button/ButtonCustomize";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let { id } = useParams();

  // const classes = useStyles();

  const useStyles = useTheme({
    tabs: {
      "& .MuiTabs-indicator": {
        backgroundColor: "orange",
        height: 3,
      },
      "& .MuiTab-root.Mui-selected": {
        color: "red",
      },
    },
  });

  const handleCompareDate = (date1, date2) => {
    // return (
    //   date1.getFullYear() >= date2.getFullYear() ||
    //   date1.getDate() >= date2.getDate() ||
    //   date1.getMonth() >= date2.getMonth()
    // );
    return date1.getTime() >= date2.getTime();
  };

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  React.useEffect(() => {
    const getDetailSession = async () => {
      await dispatch(callAPIGetListSessionDetail(token, id));
    };
    getDetailSession();
  }, [dispatch, id, token]);

  const detailSession = useSelector((state) => {
    return state.userReducer.detailSession;
  });
  console.log(typeof detailSession.workDate);

  const profile = useSelector((state) => {
    return state.userReducer.profiles;
  });
  const [Button, setButton] = useState(false);

  React.useEffect(() => {
    if (handleCompareDate(new Date(), new Date(detailSession.workDate))) {
      setButton(true);
    }
  }, [detailSession.workDate]);

  const handleStatus = (status) => {
    if (status === "waiting") {
      return <Label color="error">Chưa phân công</Label>;
      // return "Chưa phân công";
    } else if (status === "processing") {
      return <Label color="warning">Đang phân công</Label>;
    } else if (status === "done") {
      return <Label color="warning">Hoàn thành </Label>;
    } else if (status === "ready") {
      return <Label color="warning">Chuẩn bị giao </Label>;
    }
  };

  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <PageDetailSession
        title={` ${"Chi tiết phiên làm việc của"}  ${
          profile.profile?.fullName
        }`}
        subTitle={`${"Phiên làm việc ngày: ".toUpperCase()} ${
          detailSession.workDate
        } `}
        subTitle1={`${"Khung giờ:".toUpperCase()} ${
          detailSession.timeSlot?.startTime
        }-${detailSession.timeSlot?.endTime} `}
        subTitle2={`${"Tổng đơn:".toUpperCase()} 12 `}
        subTitle3={handleStatus(detailSession.status)}
        subTitle4={Button && <ButtonCustomize nameButton="Hoàn thành" />}
        icon={getIcon("fluent:apps-list-detail-20-filled")}
      />
      <AppBar position="static">
        <Tabs
          // TabIndicatorProps={{
          //   style: {
          //     tabs: {
          //       "& .MuiTabs-indicator": {
          //         backgroundColor: "orange",
          //         height: 3,
          //       },
          //       "& .MuiTab-root.Mui-selected": {
          //         color: "red",
          //       },
          //     },
          //   },
          // }}
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#FFCC32" },
            "& .MuiTab-root": { color: "white" },

            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "#FFCC32",
            },
          }}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Đơn hàng" {...a11yProps(0)} />
          <Tab label="Túi hàng" {...a11yProps(1)} />
          {/* <Tab label="Tổng Món" {...a11yProps(2)} /> */}
          <Tab label="Đợt giao" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ViewOrderInSession id={id} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SessionDetailTime id={id} />
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          <TotalFood id={id} />
        </TabPanel> */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <DeliveryTripByIDsession id={id} />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
