import React, { useState } from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { FormHelperText, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UseCreateForm from "../../components/PopUp/useForm";
import * as UpdateService from "../../utils/UpdateService/UpdateService";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import InputImg from './../../components/InputImg/inputImg';
import Iconify from '../../components/hook-form/Iconify';
//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import ButtonCustomize from "../../components/Button/ButtonCustomize";

//validate
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { callAPIAdminCreateShipper, callAPIgetListCategory, callAPIgetListShipper } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";

//time
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Paper from "@mui/material/Paper";
import { MarginRounded } from "@mui/icons-material";



const useStyles = styled((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(9),
    },
}));


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

//callAPIAdminCreateShipper=================================
const schema = yup.object().shape({
    fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
    phone: yup.string().required("Điền đầy đủ thông tin").trim(),
    noPlate: yup.string().required("Điền đầy đủ thông tin").trim(),
    vehicleType: yup.string().required("Điền đầy đủ thông tin").trim(),
    email: yup.string().required("Điền đầy đủ thông tin").trim(),
    // avatar: yup.string().required("Điền đầy đủ thông tin").trim(),
    password: yup.string().required("Điền đầy đủ thông tin").trim(),
    DOB: yup.string().required("Điền đầy đủ thông tin").trim(),

});
//callAPIAdminCreateShipper=================================
export default function NewShipper() {

    //callAPIAdminCreateShipper=================================
    const dispatch = useDispatch();
    React.useEffect(() => {
        const getlistShipper = async () => {
            await dispatch(callAPIgetListShipper());
        };
        getlistShipper();
        //dispatch để kết thúc vào lặp vô tận loop infinity 
    }, []);

    const Input = styled("input")({
        display: "none",
    });
    //xử lí hình ảnh
    const [input, setInput] = useState([]);
    const token = localStorage.getItem("token");

    //formData để lưu data
    const formData = new FormData();

    const formik = useFormik({
        //gắn schema để so sánh
        validationSchema: schema,
        validateOnMount: true,
        validateOnBlur: true,
        //khởi tạo kho để bỏ data vào
        initialValues: {

            fullName: "",
            phone: "",
            noPlate: "",
            vehicleType: "",
            email: "",
            // avatar: null,
            password: "",
            DOB: "",

        },

        onSubmit: async (values) => {
            console.log(values);

            const data = {
                fullName: formik.values.fullName,
                phone: formik.values.phone,
                noPlate: formik.values.noPlate,
                vehicleType: formik.values.vehicleType,
                email: formik.values.email,
                // avatar: formik.values.avatar,
                password: formik.values.password,
                DOB: formik.values.DOB,
            };
            try {
                const res = await API("POST", URL_API + "/auths/register/shipper", data, token);
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
    function _treat(e) {
        const { files } = e.target;
        let images = [];
        const selecteds = [...[...files]];
        formik.setFieldValue("avatar", e.target.files[0]);
        return (
            selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
            formData.append("File", selecteds),
            setInput(images)
        );
    }


    return (

        <Paper elevation={3} sx={{
            padding: "2%", marginBottom: "10%", margin: "2%"

            // marginTop: "2%",
            // marginLeft: "5%",
            // MarginRounded: "4%"
        }}>
            <PageHeader
                display="left"
                title="Thêm tài xế "
                subTitle="Đồ ăn đến rồi, đồ ăn đến rồi!!!"
                icon={getIcon('emojione-v1:double-exclamation-mark')}
            />
            <form onSubmit={formik.handleSubmit}>
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
                                    name="fullName"
                                    label="Họ Tên"

                                    value={formik.values.fullName || ""}

                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {/* nếu sai thì nó đỏ */}
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
                                    name="password"
                                    label="Mật khẩu"

                                    value={formik.values.password || ""}

                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {/* nếu sai thì nó đỏ */}
                                {formik.touched.password && formik.errors.password && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.password}
                                    </FormHelperText>
                                )}


                                <Controls.Input
                                    variant="outlined"
                                    name="DOB"
                                    label="Ngày sinh"

                                    value={formik.values.DOB || ""}

                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {/* nếu sai thì nó đỏ */}
                                {formik.touched.DOB && formik.errors.DOB && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.DOB}
                                    </FormHelperText>
                                )}


                                <Controls.Input
                                    variant="outlined"
                                    name="phone"
                                    label="Điện thoại"

                                    value={formik.values.phone || ""}

                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {/* nếu sai thì nó đỏ */}
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
                                    name="email"
                                    label="Email"

                                    value={formik.values.email || ""}

                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {/* nếu sai thì nó đỏ */}
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
                                    name="noPlate"
                                    label="Biển số xe"

                                    value={formik.values.noPlate || ""}

                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {/* nếu sai thì nó đỏ */}
                                {formik.touched.noPlate && formik.errors.noPlate && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.noPlate}
                                    </FormHelperText>
                                )}

                                <Controls.Input
                                    variant="outlined"
                                    name="vehicleType"
                                    label="Loại xe"

                                    value={formik.values.vehicleType}

                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {/* nếu sai thì nó đỏ */}
                                {formik.touched.vehicleType && formik.errors.vehicleType && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.vehicleType}
                                    </FormHelperText>
                                )}

                            </Stack>
                        </Grid>


                    </Grid>
                </Box>

                <Box>
                    <ButtonCustomize nameButton="Thêm tài xế" type="submit" marginLeft="45%" marginTop="2%" />
                </Box>
            </form>
        </Paper >
    );
}




