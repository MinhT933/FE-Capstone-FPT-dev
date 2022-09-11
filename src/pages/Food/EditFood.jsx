import React from "react";
import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from '../../components/hook-form/Iconify';


import Button from "@mui/material/Button";
import UseCreateForm from "../../components/PopUp/useForm";
import * as UpdateService from "../../utils/UpdateService/UpdateService";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import InputImg from './../../components/InputImg/inputImg';

const initialValue = {
  id: 0,
  name: "",
  createDate: new Date(),
  endDate: new Date(),
  description: "",
  img: "",
  price: "",
  isActive: false,
};

const useStyles = styled((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(9),
  },
}));

const Status = [
  {id:1, title:"Đang chờ"},
  {id: 2,title: "đã duyệt"},
]


//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FFCC32"),
  backgroundColor: "#FFCC32",
  "&:hover": {
    backgroundColor: "#ffee32",
  },
  display: "center",
}));

export default function EditFood() {
  const { values, setValue, handleInputChange } = UseCreateForm(initialValue);
  const classes = useStyles();
  return (
    <Paper className={classes.pageContent}>
      <PageHeader  
        title="Cập nhập thông tin thức ăn"
        // subTitle="Tinh hoa ẩm thực "
       
        icon={getIcon('emojione-monotone:pot-of-food')}
      />
      <Box sx={{float:"left" ,width:"40%"}}>
        <Paper>
        <InputImg/>
        </Paper>
      </Box>
      <Box sx={{ foat: "right",width: "60%", flexGrow: 1 }}
       display="flex"
       justifyContent="center"
       alignItems="center"
       >
        <Grid
          container
          spacing = {1.5}
        >
          <Grid item xs={6} >
            <Controls.Input
              variant="outlined"
              label="Tên"
              value={values.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              variant="outlined"
              label="Giá"
              value={values.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              variant="outlined"
              label="Mô tả"
              value={values.price}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6} >
            <Controls.Select
              name="Nhóm Package"
              label="Loại"
              value={values.departmentId}
              onChange={handleInputChange}
              options={UpdateService.Cate()}
            />
          </Grid>
          <Grid item xs = {6}>
          <Controls.RadioGroup
            name="Status"
            label="Trạng thái"
            value={values.Status}
            onChange={handleInputChange}
            items={Status}
          />
          
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Stack width="200px" justifyContent="center" marginLeft={"40%"} marginTop={"5rem"}>
            <ColorButton variant="contained"> Cập nhật  </ColorButton>
          </Stack>
        </Box>
    </Paper>
  );
}
