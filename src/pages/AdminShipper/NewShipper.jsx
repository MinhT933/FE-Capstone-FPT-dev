import React, { useState } from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { styled } from "@mui/material/styles";
import { FormHelperText, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import Iconify from "../../components/hook-form/Iconify";
//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import ButtonCustomize from "../../components/Button/ButtonCustomize";

//validate
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import {
  callAPIAdminCreateShipper,
  callAPIgetListCategory,
} from "./../../redux/action/acction";
import { useDispatch } from "react-redux";

//time
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Paper from "@mui/material/Paper";
import { MarginRounded } from "@mui/icons-material";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
});
//callAPIAdminCreateShipper=================================

export default function NewShipper() {
  //callAPIAdminCreateShipper=================================
  const dispatch = useDispatch();
  //khởi tạo lần đầu gọi thằng getlist cate để nó hiện thị lên selectbox ô select của tao á
  // ctr+ click chuột vào callAPIgetListCategory để xem nó cách callAPI getlistCateFood no giống y chan
  //call Food list vậy thay vị đổ vào bảng thì mình đỗ vào selectbox
  React.useEffect(() => {
    const createShipper = async () => {
      await dispatch(callAPIAdminCreateShipper());
    };
    createShipper();
    //disparch để kết thúc vào lặp vô tận loop infinity á
  }, [dispatch]);
  
  //kéo data categoriesFood từ store zìa mà xài nè
  const shipper = useSelector((state) => {
    return state.userReducer.shipper;
  });

  /// get list options để hiển thị lên ô selectbox
  const getOptions = () => {
    //tạo mảng rỗng để chứa data ở đây là name và id của categoriesFood
    //hình dung nó giống nhà kho vậy á
    // sau này trước khi muốn gọi cái gì đó phải tọa 1 mảng rỗng để bỏ vào
    const item = [];
    // vòng food này để đẩy data từ categoriesFood v ào trong items ( vì nó có nhiều object) nên phải làm vậy
    for (var i = 0; i < shipper.length; i++) {
      item.push({ id: shipper[i].id, title: shipper[i].name });
    }

    return item;
    //trả về item đã có data muốn biết thì console.log ra mà xem
  };

  const Input = styled("input")({
    display: "none",
  });
  //xử lí hình ảnh
  const [input, setInput] = useState([]);
  //formData để lưu data
  const formData = new FormData();

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

  //selected dùng để lí ảnh

  //dùng use formik để validate giá trị nhập vào
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
      image: null,
    },

    //onSubmit ngay từ cái tên đầu nó dùng đẩy data xuống BE
    onSubmit: async (values) => {
      //formdata.append gg.com => nôm na à đẩy giá trị vào formdata có key là 1 chuỗi
      //value là formik.values.(something you want ) nó giống như muốn vào nhà ai đó thì phải biết tên m trước
      //sau đó mới biết về bản thân m sau nôm na vậy đó hi vọng m hiểu
      formData.append("image", formik.values.image);
      formData.append("fullName", formik.values.fullName);
      formData.append("phone", formik.values.phone);
      formData.append("noPlate", formik.values.noPlate);
      formData.append("vehicleType", formik.values.vehicleType);
      //gọi API để đẩy data xuống
      try {
        const res = await API(
          "POST",
          URL_API + "/auths/register/shipper",
          formData,
          token
        );
        CustomizedToast({
          message: `Đã thêm tài xế ${formik.values.fullName}`,
          type: "SUCCESS",
        });
        window.location.reload(true);
      } catch (error) { }
    },
  });

  //cái này là sử lí image t box bỏ qua bên kia t xử lí khó quá nên t gôm bỏ zo đây T.T
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
  //callAPIAdminCreateShipper=================================
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

        // marginTop: "2%",
        // marginLeft: "5%",
        // MarginRounded: "4%"
      }}
    >
      <PageHeader
        display="left"
        title="Thêm tài xế "
        subTitle="Vui lòng điền đầy đủ thông tin."
        icon={getIcon('emojione-v1:double-exclamation-mark')}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          space-around="space-around"
          // sx={{ float: "right", width: "60%", flexGrow: 1 }}
          display="flex"
          justifyContent="left"
          alignItems="left"
          sx={{ marginLeft: "6%" }}>
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

                {/* <Grid item xs={6} >
                                    <Controls.Select
                                        name="vehicleType"
                                        label="Loại xe"
                                        value={formik.values.vehicleType}
                                        onChange={(e) => {
                                            // formik.handleChange(e);
                                            // map tên với adi hiện thị name nhưng chọn ẩn ở dưới là id
                                            const a = shipper.find(
                                                (c) => c.id === e.target.value
                                            );
                                            formik.setFieldValue("shipper", a.id);
                                        }}
                                        onBlur={formik.handleBlur}
                                        //getOption để lấy giá trị category
                                        options={getOptions()}
                                    />
                                </Grid> */}

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

                {/* <Controls.Input
                                    variant="outlined"
                                    label="Tên tài khoản"
                                    value={formik.accountId}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                /> */}

                {/* <Controls.Input
                                    variant="outlined"
                                    label="Mã nhà bếp"
                                    value={formik.kitchenID}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                /> */}
              </Stack>
            </Grid>

            <Box sx={{ float: "left", width: "40%", mt: "2rem", ml: "5rem" }}>
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
                    marginLeft: "20%",
                  }}
                >
                  Tải lên...
                </Button>
                {/* css button input img */}
                <Box
                  sx={{
                    height: 165,
                    width: 165,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    marginTop: "10%",
                    boxShadow: 8,
                    marginLeft: "11%",
                  }}
                >
                  {/* hiển thị hình lên  */}
                  {input.map((i) => (
                    <img key={i} src={i} alt="hihi" />
                  ))}
                </Box>
              </label>
            </Box>
          </Grid>
        </Box>

        <Box>
          <ButtonCustomize
            nameButton="Thêm tài xế"
            type="submit"
            marginLeft="45%"
            marginTop="2%"
          />
        </Box>
      </form>
    </Paper >
  );
}
