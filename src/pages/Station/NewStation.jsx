import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from '../../components/hook-form/Iconify';


import Button from "@mui/material/Button";
import UseCreateForm from "../../components/PopUp/useForm";
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


//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
//validate
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { callAPIgetListCategory, callAPIgetListStation } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import { FormHelperText } from "@material-ui/core";
import { useState } from "react";

const initialValue = {
    id: 0,
    stationName: "",
    stationAddress: "",
    createDate: "",

    updateDate: new Date(),

    description: "",

    img: "",
    isActive: false,

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

//callAPIforCreateStation========================================
const schema = yup.object().shape({
    name: yup.string().required().trim(),
    address: yup.string().required().trim(),
    opentime: yup.string().required().trim(),
    closetime: yup.string().required().trim(),
    status: yup.string().required().trim(),
});

//callAPIforCreateStation========================================
export default function NewStation() {
    //callAPIforCreateStation========================================
    const dispatch = useDispatch();
    React.useEffect(() => {
        const getlistStation = async () => {
            await dispatch(callAPIgetListStation());
        };
        getlistStation();
    }, [dispatch]);

    const station = useSelector((state) => {
        return state.userReducer.listStation;
    });

    const Input = styled("input")({
        display: "none",
    });
    //xử lí hình ảnh
    const [input, setInput] = useState([]);
    //formData để lưu data
    const formData = new FormData();
    const formik = useFormik({
        //gắn schema để so sánh
        validationSchema: schema,
        validateOnMount: true,
        validateOnBlur: true,
        //khởi tạo kho để bỏ data vào
        initialValues: {
            name: "",
            price: "",
            description: "",
            foodCategoryId: "",
            image: null,
        },

        onSubmit: async (values) => {
            formData.append("image", formik.values.image);
            formData.append("name", formik.values.name);
            formData.append("address", formik.values.address);
            formData.append("opentime", formik.values.opentime);
            formData.append("closetime", formik.values.closetime);
            formData.append("status", formik.values.status);
            //gọi API để đẩy data xuống
            const res = await API("POST", URL_API + "/stations", formData);
        },
    });

    function _treat(e) {
        const { files } = e.target;
        let images = [];
        const selecteds = [...[...files]];
        formik.setFieldValue("image", e.target.files[0]);
        return (
            selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
            formData.append("File", selecteds),
            setInput(images)
        );
    }

    //callAPIforCreateStation========================================

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
                title="Thêm địa điểm"
                subTitle="Đồ ăn đến rồi, đồ ăn đến rồi!!!"
                icon={getIcon('emojione-monotone:pot-of-food')}
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
                                label="Địa điểm"
                                value={values.stationName}
                                onChange={handleInputChange}
                            />

                            <Controls.Input
                                variant="outlined"
                                label="Địa chỉ"
                                value={values.stationAddress}
                                onChange={handleInputChange}
                            />

                            <Box sx={{ padding: "0" }}>
                                <Grid container spacing={3} columns={24}>
                                    <Grid item xs={10.35}>
                                        <Item><LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker

                                                label="Mở cửa"
                                                value={value}
                                                onChange={handleChangeTime}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider></Item>
                                    </Grid>
                                    <Grid item xs={10.35}>
                                        <Item><LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                label="Đóng cửa"
                                                value={value}
                                                onChange={handleChangeTime}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider></Item>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* <Grid container spacing={4} columns={26}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker

                                        label="Mở cửa"
                                        value={value}
                                        onChange={handleChangeTime}
                                        renderInput={(params) => <TextField {...params} sx={{ width: "40%" }} />}
                                    />
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Đóng cửa"
                                        value={value}
                                        onChange={handleChangeTime}
                                        renderInput={(params) => <TextField {...params} sx={{ width: "40%" }} />}
                                    />
                                </LocalizationProvider>

                            </Grid> */}

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
                    <ColorButton variant="contained" >Tạo địa điểm</ColorButton>
                </Stack>
            </Box>

        </Paper >

    );
}




