import React from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import * as yup from "yup";

import Controls from "./../../components/Control/Controls";

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

const schema = yup.object().shape({
  morning: yup.string().required().trim(),
  lunch: yup.string().required().trim(),
  affternoon: yup.string().required().trim(),
});

export default function NewPackageItem() {
  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValue: {
      morning: "",
      lunch: "",
      affternoon: "",
    },
    onSubmit: async (values) => {
      // code call API here
      const res = await API("POST", URL_API);
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
        m: 1,
        display: "flex",
        justifyContent: "center",
        boxShadow: 12,
        marginTop: "3%",
      }}
    >
      <Paper>
        <div style={{ width: "90%" }}>
          <Box
            sx={{
              display: "grid",
              marginBottom: "3%",
            }}
          >
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Thứ 2</TableCell>
                      <TableCell align="right">Thứ 3</TableCell>
                      <TableCell align="right">Thứ 4</TableCell>
                      <TableCell align="right">Thứ 5</TableCell>
                      <TableCell align="right">Thứ 6</TableCell>
                      <TableCell align="right">Thứ 7</TableCell>
                      <TableCell align="right">Chủ nhật</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          {...label}
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "#FFCC32",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          {...label}
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "#FFCC32",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          {...label}
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "#FFCC32",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          {...label}
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "#FFCC32",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          {...label}
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "#FFCC32",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          {...label}
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "#FFCC32",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          {...label}
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "#FFCC32",
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* selectGroupFood */}
            </Box>
            <Item>
              <Controls.InputTagCheckBox
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Sáng"
                value={formik.values}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
            </Item>
            <Item>
              <Controls.InputTagCheckBox
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Trưa"
                value={formik.values}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
            </Item>
            <Item>
              <Controls.InputTagCheckBox
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Tối"
                value={formik.values}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
            </Item>
          </Box>
        </div>
      </Paper>
    </Box>
  );
}
