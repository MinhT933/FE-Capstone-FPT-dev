import React from "react";
import { Paper } from "@mui/material";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import * as yup from "yup";
import Controls from "./../../components/Control/Controls";
import { FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import PageHeader from "../../components/PageHeader";
import Iconify from "./../../components/hook-form/Iconify";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { callAPIgetTimeFrame } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { Stack } from "@mui/system";

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  price: yup.string().required().trim(),
  totalStation: yup.string().required().trim(),
  totalMeal: yup.string().required().trim(),
  startSale: yup.string().required().trim(),
  endSale: yup.string().required().trim(),
  description: yup.string().required().trim(),
  totalDate: yup.string().required().trim(),
  timeFrameID: yup.string().required().trim(),
});

//styles paper
const useStyles = styled("Paper")(({ theme }) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(9),
  },
}));

export default function EditPackage() {
  let { id } = useParams();

  const navigate = useNavigate();
  //xử lí hình ảnh
  const [input, setInput] = useState([]);

  const dispatch = useDispatch();

  const Input = styled("input")({
    display: "none",
  });
  //formData để lưu data
  const formData = new FormData();

  // React.useEffect(() => {
  //   const getTimeFrame = async () => {
  //     await dispatch(callAPIgetTimeFrame());
  //   };
  //   API("GET", URL_API + '')
  //   getTimeFrame();
  // }, [dispatch]);

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
    },

    onSubmit: async (values) => {
      formData.append("image", formik.values.image);
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("totalStation".formik.values.totalStation);
      formData.append("totalMeal".formik.values.totalMeal);
      formData.append("totalDate".formik.values.totalDate);
      formData.append("endSale".formik.values.endSale);
      formData.append("startSale".formik.values.startSale);
      formData.append("timeFrameID".formik.values.timeFrameID);
      try {
        //console.log(values)
        CustomizedToast({
          message: `Đã Cập nhật ${formik.values.name}`,
          type: "SUCCESS",
        });
        navigate("/dashboard/admin/package");
      } catch (e) {
        CustomizedToast({ message: "cập nhập thất bại", type: "ERROR" });
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
                    console.log(event);
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
                  label="Tổng Số Station"
                  name="totalStation"
                  value={formik.values.totalStation}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
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
              </Grid>
              <Grid item xs={6}>
                <Controls.DatePicker
                  variant="outlined"
                  name="startSale"
                  label="ngày mở bán"
                  value={formik.values.startSale}
                  onChange={(e) => {
                    console.log(e);
                    formik.handleChange(e);
                  }}
                />
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
                />
              </Grid>

              <Grid item xs={6}>
                <Controls.DatePicker
                  variant="outlined"
                  name="Ngày kết thúc bán"
                  label="EndSale"
                  value={formik.values.endSale}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Select
                  name="timeFrameID"
                  label="Loại"
                  // defaultValue={categoriesFood[0].name}

                  value={formik.values.timeFrameID}
                  onChange={(e) => {
                    // map tên với adi hiện thị name nhưng chọn ẩn ở dưới là id
                    const a = timeframe.find((c) => c.id === e.target.value);
                    formik.setFieldValue("timeFrameID", a.id);
                  }}
                  onBlur={formik.handleBlur}
                  //getOption để lấy giá trị category
                  options={getTimeFrameOptions()}
                />
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
                />
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
    </Paper>
  );
}
