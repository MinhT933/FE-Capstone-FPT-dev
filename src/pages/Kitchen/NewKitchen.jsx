import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "../../components/hook-form/Iconify";

import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";

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
import {
    callAPIgetListCategory,
    callAPIgetListKitchen,
    callAPIgetListStation,
} from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
    phone: yup.string().required("Điền đầy đủ thông tin").trim(),
    password: yup.string().required("Điền đầy đủ thông tin").trim(),
    fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
    email: yup.string().required("Điền đầy đủ thông tin").trim(),
    address: yup.string().required("Điền đầy đủ thông tin").trim(),
    ability: yup.string().required("Điền đầy đủ thông tin").trim(),

});

//callAPIforCreateStation========================================
export default function NewKitchen() {
    //callAPIforCreateStation========================================
    const navigate = useNavigate();

    const dispatch = useDispatch();
    React.useEffect(() => {
        const getlistStation = async () => {
            await dispatch(callAPIgetListKitchen());
        };
        getlistStation();
    }, []);

    const Input = styled("input")({
        display: "none",
    });
    //xử lí hình ảnh

    // const token = localStorage.getItem("token");
    const Navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (token === null) {
        Navigate("/");
    }
    try {
        var decoded = jwt_decode(token);
        // valid token format
    } catch (error) {
        // return <Navigate to="/" replace />;
        Navigate("/");
    }
    // const decoded = jwt_decode(token);

    //formData để lưu data

    const formik = useFormik({
        //gắn schema để so sánh
        validationSchema: schema,
        validateOnMount: true,
        validateOnBlur: true,
        //khởi tạo kho để bỏ data vào
        initialValues: {
            phone: "",
            password: "",
            fullName: "",
            email: "",
            address: "",
            ability: "",
        },

        onSubmit: async (values) => {
            const data = {
                phone: formik.values.phone,
                password: formik.values.password,
                fullName: formik.values.fullName,
                email: formik.values.email,
                address: formik.values.address,
                ability: formik.values.ability,
            };
            try {
                const res = await API("POST", URL_API + "/auths/register/kitchen", data, token);
                if (res) {
                    CustomizedToast({
                        message: `Đã thêm ${formik.values.fullName}`,
                        type: "SUCCESS",
                    });
                }
                navigate("/dashboard/admin/kitchen");
            } catch (error) {
                CustomizedToast({ message: "Thêm thất bại", type: "ERROR" });
            }
        },
    });

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        // padding: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.secondary,
    }));


    return (
        <Paper
            elevation={3}
            sx={{
                padding: "2%",
                marginBottom: "10%",
                margin: "2%",
            }}
        >
            <PageHeader
                display="left"
                title="Thêm địa điểm"
                subTitle="Vui lòng điền đầy đủ thông tin"
                icon={getIcon("mdi:chef-hat")}
            />
            <form onSubmit={formik.handleSubmit}>
                <Box
                    //   space-around="space-around"
                    // sx={{ float: "right", width: "60%", flexGrow: 1 }}
                    display="flex"
                    justifyContent="left"
                    alignItems="left"
                    sx={{ marginLeft: "33%" }}
                >
                    <Grid container spacing={4} columns={20}>
                        <Grid item xs={12}>
                            <Stack spacing={3}>

                                <Controls.Input
                                    variant="outlined"
                                    label="Tên bếp"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.fullName && formik.errors.fullName && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.fullName}
                                    </FormHelperText>
                                )}

                                <Controls.Input
                                    variant="outlined"
                                    label="Điện thoại"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.phone}
                                    </FormHelperText>
                                )}

                                <Controls.Input
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.email}
                                    </FormHelperText>
                                )}

                                <Controls.Input
                                    variant="outlined"
                                    label="Địa chỉ"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.address}
                                    </FormHelperText>
                                )}

                                <Controls.Input
                                    variant="outlined"
                                    label="Công suất"
                                    name="ability"
                                    value={formik.values.ability}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.ability && formik.errors.ability && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.ability}
                                    </FormHelperText>
                                )}

                                <Controls.Input
                                    variant="outlined"
                                    label="Mật khẩu"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.password}
                                    </FormHelperText>
                                )}

                            </Stack>
                        </Grid>

                    </Grid>
                </Box>

                <Box>
                    <Stack
                        width="20%"
                        justifyContent="center"
                        marginLeft={"40%"}
                        marginTop={"2%"}
                    >
                        <ButtonCustomize nameButton="Thêm bếp" type="submit" />
                    </Stack>
                </Box>
            </form>
        </Paper>
    );
}
