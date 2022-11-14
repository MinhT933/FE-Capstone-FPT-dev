import React, { useState } from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";


import { FormHelperText, Grid } from "@mui/material";
import Box from "@mui/material/Box";
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
import { callAPIAdminCreateShipper } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//time
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";

import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";


//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

//callAPIAdminCreateShipper=================================
const schema = yup.object().shape({
  fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
  phone: yup.string().required("Điền đầy đủ thông tin").trim(),
  noPlate: yup.string().required("Điền đầy đủ thông tin").trim(),
  vehicleType: yup.string().required("Điền đầy đủ thông tin").trim(),
});
//callAPIAdminCreateShipper=================================

export default function NewShipper() {
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
      const data = {
        fullName: formik.values.fullName,
        phone: formik.values.phone,
        noPlate: formik.values.noPlate,
        password: formik.values.password,
        email: formik.values.email,
        vehicleType: formik.values.vehicleType,
        DOB: setValueStarTime(formik.values.DOB),
      };
      // formData.append("image", formik.values.image);
      // formData.append("fullName", formik.values.fullName);
      // formData.append("phone", formik.values.phone);
      // formData.append("noPlate", formik.values.noPlate);
      // formData.append("vehicleType", formik.values.vehicleType);
      //gọi API để đẩy data xuống
      try {
        const res = await API(
          "POST",
          URL_API + "/auths/register/shipper",
          data,
          token
        );
        CustomizedToast({
          message: `Đã thêm tài xế ${formik.values.fullName}`,
          type: "SUCCESS",
        });
        // window.location.reload(true);
      } catch (error) {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      }
    },
  });

  const [valueStarTime, setValueStarTime] = React.useState(
    dayjs("2022-10-23T21:11:5")
  );

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
        icon={getIcon("emojione-v1:double-exclamation-mark")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          space-around="space-around"
          // sx={{ float: "right", width: "60%", flexGrow: 1 }}
          display="flex"
          justifyContent="left"
          alignItems="left"
          sx={{ marginLeft: "25%" }}
        >
          <Grid container spacing={4} columns={20}>
            <Grid item xs={8} marginLeft="10%">
              <Stack spacing={3}>
                <Controls.Input
                  variant="outlined"
                  name="fullName"
                  label="Họ Tên"
                  width="24rem"
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

                <TextField
                  type={values.showPass ? "text" : "password"}
                  name="password"
                  // sx={{'.css-r0m7rw-MuiInputBase-root-MuiOutlinedInput-root: 20rem'}}
                  sx={{ width: "24rem" }}
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

                <Controls.Input
                  variant="outlined"
                  name="email"
                  width="24rem"
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
                  name="phone"
                  label="Điện thoại"
                  width="24rem"
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

                <Controls.DatePicker
                  label="Ngày tháng năm sinh"
                  width="28rem"
                  inputFormat="DD-MM-YYYY"
                  value={valueStarTime}
                  onChange={(e) => {
                    setValueStarTime(e);
                  }}
                />

                <Controls.Input
                  variant="outlined"
                  name="noPlate"
                  label="Biển số xe"
                  width="24rem"
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
                  width="24rem"
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
          <ButtonCustomize
            nameButton="Thêm tài xế"
            type="submit"
            marginLeft="45%"
            marginTop="2%"
          />
        </Box>
      </form>
    </Paper>
  );
}
