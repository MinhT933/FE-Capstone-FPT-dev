import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

export default function Timeframe() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
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
            <TableCell align="Right">
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
  );
}
