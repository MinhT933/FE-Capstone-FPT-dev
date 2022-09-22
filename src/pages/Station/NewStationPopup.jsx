// import { Dialog, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";

// import React from "react";
// import { purple } from "@mui/material/colors";
// import UseCreateForm, { TForm } from "./useForm";
// import Controls from "./../Control/Controls";
// import RadioGroup from "./../Control/RadioGroup";
// import Select from "./../Control/Select";
// import Checkbox from "./../Control/Checkbox";
// import DatePicker from "./../Control/DatePicker";
// import * as UpdateService from "../../utils/UpdateService/UpdateService";
// import PageHeader from "../PageHeader";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// const initialValue = {
//   id: 0,
//   stationName: "",
//   stationAddress: "",

//   openTime: new TimeRanges(),
//   closeTime: new TimeRanges(),
//   isActive: false,
// };

// // const genderItems = [
// //   { id: "male", title: "Male" },
// //   { id: "female", title: "Female" },
// //   { id: "other", title: "Other" },
// // ];

// const ColorButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.getContrastText(purple[500]),
//   backgroundColor: purple[500],
//   "&:hover": {
//     backgroundColor: "#5dc9bc",
//   },
// }));



// export default function NewUserPopup(props) {
//   const { values, setValue, handleInputChange } = UseCreateForm(initialValue);
//   const { OpenPopUp, SetOpenPopUp } = props;
//   const handleClose = () => {
//     SetOpenPopUp(false);
//   };
//   console.log(UpdateService.getOptions);
//   return (
//     <Paper>
//       <Dialog open={OpenPopUp} onClose={handleClose}>

//         <DialogContent>

//           <Grid
//             container
//             rowSpacing={4}
//             columnSpacing={{ xs: 1, sm: 3, md: 2 }}
//           >
//             <Grid item xs={6}>
//               <Controls.Input
//                 variant="outlined"
//                 label="Địa điểm"
//                 values={values.stationName}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controls.Input
//                 variant="outlined"
//                 label="Địa chỉ"
//                 values={values.stationAddress}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controls.TimeRanges
//                 name="openTime"
//                 label="Mở cửa"
//                 value={values.openTime}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controls.TimeRanges
//                 name="closeTime"
//                 label="Đóng cửa"
//                 value={values.closeTime}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controls.Select
//                 name="address"
//                 label="Địa chỉ"
//                 values={values.stationAddress}
//                 onChange={handleInputChange}
//                 options={UpdateService.getOptions()}
//               />
//             </Grid>

//           </Grid>

//           <div style={{ marginLeft: "240px", marginTop: "20px" }}>
//             <Stack spacing={2} direction="row" width="200px">
//               <ColorButton variant="contained"> Tạo mới </ColorButton>
//             </Stack>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </Paper>
//   );
// }
