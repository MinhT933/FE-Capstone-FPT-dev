import React from "react";
import { Paper, Stack, Button } from "@mui/material";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import * as yup from "yup";

import Controls from "./../../components/Control/Controls";

import { FormHelperText } from "@mui/material";

import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import PageHeader from "../../components/PageHeader";
import Iconify from "./../../components/hook-form/Iconify";
import { useState } from "react";
import { callAPIgetTimeFrame } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import { URL_API } from "./../../Axios/URL_API/URL";
import API from "../../Axios/API/API";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewTimeFrame from "./NewTimeFrame";

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  price: yup.string().required().trim(),
  totalStation: yup.string().required().trim(),
  totalMeal: yup.string().required().trim(),
  description: yup.string().required().trim(),
  totalDate: yup.string().required().trim(),
  timeFrameID: yup.string().required().trim(),
  totalFood: yup.string().required().trim(),
});

//styles paper
const useStyles = styled("Paper")(({ theme }) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(9),
  },
}));

export default function NewPackage() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  //xử lí hình ảnh
  const [input, setInput] = useState([]);

  const dispatch = useDispatch();

  const [valueStarTime, setValueStarTime] = React.useState(
    dayjs("2022-10-18T21:11:5")
  );

  const [valueEndTime, setValueEndtime] = React.useState(
    dayjs("2022-10-18T21:11:5")
  );

  const Input = styled("input")({
    display: "none",
  });
  //formData để lưu data
  const formData = new FormData();
  const now = new Date().toLocaleDateString();

  React.useEffect(() => {
    const getTimeFrame = async () => {
      await dispatch(callAPIgetTimeFrame());
    };
    getTimeFrame();
  }, [dispatch]);

  const timeframe = useSelector((state) => {
    return state.userReducer.listTimeFrame;
  });

  const getTimeFrameOptions = () => {
    const TimeFrameData = [];
    for (var i = 0; i < timeframe.length; i++) {
      TimeFrameData.push({ id: timeframe[i].id, title: timeframe[i].name });
    }
    return TimeFrameData;
  };

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      price: "",
      totalStation: "",
      totalMeal: "",
      startSale: "",
      endSale: "",
      description: "",
      timeFrameID: "",
      image: null,
      totalFood: "",
    },

    onSubmit: async (values) => {
      const a = new Date(valueEndTime).toLocaleDateString().split("/");
      const b = new Date(valueStarTime).toLocaleDateString().split("/");
      console.log(b);

      formData.append("image", formik.values.image);
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("totalStation", formik.values.totalStation);
      formData.append("totalMeal", formik.values.totalMeal);
      formData.append("totalDate", formik.values.totalDate);
      formData.append("endSale", `${a[2]}-${a[1]}-${a[0]}`);
      formData.append("startSale", `0${b[2]}-${b[1]}-${b[0]}`);
      formData.append("timeFrameID", formik.values.timeFrameID);
      formData.append("totalFood", formik.values.totalFood);

      try {
        const res = await API("POST", URL_API + "/packages", formData);
        CustomizedToast({
          message: `Đã thêm món ${formik.values.name}`,
          type: "SUCCESS",
        });
        window.location.reload(true);
      } catch (error) {
        CustomizedToast({ message: "thấp bại rồi", type: "ERROR" });
      }
    },
  });

  function _treat(e) {
    formik.setFieldValue("image", e.target.files[0]);

    setInput(URL.createObjectURL(e.target.files[0]));
  }

  const getIcon = (name) => <Iconify icon={name} width={24} height={24} />;
  return (
    <Paper>
      <PageHeader
        title="Thiết ké gói ăn"
        subTitle="Điền các thông tin  "
        icon={getIcon("ant-design:setting-filled")}
      />

      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "background.paper",
          m: 1,
          display: "flex",
          justifyContent: "center",
          boxShadow: 12,
          marginTop: "3%",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ float: "left", width: "60%" }}>
            <Grid
              container
              spacing={2.5}
              sx={{ marginLeft: "6%", marginTop: "1%", marginBottom: "2%" }}
            >
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  name="name"
                  label="Tên"
                  value={formik.values.name || ""}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <FormHelperText
                    error={false}
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  label="Giá"
                  name="price"
                  value={formik.values.price}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <FormHelperText
                    error={false}
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.price}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  label="Tổng số thức ăn"
                  name="totalFood"
                  value={formik.values.totalFood}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.totalFood && formik.errors.totalFood && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.totalFood}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  label="Các địa điểm giao hàng"
                  name="totalStation"
                  value={formik.values.totalStation}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.totalStation && formik.errors.totalStation && (
                  <FormHelperText
                    error={false}
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.totalMeal}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  label="Tổng buổi"
                  name="totalMeal"
                  value={formik.values.totalMeal}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.totalMeal && formik.errors.totalMeal && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.totalMeal}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controls.DatePicker
                  variant="outlined"
                  name="startSale"
                  label="Ngày mở bán"
                  value={valueStarTime}
                  onChange={(e) => {
                    setValueStarTime(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.totalMeal && formik.errors.totalMeal && (
                  <FormHelperText
                    error={false}
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.totalMeal}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  label="Tổng ngày"
                  name="totalDate"
                  value={formik.values.totalDate}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.totalDate && formik.errors.totalDate && (
                  <FormHelperText
                    error={false}
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.totalDate}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <Controls.DatePicker
                  variant="outlined"
                  name="endSale"
                  label="Ngày kết thúc bán"
                  value={valueEndTime}
                  onChange={(e) => {
                    setValueEndtime(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.endSale && formik.errors.endSale && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.endSale}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box>
                    <Controls.Select
                      name="timeFrameID"
                      label="Chọn khung thời gian"
                      width="13rem"
                      value={formik.values.timeFrameID}
                      onChange={(e) => {
                        const a = timeframe.find(
                          (c) => c.id === e.target.value
                        );
                        formik.setFieldValue("timeFrameID", a.id);
                      }}
                      onBlur={formik.handleBlur}
                      options={getTimeFrameOptions()}
                    />
                    {formik.touched.timeFrameID && formik.errors.timeFrameID && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-username-login"
                      >
                        {formik.errors.timeFrameID}
                      </FormHelperText>
                    )}
                  </Box>
                  <Box
                    sx={{ mr: "20%", height: "15%", width: "15%", mt: "3%" }}
                  >
                    <IconButton
                      onClick={() => {
                        SetOpenPopUp(true);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Controls.TextArea
                  variant="outlined"
                  placeholder="Mô tả"
                  name="description"
                  value={formik.values.description}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <FormHelperText
                    error={false}
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.description}
                  </FormHelperText>
                )}
              </Grid>
              <Box>
                <Stack width="200px" mt={"2rem"} ml={"24rem"} mb={"1rem"}>
                  <ButtonCustomize
                    variant="contained"
                    type="submit"
                    nameButton="Xác Nhận"
                  />
                </Stack>
              </Box>
            </Grid>
          </Box>
          <Box sx={{ float: "right", width: "30%", marginLeft: "10%" }}>
            <Paper
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
                  {input != null ? (
                    <img src={input} />
                  ) : (
                    <img src={formik.values.image} alt="hihi" />
                  )}
                </Box>
              </label>
            </Paper>
          </Box>
        </form>
      </Box>
      <NewTimeFrame OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
    </Paper>
  );
}

// function _treat(e) {
//   const { files } = e.target;
//   let images = [];
//   const selecteds = [...[...files]];
//   formik.setFieldValue("image", e.target.files[0]);
//   return (
//     selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
//     formData.append("File", selecteds),
//     setInput(images)
//   );
// }
