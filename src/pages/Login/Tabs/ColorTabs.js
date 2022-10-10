import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NewPackage from "../../PackageFood/newPackage";
import { styled } from "@mui/styles";
import Login from "../login";
import LoginManager from "../LoginManager";
import Loginkichen from "../Loginkichen";

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

export default function TabsPacket() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  // const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
        // backgroundColor: "red",
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      height: 2,
      justifyContent: "center",
      backgroundColor: "yellow",
    },
  });

  return (
    <Box sx={{ bgcolor: "background.paper", width: "115%" }}>
      <AppBar position="static" sx={{ bgcolor: "#ffff" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Quản trị " {...a11yProps(0)} />
          <Tab label="Quản lí " {...a11yProps(1)} />
          <Tab label="Bếp" {...a11yProps(2)} />
        </StyledTabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box sx={{ marginLeft: "5%" }}>
            <Login handleChange={handleChange} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box sx={{ marginLeft: "5%" }}>
            <LoginManager handleChange={handleChange} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box sx={{ marginLeft: "5%" }}>
            <Loginkichen handleChange={handleChange} />
          </Box>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
