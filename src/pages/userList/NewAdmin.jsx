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
    callAPIgetAccountAdmin,
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
    fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
    phone: yup.string().required("Điền đầy đủ thông tin").trim(),
    email: yup.string().required("Điền đầy đủ thông tin").trim(),
    password: yup.string().required("Điền đầy đủ thông tin").trim(),
});

//callAPIforCreateStation========================================
export default function NewAdmin() {
    //callAPIforCreateStation========================================
    const dispatch = useDispatch();
    React.useEffect(() => {
        const getlistStation = async () => {
            await dispatch(callAPIgetAccountAdmin());
        };
        getlistStation();
    }, []);

    const Input = styled("input")({
        display: "none",
    });
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

    const formik = useFormik({
        //gắn schema để so sánh
        validationSchema: schema,
        validateOnMount: true,
        validateOnBlur: true,
        //khởi tạo kho để bỏ data vào
        initialValues: {

            fullName: "",
            phone: "",
            email: "",
            password: "",
        },

        onSubmit: async (values) => {
            const data = {
                fullName: formik.values.fullName,
                phone: formik.values.phone,
                email: formik.values.email,
                password: formik.values.password,
            };
            try {
                const res = await API("POST", URL_API + "/auths/register/admin", data, token);
                CustomizedToast({
                    message: `Đã thêm ${formik.values.fullName}`,
                    type: "SUCCESS",
                });
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
                title="Thêm tài khoản quản trị"
                subTitle="Vui lòng điền đầy đủ thông tin"
                icon={getIcon("emojione-monotone:pot-of-food")}
            />
            <form onSubmit={formik.handleSubmit}>
                <Box
                    //   space-around="space-around"
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
                                    label="Họ tên"
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
                        <Grid item xs={8} display="right" marginTop="2%">
                            {/* <Box sx={{ float: "right", width: "40%" }}>
               
              </Box> */}
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
                        <ButtonCustomize nameButton="Thêm tài khoản" type="submit" />
                    </Stack>
                </Box>
            </form>
        </Paper>
    );
}
