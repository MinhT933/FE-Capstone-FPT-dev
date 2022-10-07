import React, { useState } from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import { URL_API } from "../../Axios/URL_API/URL";
import API from "../../Axios/API/API";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import PageHeader from "../../components/PageHeader";
import DialogTitle from "@mui/material/DialogTitle";
import Iconify from "../../components/hook-form/Iconify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Controls from "./../../components/Control/Controls";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { set } from "date-fns";

const shema = yup.object().shape({
  name: yup.string().required(" vui lòng nhập tên"),
});
export default function NewTimeFrame(props) {
  const { OpenPopUp, SetOpenPopUp } = props;

  let [mon, setMon] = useState(false);

  let [tue, setTue] = useState(false);

  let [wed, setWeb] = useState(false);

  let [thur, setThur] = useState(false);

  let [fri, setFri] = useState(false);

  let [sat, setSat] = useState(false);

  const handlechageMonday = (e) => {
    setMon(e.target.checked);
  };

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  console.log(mon, tue, wed, thur, fri, sat);

  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;

  const formik = useFormik({
    validationSchema: shema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      // const data = [
      // ]
    },
  });

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          p: 1,
          m: 1,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "center",
        boxShadow: 12,
      }}
    >
      <Paper>
        <div style={{ width: "90%" }}>
          <Box
            sx={{
              display: "grid",
              marginBottom: "3%",
              maxHeight: 1250,
            }}
          >
            <Dialog
              open={OpenPopUp}
              onClose={handleClose}
              style={{ maxHeight: 1250 }}
            >
              <DialogTitle>
                <PageHeader
                  title="Tạo Khung thời gian"
                  subTitle="Chọn ngày và buổi cho gói ăn"
                  icon={getIcon("uil:schedule")}
                />
              </DialogTitle>
              <form>
                <Box
                  sx={{
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    m: 4,
                    mt: 0.1,
                    justifyContent: "center",
                    boxShadow: 12,
                    // paddingLeft: "12%",
                  }}
                >
                  <TableContainer component={Paper}>
                    <Controls.Input
                      variant="outlined"
                      name="name"
                      label="Tên"
                      width="60%"
                      marginLeft="1rem"
                      marginTop="1rem"
                      marginBottom="0.5rem"
                    />
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Thứ 2</TableCell>
                          <TableCell align="right">Thứ 3</TableCell>
                          <TableCell align="right">Thứ 4</TableCell>
                          <TableCell align="right">Thứ 5</TableCell>
                          <TableCell align="right">Thứ 6</TableCell>
                          <TableCell align="right">Thứ 7</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Checkbox
                              name="mon"
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onClick={handlechageMonday}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              name="tue"
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onChange={(e) => {
                                setTue(e.target.checked);
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              name="Wed"
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onChange={(e) => {
                                setWeb(e.target.checked);
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              name="Thur"
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onChange={(e) => {
                                setThur(e.target.checked);
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              name="Fri"
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onChange={(e) => {
                                setFri(e.target.checked);
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              name="Sat"
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onChange={(e) => {
                                setSat(e.target.checked);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: "flex", ml: 2.5, mb: 2, mt: 0.6 }}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Chọn buổi
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="morning"
                          control={
                            <Checkbox
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onChange={(e) => {}}
                            />
                          }
                          label="Sáng"
                        />
                        <FormControlLabel
                          value="lunch"
                          control={
                            <Checkbox
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onChange={(e) => {}}
                            />
                          }
                          label="Trưa"
                        />
                        <FormControlLabel
                          value="affternoon"
                          control={
                            <Checkbox
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "#FFCC32",
                                },
                              }}
                              onChange={(e) => {}}
                            />
                          }
                          label="Chiều"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      marginLeft: "42%",
                      paddingBottom: "1rem",
                    }}
                  >
                    <ButtonCustomize nameButton="tạo" />
                  </Box>
                </Box>
              </form>
            </Dialog>
          </Box>
        </div>
      </Paper>
    </Box>
  );
}
