import React from "react";
import { Box, Paper, Avatar, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import {
  callAPIgetCatePackage,
  callAPIgetListCategory,
  callAPIgetTimeFrame,
} from "../../redux/action/acction";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { useState } from "react";
import NewCateFood from "../Food/NewCateFood";
import NewCate from "../PackageFood/newCate";
import NewTimeFrame from "../PackageFood/NewTimeFrame";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FFCC32",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  // ".css-1cfjt0f-MuiTable-root": {
  //   borderspacing: "none",
  // },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 123,
  },
}));

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

export default function ListCateTime() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [OpenPopUpCate, SetOpenPopUpCate] = useState(false);
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [OpenPopUpCatePac, SetOpenPopUpCatePac] = useState(false);

  const token = localStorage.getItem("token");
  if (token === null) {
    navigate("/");
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const BootstrapButton = styled(Button)({
    // boxShadow: "none",
    // marginLeft: "22%",
    width: "5rem",
    textTransform: "none",
    color: "black",
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
      backgroundColor: "white",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });
  React.useEffect(() => {
    const callAPIgetdata = async () => {
      await dispatch(callAPIgetListCategory(token));
      await dispatch(callAPIgetCatePackage(token));
      await dispatch(callAPIgetTimeFrame(token));
    };
    callAPIgetdata();
  }, [dispatch, token]);
  const food = useSelector((state) => {
    return state.userReducer.listCategory;
  });

  const packagecate = useSelector((state) => {
    return state.userReducer.listCategoryPackage;
  });

  const slot = useSelector((state) => {
    return state.userReducer.listTimeFrame;
  });
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper
      sx={{
        width: "50%",
        marginLeft: "25%",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#FFCC32" },
            "& .MuiTab-root": { color: "", fontSize: 12 },
            "& .Mui-selected": { color: "#FFCC32", fontSize: 14 },
          }}
        >
          <Tab label="Loại món ăn" {...a11yProps(0)} />
          <Tab label="Loại gói ăn" {...a11yProps(1)} />
          <Tab label="Khung thời gian" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Box sx={{}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <Grid container xs={12}>
                        <Grid item xs={6}>
                          Tên loại món ăn
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={2} direction="row">
                            <BootstrapButton
                              variant="contained"
                              disableRipple
                              onClick={() => {
                                SetOpenPopUpCate(true);
                              }}
                            >
                              + Thêm
                            </BootstrapButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {food.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <Grid container xs={12}>
                        <Grid item xs={6}>
                          Tên loại gói ăn
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={2} direction="row">
                            <BootstrapButton
                              variant="contained"
                              disableRipple
                              onClick={() => {
                                SetOpenPopUpCatePac(true);
                              }}
                            >
                              + Thêm
                            </BootstrapButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packagecate.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        <Avatar alt={row.name} src={row.image} />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box sx={{}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <Grid container xs={12}>
                        <Grid item xs={6}>
                          Khung thời gian
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={2} direction="row">
                            <BootstrapButton
                              variant="contained"
                              disableRipple
                              onClick={() => {
                                SetOpenPopUp(true);
                              }}
                            >
                              + Thêm
                            </BootstrapButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slot.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
      </SwipeableViews>
      <NewCateFood
        OpenPopUpCate={OpenPopUpCate}
        SetOpenPopUpCate={SetOpenPopUpCate}
      />
      <NewCate
        OpenPopUpCate={OpenPopUpCatePac}
        SetOpenPopUpCate={SetOpenPopUpCatePac}
      />
      <NewTimeFrame OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
    </Paper>
  );
}
