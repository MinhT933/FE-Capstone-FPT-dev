import React from "react";
// import { Paper } from "@mui/material";
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

//time
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Paper from "@mui/material/Paper";
import { MarginRounded } from "@mui/icons-material";



const initialValue = {
    id: "",
    name: "",
    phone: "",
    NoPlate: "",
    VehicleType: "",
    accountId: "",
    kitchenID: "",
    status: "",

};
const useStyles = styled((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(9),
    },
}));

const Status = [
    { id: 1, title: "Đang hoạt động" },
    { id: 2, title: "Ngưng hoạt động" },
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

export default function NewShipper() {
    const { values, setValue, handleInputChange } = UseCreateForm(initialValue);
    const classes = useStyles();


    // gettime
    const [value, setValueTime] = React.useState(dayjs("2014-08-18T21:11:54"));

    const handleChangeTime = (newValueTime) => {
        setValueTime(newValueTime);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        // padding: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.secondary
    }));



    return (

        <Paper elevation={3} sx={{
            padding: "2%", marginBottom: "10%", margin: "2%"

            // marginTop: "2%",
            // marginLeft: "5%",
            // MarginRounded: "4%"
        }}>
            <PageHeader
                display="left"
                title="Yêu cầu thêm tài xế "
                // subTitle="Đồ ăn đến rồi, đồ ăn đến rồi!!!"
                icon={getIcon('emojione-v1:double-exclamation-mark')}
            />
            <Box
                space-around="space-around"
                // sx={{ float: "right", width: "60%", flexGrow: 1 }}
                display="flex"
                justifyContent="left"
                alignItems="left"
            >
                <Grid container spacing={4} columns={20}>
                    <Grid item xs={8} marginLeft="10%">
                        <Stack spacing={3}>
                            <Controls.Input
                                variant="outlined"
                                label="Mã tài xế"
                                value={values.id}
                                onChange={handleInputChange}
                            />

                            <Controls.Input
                                variant="outlined"
                                label="Họ Tên"
                                value={values.name}
                                onChange={handleInputChange}
                            />

                            <Controls.Input
                                variant="outlined"
                                label="Điện thoại"
                                value={values.phone}
                                onChange={handleInputChange}
                            />

                            <Controls.Input
                                variant="NoPlate"
                                label="Biển số xe"
                                value={values.phone}
                                onChange={handleInputChange}
                            />

                            <Grid item xs={6} >
                                <Controls.Select
                                    name="Nhóm Package"
                                    label="Loại xe"
                                    value={values.VehicleType}
                                    onChange={handleInputChange}
                                    options={UpdateService.motorcycle()}
                                />
                            </Grid>

                            <Controls.Input
                                variant="outlined"
                                label="Tên tài khoản"
                                value={values.accountId}
                                onChange={handleInputChange}
                            />
                            <Controls.Input
                                variant="outlined"
                                label="Mã nhà bếp"
                                value={values.kitchenID}
                                onChange={handleInputChange}
                            />

                            <Controls.RadioGroup
                                name="Status"
                                label="Trạng thái"
                                value={values.status}
                                onChange={handleInputChange}
                                items={Status} />

                        </Stack>
                    </Grid>
                    <Grid item xs={8} display="right" marginTop="2%">
                        <Box sx={{ float: "right", width: "40%" }}>
                            <Paper backgroundColor='red'>
                                <InputImg />
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>

            </Box>

            <Box>
                <Stack width="20%" justifyContent="center" marginLeft={"40%"} marginTop={"2%"}>
                    <ColorButton variant="contained">Gửi yêu cầu</ColorButton>
                </Stack>
            </Box>

        </Paper >

    );
}




