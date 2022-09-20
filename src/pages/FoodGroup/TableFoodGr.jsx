import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Món chay", 159, "mô tả"),
  createData("Món Mặn", 237, "mô tả"),
  createData("Dặc Sản", 262, "mô tả"),
  createData("Món Chiên", 305, "mô tả"),
  createData("Món Xào", 356, "mô tả"),
];

export default function TableFoodGr() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "10%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell align="left">Số Lượng(Max)</TableCell>
            <TableCell align="left">Mô tả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
