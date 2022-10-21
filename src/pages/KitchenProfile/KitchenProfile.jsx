import React from "react";
import { Typography, Grid, ListItemText } from "@mui/material";
import { List } from "@mui/icons-material";
import { ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import PageHeader from "../../components/PageHeader";
import Iconify from "../../components/hook-form/Iconify";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
// import { Paper } from "@material-ui/core";
import Page from "../../components/setPage/Page";
// import Container from "@material-ui/core";

import {
    Paper,
    Container,
} from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC33",
    "&:hover": {
        backgroundColor: "#ffee32",
    },
    display: "center",
}));
const getIcon = (name) => <Iconify icon={name} width={30} height={30} />;
export default function KitchenProfile(props) {
    // const { classes } = props;
    return (


        <React.Fragment>
            <Box
                sx={{
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "center",
                    boxShadow: 12,
                    marginLeft: "0.75%",
                    marginRight: "0.75%",
                }}
            >
                <Grid container spacing={16} sx={{ paddingTop: "3%" }}>
                    <Grid item xs={12} sm={5} marginLeft="10%">
                        <Typography variant="h6" gutterBottom>
                            Thông tin bếp
                        </Typography>
                        <Typography gutterBottom>Địa điểm: Khu CN Cao</Typography>
                        <Typography gutterBottom>Địa chỉ: D1, quận 9, Hồ Chí Minh </Typography>
                        <Typography gutterBottom>Điện thoại : 1900 8088</Typography>
                        <Typography gutterBottom>Công suất : 220</Typography>

                        <Typography gutterBottom>Ngày tạo: 28/09/2022</Typography>
                        <Typography gutterBottom>Cập nhật: 28/09/2022</Typography>
                        <Typography gutterBottom>Trạng thái: Đang hoạt động</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={5}>
                        <Typography variant="h6" gutterBottom>
                            Khung thời gian hoạt động
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Mở cửa:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>09:00</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Đóng cửa:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>10:00</Typography>
                            </Grid>
                            <Grid sm={5} sx={{ mt: 20, mb: 5 }}>
                                <ColorButton sx={{ width: "80%" }}>Xác nhận</ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box></Box>
            </Box>
        </React.Fragment>

    );
}

// const addresses = [
//   "1 Material-UI Drive",
//   "Reactville",
//   "Anytown",
//   "99999",
//   "USA",
// ];
// const TimeFrame = [
//   { name: " Buổi trong ngày  ", detail: "Trưa ,tối" },
//   { name: "Ngày trong tuần", detail: "thứ 2 , thứ 3 , thứ 4" },
// ];

// const styles = (theme) => ({
//   listItem: {
//     padding: `${theme.spacing.unit}px 0`,
//   },
//   total: {
//     fontWeight: "700",
//   },
//   title: {
//     marginTop: theme.spacing.unit * 2,
//   },
// });
//   setColor button

// const products = [
//   { name: "Product 1", desc: "A nice thing", price: "$9.99" },
//   { name: "Product 2", desc: "Another thing", price: "$3.45" },
//   { name: "Product 3", desc: "Something else", price: "$6.51" },
//   { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
//   { name: "Shipping", desc: "", price: "Free" },
// ];
// //


// import { filter } from "lodash";
// import { useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// // material
// import {
//     Card,
//     Table,
//     Stack,
//     Paper,
//     Box,
//     Grid,
//     Avatar,
//     Button,
//     Checkbox,
//     TableRow,
//     TableBody,
//     TableCell,
//     Container,
//     Typography,
//     TableContainer,
//     TablePagination,
// } from "@mui/material";
// // components
// import Label from "../../components/label/label";
// import Scrollbar from "../../components/hook-form/Scrollbar";
// import SearchNotFound from "../../components/topbar/SearchNotFound";
// import Page from "../../components/setPage/Page";

// // mock
// import KITCHENPROFILE from "./KitchenProfileSample";
// import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [

//     { id: "name", label: "Họ Tên", alignRight: false },
//     { id: "id", label: "Mã tài xế", alignRight: false },
//     { id: "phone", label: "Điện thoại", alignRight: false },
//     { id: "NoPlate", label: "Biển số xe", alignRight: false },
//     { id: "VehicleType", label: "Loại xe", alignRight: false },
//     { id: "accountId", label: "Tên tài khoản", alignRight: false },
//     { id: "kitchenID", label: "Mã nhà bếp", alignRight: false },
//     { id: "status", label: "Trạng thái", alignRight: false },
//     { id: "" },
// ];

// // ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === "desc"
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     if (query) {
//         return filter(
//             array,
//             (_kitchen) => _kitchen.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
//         );
//     }
//     return stabilizedThis.map((el) => el[0]);
// }

// export default function KitchenProfile() {
//     const [OpenPopUp, SetOpenPopUp] = useState(false);
//     const [page, setPage] = useState(0);

//     const [order, setOrder] = useState("asc");

//     const [selected, setSelected] = useState([]);

//     const [orderBy, setOrderBy] = useState("name");

//     const [filterName, setFilterName] = useState("");

//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     const handleRequestSort = (event, property) => {
//         const isAsc = orderBy === property && order === "asc";
//         setOrder(isAsc ? "desc" : "asc");
//         setOrderBy(property);
//     };

//     const handleSelectAllClick = (event) => {
//         if (event.target.checked) {
//             const newSelecteds = KITCHENPROFILE.map((n) => n.name);
//             setSelected(newSelecteds);
//             return;
//         }
//         setSelected([]);
//     };

//     const handleClick = (event, name) => {
//         const selectedIndex = selected.indexOf(name);
//         let newSelected = [];
//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, name);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selected.slice(0, selectedIndex),
//                 selected.slice(selectedIndex + 1)
//             );
//         }
//         setSelected(newSelected);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleFilterByName = (event) => {
//         setFilterName(event.target.value);
//     };

//     const emptyRows =
//         page > 0 ? Math.max(0, (1 + page) * rowsPerPage - KITCHENPROFILE.length) : 0;

//     const filteredKitchen = applySortFilter(
//         KITCHENPROFILE,
//         getComparator(order, orderBy),
//         filterName
//     );
//     //setColor button
//     const ColorButton = styled(Button)(({ theme }) => ({
//         color: theme.palette.getContrastText("#FFCC32"),
//         backgroundColor: "#FFCC33",
//         "&:hover": {
//             backgroundColor: "#ffee32",
//         },
//         display: "center",
//     }));

//     const Button1 = styled(Button)(({ theme }) => ({
//         color: theme.palette.getContrastText("#FFCC33"),
//         backgroundColor: "#FFCC33",

//         // display: "center"
//     }));;

//     const isKitchenNotFound = filteredKitchen.length === 0;

//     const Item = styled(Paper)(({ theme }) => ({
//         backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//         ...theme.typography.body2,
//         padding: theme.spacing(30),
//         textAlign: "center",
//         color: theme.palette.text.secondary
//     }));

//     return (
//         <Page title="User">
//             <Paper>

//             </Paper>
//             <Container>
//                 <Paper elevation={3}>

//                     {filteredKitchen
//                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         .map((row) => {
//                             const {
//                                 id,
//                                 avatarUrl,
//                                 name,
//                                 phone,
//                                 NoPlate,
//                                 VehicleType,
//                                 status,
//                                 accountId,
//                                 kitchenID,

//                             } = row;
//                             const isItemSelected = selected.indexOf(name) !== -1;

//                             return (

//                                 <TableRow
//                                     hover
//                                     key={id}
//                                     tabIndex={-1}
//                                     role="checkbox"
//                                     selected={isItemSelected}
//                                     aria-checked={isItemSelected}
//                                 >
//                                     <TableCell padding="checkbox">
//                                         <Checkbox
//                                             checked={isItemSelected}
//                                             onChange={(event) => handleClick(event, name)}
//                                         />
//                                     </TableCell>

//                                     <TableCell component="th" scope="row" padding="none">
//                                         <Stack
//                                             direction="row"
//                                             alignItems="center"
//                                             spacing={2}
//                                         >
//                                             <Avatar alt={name} src={avatarUrl} />
//                                             <Typography variant="subtitle2" noWrap>
//                                                 {name}
//                                             </Typography>
//                                         </Stack>
//                                     </TableCell>

//                                     <TableCell align="left">
//                                         <Label
//                                             variant="ghost"
//                                             color={
//                                                 (status === "Closed" && "error") || "success"
//                                             }
//                                         >
//                                             {(status)}
//                                         </Label>
//                                     </TableCell>

//                                 </TableRow>
//                             );
//                         })}
//                     <Paper elevation={3}>
//                         <Box sx={{ flexGrow: 1 }}>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={2}>
//                                     <Item>xs=4</Item>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Item>xs=8</Item>
//                                 </Grid>
//                             </Grid>
//                         </Box>

//                     </Paper>

//                 </Paper>
//             </Container>

//             <Container>
//                 <Stack
//                     direction="row"
//                     alignItems="center"
//                     justifyContent="space-between"
//                     mb={5}
//                 >
//                     <Typography variant="h4" gutterBottom>
//                         {/* User */}
//                     </Typography>
//                     {/* <ColorButton
//                         variant="contained"
//                         component={RouterLink}
//                         to="/dashboard/admin/newshipper"

//                     >
//                         Thêm tài xế
//                     </ColorButton> */}
//                     <ColorButton
//                         variant="contained"
//                         component={RouterLink}
//                         to="/dashboard/kitchen/requestshipper"

//                     >
//                         Yêu cầu thêm tài xế
//                     </ColorButton>
//                 </Stack>

//                 <Card>
//                     <UserListToolbar
//                         numSelected={selected.length}
//                         filterName={filterName}
//                         onFilterName={handleFilterByName}
//                     />

//                     <Scrollbar>
//                         <TableContainer sx={{ minWidth: 800 }}>
//                             <Table>
//                                 <UserListHead
//                                     order={order}
//                                     orderBy={orderBy}
//                                     headLabel={TABLE_HEAD}
//                                     rowCount={KITCHENPROFILE.length}
//                                     numSelected={selected.length}
//                                     onRequestSort={handleRequestSort}
//                                     onSelectAllClick={handleSelectAllClick}
//                                 />
//                                 <TableBody>
//                                     {filteredKitchen
//                                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                         .map((row) => {
//                                             const {
//                                                 id,
//                                                 avatarUrl,
//                                                 name,
//                                                 phone,
//                                                 NoPlate,
//                                                 VehicleType,
//                                                 status,
//                                                 accountId,
//                                                 kitchenID,

//                                             } = row;
//                                             const isItemSelected = selected.indexOf(name) !== -1;

//                                             return (
//                                                 <TableRow
//                                                     hover
//                                                     key={id}
//                                                     tabIndex={-1}
//                                                     role="checkbox"
//                                                     selected={isItemSelected}
//                                                     aria-checked={isItemSelected}
//                                                 >
//                                                     <TableCell padding="checkbox">
//                                                         <Checkbox
//                                                             checked={isItemSelected}
//                                                             onChange={(event) => handleClick(event, name)}
//                                                         />
//                                                     </TableCell>

//                                                     <TableCell component="th" scope="row" padding="none">
//                                                         <Stack
//                                                             direction="row"
//                                                             alignItems="center"
//                                                             spacing={2}
//                                                         >
//                                                             <Avatar alt={name} src={avatarUrl} />
//                                                             <Typography variant="subtitle2" noWrap>
//                                                                 {name}
//                                                             </Typography>
//                                                         </Stack>
//                                                     </TableCell>
//                                                     <TableCell align="left">{id}</TableCell>
//                                                     {/* <TableCell align="left">{name}</TableCell> */}

//                                                     <TableCell align="left">{phone}</TableCell>
//                                                     <TableCell align="left">{NoPlate}</TableCell>
//                                                     <TableCell align="left">{VehicleType}</TableCell>
//                                                     <TableCell align="left">{accountId}</TableCell>
//                                                     <TableCell align="left">{kitchenID}</TableCell>
//                                                     <TableCell align="left">
//                                                         <Label
//                                                             variant="ghost"
//                                                             color={
//                                                                 (status === "Closed" && "error") || "success"
//                                                             }
//                                                         >
//                                                             {(status)}
//                                                         </Label>
//                                                     </TableCell>
//                                                     {/* <Button1 sx={{ marginTop: "10%", marginRight: "8%", marginBottom: "5%" }} */}

//                                                     {/* <Button1 sx={{ marginTop: "7%", }}
//                                                         variant="outlined"
//                                                         // display="TableCell"
//                                                         component={RouterLink}
//                                                         to="/dashboard/admin/updateshipper"

//                                                     >
//                                                         Cập nhật
//                                                     </Button1> */}

//                                                     {/* <TableCell align="right"> */}
//                                                     {/* //props */}
//                                                     {/* <KitchenMoreMenu id={id} /> */}
//                                                     {/* </TableCell> */}


//                                                 </TableRow>
//                                             );
//                                         })}
//                                     {emptyRows > 0 && (
//                                         <TableRow style={{ height: 53 * emptyRows }}>
//                                             <TableCell colSpan={6} />
//                                         </TableRow>
//                                     )}
//                                 </TableBody>

//                                 {isKitchenNotFound && (
//                                     <TableBody>
//                                         <TableRow>
//                                             <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                                                 <SearchNotFound searchQuery={filterName} />
//                                             </TableCell>
//                                         </TableRow>
//                                     </TableBody>
//                                 )}
//                             </Table>
//                         </TableContainer>
//                     </Scrollbar>

//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 20]}
//                         component="div"
//                         count={KITCHENPROFILE.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                 </Card>
//             </Container>
//             {/* <NewStationPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp}></NewStationPopup> */}
//         </Page>
//     );
// }

