import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "Name", headerName: "Tên Món", width: 130 },
  { field: "restaurant", headerName: "Nhà Hàng", width: 130 },
  {
    field: "price",
    headerName: "giá",
    type: "number",
    width: 90,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 1, Name: "Cá chiên", restaurant: "Biển Khơi", price: 130000 },
  { id: 2, Name: "Cá chiên", restaurant: "Biển Khơi", price: 130000 },
  { id: 3, Name: "Cá chiên", restaurant: "Biển Khơi", price: 130000 },
  { id: 4, Name: "Cá chiên", restaurant: "Biển Khơi", price: 130000 },
  { id: 5, Name: "Cá chiên", restaurant: "Biển Khơi", price: 130000 },
  { id: 6, Name: "Cá chiên", restaurant: "Biển Khơi", price: 130000 },
  // { id: 7, Name: "Cá chiên", restaurant: "Biển Khơi", price: 130000 },
];

export default function ProductList() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={11}>
        <div style={{ height: 600, width: "100%", display: "block" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Grid>
    </Grid>
  );
}
