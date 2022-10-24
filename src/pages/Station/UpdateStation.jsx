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
    callAPIgetListStation,
} from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate, useParams } from "react-router-dom";

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
    name: yup.string().required("Điền đầy đủ thông tin").trim(),
    address: yup.string().required("Điền đầy đủ thông tin").trim(),
    phone: yup.string().required("Điền đầy đủ thông tin").trim(),


});

//callAPIforCreateStation========================================
export default function UpdateStation() {
    //callAPIforCreateStation========================================
    let { id } = useParams();

    const [input, setInput] = useState(null);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    const [openTime, setOpentime] = useState([dayjs("2022-10-18T21:11:5")]);
    const [closeTime, setClosetime] = useState([dayjs("2022-10-18T21:11:5")]);

    React.useEffect(() => {
        // const getlistStation = async () => {
        //     await dispatch(callAPIgetListStation(token));
        // };
        // getlistStation();

        console.log(id);

        API("GET", URL_API + `/stations/${id}`, null, token)
            .then((res) => {

                console.log(res);

                formik.setFieldValue("name", res.data.result.name);
                formik.setFieldValue("address", res.data.result.address);
                formik.setFieldValue("phone", res.data.result.phone);

                formik.setOpentime("openTime", res.data.result.openTime);
                formik.setClosetime("closeTime", res.data.result.closeTime);

                console.log(res.data.result.openTime);

                // formik.setFieldValue("openTime", res.data.result.openTime);
                // formik.setFieldValue("closeTime", res.data.result.closeTime);


            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const station = useSelector((state) => {
        return state.userReducer.listStation;
    });

    const Input = styled("input")({
        display: "none",
    });

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
            address: "",

            phone: "",
            openTime: "",
            closeTime: "",
        },

        onSubmit: async (values) => {
            console.log(values);
            const closeTimeSplit = new Date(closeTime).toTimeString().split(":");
            const openTimeSplit = new Date(openTime).toTimeString().split(":");
            const data = {
                name: formik.values.name,
                address: formik.values.address,
                phone: formik.values.phone,
                openTime: `${openTimeSplit[0]}:${openTimeSplit[1]}`,
                closeTime: `${closeTimeSplit[0]}:${closeTimeSplit[1]}`,
            };
            try {
                const res = await API("PUT", URL_API + `/stations/${id}`, data, token);

                if (res) {
                    CustomizedToast({
                        message: `Cập nhập ${formik.values.name} thành công`,
                        type: "SUCCESS",
                    });
                }
                navigate("/dashboard/admin/station");
            } catch (error) {
                console.log(error);
                CustomizedToast({ message: "Cập nhập thất bại", type: "ERROR" });
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
        <Paper title="Cập nhập trạm"
            elevation={3}
            sx={{
                padding: "2%",
                marginBottom: "10%",
                margin: "2%",
            }}
        >
            <PageHeader
                display="left"
                title="Cập nhập địa điểm"
                subTitle="Đồ ăn đến rồi, đồ ăn đến rồi!!!"
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
                                    label="Tên trạm"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-username-login"
                                    >
                                        {formik.errors.name}
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


                                <Controls.Input
                                    variant="outlined"
                                    label="Số điện thoại"
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

                                <Box sx={{ padding: "0" }}>
                                    <Grid container spacing={3} columns={24}>
                                        <Grid item xs={10.35}>
                                            <Item>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <TimePicker
                                                        label="Mở cửa"
                                                        name="openTime"
                                                        value={openTime}
                                                        onChange={(e) => {
                                                            setOpentime(e);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={10.35}>
                                            <Item>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <TimePicker
                                                        label="Đóng cửa"
                                                        name="closeTime"
                                                        value={closeTime}
                                                        onChange={(e) => {
                                                            setClosetime(e);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Item>
                                        </Grid>
                                    </Grid>
                                </Box>
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
                        <ButtonCustomize nameButton="Cập nhập" type="submit" />
                    </Stack>
                </Box>
            </form>
        </Paper>
    );
}

{
    /* <Paper
  sx={{
    marginBottom: "50%",
    paddingBottom: "10%",
    paddingTop: "8%",
    borderRadius: 4,
  }}
  >
  <label htmlFor="contained-button-file">
    <Input
      accept="image/*"
      id="contained-button-file"
      multiple
      type="file"
      onChange={_treat}
    />
    <Button
      variant="contained"
      component="span"
      sx={{
        marginLeft: "36%",
      }}
    >
      Tải lên...
    </Button>
    {/* css button input img */
}
//   <Box
//     sx={{
//       height: 165,
//       width: 165,
//       maxHeight: { xs: 233, md: 167 },
//       maxWidth: { xs: 350, md: 250 },
//       marginTop: "10%",
//       boxShadow: 8,
//       marginLeft: "11%",
//     }}
//   >
//     {/* hiển thị hình lên  */}
//     {input != null ? (
//       <img src={input} />
//     ) : (
//       <img src={formik.values.image} alt="hihi" />
//     )}
//   </Box>
// </label>
// </Paper> */}
