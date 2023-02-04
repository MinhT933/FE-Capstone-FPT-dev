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
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
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
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import { Scrollbars } from "react-custom-scrollbars";
import { Helmet } from "react-helmet-async";

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

  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState("food-categories");
  const [valuerow, setValuerow] = React.useState(null);
  const handleClickOpen = React.useCallback((item) => {
    setOpen(true);
    setValuerow(item);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = async (id) => {
    await API("DELETE", URL_API + `/${path}/${id}`, null, token)
      .then((res) => {
        // console.log(res);
        dispatch(callAPIgetListCategory(token));
        dispatch(callAPIgetCatePackage(token));
        dispatch(callAPIgetTimeFrame(token));
        handleClose();
        CustomizedToast({
          message: "Đã xóa thành công",
          type: "SUCCESS",
        });
        // handleClose();
      })
      .catch((err) => {
        CustomizedToast({
          message: "Không tìm thấy Id hoặc dự liệu đã được sử dụng",
          type: "ERROR",
        });
        handleClose();
      });
  };

  const handleDeletePac = async (path, id) => {
    await API("DELETE", URL_API + `/${path}/${id}`, null, token)
      .then((res) => {
        // console.log(res);
        dispatch(callAPIgetListCategory(token));
        dispatch(callAPIgetCatePackage(token));
        dispatch(callAPIgetTimeFrame(token));
        handleClose();
        CustomizedToast({
          message: "Đã xóa thành công",
          type: "SUCCESS",
        });
        // handleClose();
      })
      .catch((err) => {
        CustomizedToast({
          message: "Không tìm thấy Id hoặc dự liệu đã được sử dụng",
          type: "ERROR",
        });
        handleClose();
      });
  };

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
    if (newValue === 0) {
      setPath("food-categories");
    }
    if (newValue === 1) {
      setPath("package-categories");
    }
    if (newValue === 2) {
      setPath("time-frame");
    }
  };
  return (
    <Paper
      sx={{
        width: "50%",
        marginLeft: "25%",
      }}
    >
      <Helmet>
        <title>{`Khung thời gian- Phân loại | MiSu-Admin`}</title>
      </Helmet>
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
          {/* <Tab label="Khung thời gian" {...a11yProps(2)} /> */}
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
                  <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={300}
                    thumbMinSize={60}
                    universal={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    {food.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell>
                          <Grid container xs={12} sx={{ width: "45rem" }}>
                            <Grid item xs={6}>
                              {row.name}
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                onClick={(e) => {
                                  handleClickOpen(row);
                                }}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </Scrollbars>
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
                    {/* <StyledTableCell></StyledTableCell> */}
                    <StyledTableCell>
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
                  <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={300}
                    thumbMinSize={30}
                    universal={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    {packagecate.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell>
                          {/* <StyledTableCell></StyledTableCell> */}
                          <Grid container xs={12} sx={{ width: "45rem" }}>
                            <Grid item xs={6}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={row.name} src={row.image} />
                                <Typography variant="subtitle2" noWrap>
                                  {row.name}
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                onClick={(e) => {
                                  // handleDelete("package-categories", row);
                                  handleClickOpen(row);
                                }}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </Scrollbars>
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
                  <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={300}
                    thumbMinSize={25}
                    universal={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    {slot.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          <Grid container xs={12}>
                            <Grid item xs={6} sx={{ width: "45rem" }}>
                              {row.name}
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                onClick={(e) => {
                                  handleClickOpen(row);
                                }}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </Scrollbars>
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
      {open && (
        <ConfirmDialog
          open={open}
          content={valuerow.name}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          onClick={() => handleDelete(valuerow.id)}
        />
      )}
    </Paper>
  );
}
