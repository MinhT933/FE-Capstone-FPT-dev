import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

import ButtonCustomize from "../../components/Button/ButtonCustomize";

import Iconify from "../../components/hook-form/Iconify";

import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";

//time
import dayjs from "dayjs";
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
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
    // fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
    // phone: yup.string().required("Điền đầy đủ thông tin").trim(),
    // email: yup.string().required("Điền đầy đủ thông tin").trim(),
    // password: yup.string().required("Điền đầy đủ thông tin").trim(),
    fullName: yup.string().required("").trim(),
    phone: yup.string().required("").trim(),
    email: yup.string().required("").trim(),
    password: yup.string().required("").trim(),
});

//callAPIforCreateStation========================================
export default function NewAdmin() {
    const [values, setValues] = useState({
        phone: "",
        password: "",
        showPass: false,
    });
    const handlePassVisibilty = () => {
        setValues({
            ...formik.values.password,
            showPass: !values.showPass,
        });
    };

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
        <Paper title="Quản trị viên"
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
                icon={getIcon("ic:round-manage-accounts")}
            />
            <form onSubmit={formik.handleSubmit}>
                <Box
                    //   space-around="space-around"
                    // sx={{ float: "right", width: "60%", flexGrow: 1 }}
                    display="flex"
                    justifyContent="left"
                    alignItems="left"
                    sx={{ marginLeft: "30%", marginTop: "2%", }}
                >
                    <Grid container spacing={4} columns={20}>
                        <Grid item xs={12} >
                            <Stack spacing={3}>
                                <Controls.TextField
                                    // type="fullName"
                                    fullWidth
                                    name="fullName"
                                    label="Họ tên"
                                    placeholder="Họ tên"
                                    variant="outlined"
                                    required
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

                                <Controls.TextField
                                    type='number'
                                    fullWidth
                                    name="phone"
                                    label="Điện thoại"
                                    placeholder="Điện thoại"
                                    variant="outlined"

                                    required
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

                                <Controls.TextField
                                    type="email"
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    variant="outlined"
                                    required

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


                                <TextField
                                    type={values.showPass ? "text" : "password"}
                                    name="password"
                                    // sx={{'.css-r0m7rw-MuiInputBase-root-MuiOutlinedInput-root: 20rem'}}
                                    // sx={{ width: "24rem" }}
                                    fullWidth
                                    label="Mật khẩu"
                                    placeholder="Mật khẩu"
                                    variant="outlined"
                                    required
                                    value={formik.values.password}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handlePassVisibilty}
                                                    aria-label="toggle password"
                                                    edge="end"
                                                >
                                                    {values.showPass ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
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
                        <ButtonCustomize nameButton="Thêm tài khoản" type="submit" />
                    </Stack>
                </Box>
            </form>
        </Paper>
    );
}
