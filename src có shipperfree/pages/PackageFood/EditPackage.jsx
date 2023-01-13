import React from "react";
import { Paper } from "@mui/material";
import * as moment from "moment";
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
import {
  callAPIgetCatePackage,
  callAPIgetTimeFrame,
  getAPIgetGroupFoodByStatus,
} from "../../redux/action/acction";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { Stack } from "@mui/system";
import dayjs from "dayjs";

import DatePicker from "./../../components/Control/DatePicker";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên").trim(),
  price: yup
    .number()
    .moreThan(0, "Giá phải lớn hơn ko")
    .required("Vui lòng nhập lại giá"),
  // totalStation: yup.string().required("nhập tổng số đỉa điểm giao").trim(),
  totalMeal: yup.string().required("Vui lòng nhập bữa ăn").trim(),
  description: yup.string().required("Vui lòng nhập mô tả").trim(),
  totalDate: yup.string().required("Vui lòng nhập tổng ngày").trim(),
  timeFrameID: yup.string().required().trim(),
  totalFood: yup.string().required("Vui lòng nhập tổng số thức ăn").trim(),
});

//styles paper
const useStyles = styled("Paper")(({ theme }) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(9),
  },
}));

// const token = localStorage.getItem("token");

export default function EditPackage() {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  let { id } = useParams();

  const [input, setInput] = useState([]);

  const dispatch = useDispatch();

  const [valueStarTime, setValueStarTime] = React.useState(
    dayjs("2022-10-26T21:11:5")
  );

  const [valueEndTime, setValueEndtime] = React.useState(
    dayjs("2022-10-26T21:11:5")
  );

  const Input = styled("input")({
    display: "none",
  });
  //formData để lưu data
  const formData = new FormData();
  const [packageItem, setPackageItem] = useState([]);
  React.useEffect(() => {
    const getTimeFrame = async () => {
      dispatch(await getAPIgetGroupFoodByStatus(token));
      dispatch(await callAPIgetTimeFrame(token));
      dispatch(await callAPIgetCatePackage(token));
      API("GET", URL_API + `/packages/find/${id}`, null, token).then((res) => {
        setInput(res.data.result.image);
        setPackageItem(res.data.result.packageItem);
        formik.setFieldValue("image", res.data.result.image);
        formik.setFieldValue("price", res.data.result.price);
        formik.setFieldValue("totalStation", res.data.result.totalStation);
        formik.setFieldValue("totalMeal", res.data.result.totalMeal);
        setValueStarTime(res.data.result.startSale);
        formik.setFieldValue("name", res.data.result.name);
        setValueEndtime(res.data.result.endSale);
        formik.setFieldValue("totalDate", res.data.result.totalDate);
        formik.setFieldValue("totalFood", res.data.result.totalFood);
        formik.setFieldValue("description", res.data.result.description);
        formik.setFieldValue("timeFrameID", res.data.result.timeFrame.id);
        handClickTimeFrame(res.data.result.timeFrame.id);
        formik.setFieldValue("categoryID", res.data.result.packageCategory.id);
      });
    };
    getTimeFrame();
  }, [dispatch, token, id]);
  /// làm sao chó nó chạy cùng 1 lúc
  const [bit, setBit] = useState([]);
  const handClickTimeFrame = (id) => {
    API("GET", URL_API + `/time-frame/${id}`, null, token)
      .then((res) => {
        let filter = res.data.result.dateFilter;
        let data = [];
        data = [...filter];
        setBit(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroupfood = useSelector((state) => {
    return state.userReducer.listGroupFoodByStatus;
  });
  const timeframe = useSelector((state) => {
    return state.userReducer.listTimeFrame;
  });
  const category = useSelector((state) => {
    return state.userReducer.listCategoryPackage;
  });

  const getTimeFrameOptions = () => {
    const TimeFrameData = [];
    for (var i = 0; i < timeframe.length; i++) {
      TimeFrameData.push({ id: timeframe[i].id, title: timeframe[i].name });
    }
    return TimeFrameData;
  };
  const getGroupFoodOptions = () => {
    const groupFoodData = [];
    for (var i = 0; i < getGroupfood.length; i++) {
      groupFoodData.push({
        id: getGroupfood[i].id,
        title: getGroupfood[i].name,
      });
    }
    // console.log(groupFoodData);
    return groupFoodData;
  };

  const getcategoryOptions = () => {
    const CategoryData = [];
    for (var i = 0; i < category.length; i++) {
      CategoryData.push({ id: category[i].id, title: category[i].name });
    }
    return CategoryData;
  };

  const handleDate = (time) => {
    const a = new Date(time).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-${a[1]}-0${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
  };

  ///========================Change PackageItem
  const handleChangeGroupFood = (e, idPackage) => {
    const indexUpdate = packageItem.findIndex((a) => a.id === idPackage);
    const packageItemUpdate = [...packageItem];
    packageItemUpdate[indexUpdate].foodGroup.id = e.target.value;
    setPackageItem(packageItemUpdate);
    // const index = data.findIndex((item) => item.itemCode === count);
    // data[index].foodGroup.id = a.id;
    const itemGroupFood = getGroupfood.find((c) => c.id === e.target.value);
    var priceMost = Math.max.apply(
      Math,
      itemGroupFood.foods.map((item) => item.price)
    );
    const result = +formik.values.price + priceMost;
    formik.setFieldValue("price", result);
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      price: "",
      // totalStation: "",
      totalMeal: "",
      totalDate: "",
      description: "",
      timeFrameID: "",
      image: null,
      totalFood: "",
      categoryID: "",
    },

    onSubmit: async (values) => {
      formData.append("image", formik.values.image);
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("totalStation", 3);
      formData.append("totalMeal", formik.values.totalMeal);
      formData.append("totalDate", formik.values.totalDate);
      formData.append("endSale", handleDate(valueEndTime));
      formData.append("startSale", handleDate(valueStarTime));
      formData.append("timeFrameID", formik.values.timeFrameID);
      formData.append("totalFood", formik.values.totalFood);
      formData.append("categoryID", formik.values.categoryID);

      // console.log(endDate > startDate);
      try {
        // if (endDate > startDate) {
        const res = await API(
          "PUT",
          URL_API + `/packages/update/${id}`,
          formData,
          token
        );
        const arrayPromise = [];
        for (let index = 0; index < packageItem.length; index++) {
          arrayPromise.push(
            API(
              "PUT",
              URL_API + `/package-item/${packageItem[index].id}`,
              {
                foodGroupID: packageItem[index].foodGroup.id,
              },
              token
            )
          );
        }
        await Promise.all(arrayPromise);

        CustomizedToast({
          message: `Đã chỉnh sửa ${formik.values.name}`,
          type: "SUCCESS",
        });
      } catch (error) {
        CustomizedToast({
          message: `Chỉnh sửa ${formik.values.name} không thành công`,
          type: "ERROR",
        });
      }
    },
  });

  function _treat(e) {
    formik.setFieldValue("image", e.target.files[0]);

    setInput(URL.createObjectURL(e.target.files[0]));
  }
  const handleLabel = (index) => {
    let a = "";
    switch (index) {
      case 1:
        a = "Sáng thứ 2";
        break;
      case 2:
        a = "Trưa thứ 2";
        break;
      case 3:
        a = "Chiều thứ 2";
        break;
      case 4:
        a = "Sáng thứ 3";
        break;
      case 5:
        a = "Trưa thứ 3";
        break;
      case 6:
        a = "Chiều thứ 3";
        break;
      case 7:
        a = "Sáng thứ 4";
        break;
      case 8:
        a = "Trưa thứ 4";
        break;
      case 10:
        a = "Chiều thứ 4";
        break;
      case 9:
        a = "Sáng thứ 5";
        break;
      case 11:
        a = "Trưa thứ 5";
        break;
      case 12:
        a = "Chiều thứ 5";
        break;
      case 13:
        a = "Sáng thứ 6";
        break;
      case 14:
        a = "Trưa thứ 6";
        break;
      case 15:
        a = "Chiều thứ 6";
        break;
      case 16:
        a = "Sáng thứ 7";
        break;
      case 17:
        a = "Trưa thứ 7";
        break;
      case 18:
        a = "Chiều thứ 7";
        break;

      default:
        break;
    }
    return a;
  };

  const handleItem = () => {
    let array = [];
    if (getGroupfood.length > 0) {
      if (packageItem.length > 0) {
        for (const item of packageItem) {
          array.push(
            <Box
              sx={{
                marginTop: "2rem",
                marginLeft: "55%",
              }}
            >
              <Controls.Select
                name="foodGroupID"
                label={handleLabel(item.itemCode)}
                width="20rem"
                value={getGroupfood.find((i) => i.id === item.foodGroup.id)?.id}
                onChange={(e) => handleChangeGroupFood(e, item.id)}
                onBlur={formik.handleBlur}
                options={getGroupFoodOptions()}
              />
            </Box>
          );
        }
      }
    }
    return array;
  };

  const getIcon = (name) => <Iconify icon={name} width={24} height={24} />;
  return (
    <Paper>
      <PageHeader
        title="Cập nhập gói ăn"
        subTitle="Điền các thông tin  "
        icon={getIcon("ant-design:setting-filled")}
      />
      <form onSubmit={formik.handleSubmit}>
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
                  value={formik.values.name}
                  onChange={(event) => {
                    formik.handleChange(event);
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
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  name="totalFood"
                  label="Tổng số thức ăn"
                  disabled
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
                  label="Giá"
                  name="price"
                  // disabled
                  value={formik.values.price}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.price}
                  </FormHelperText>
                )}
              </Grid>

              {/* <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  label="Số địa điểm giao hàng"
                  name="totalStation"
                  value={formik.values.totalStation}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.totalStation && formik.errors.totalStation && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.totalStation}
                  </FormHelperText>
                )}
              </Grid> */}
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  name="totalMeal"
                  label="Tổng buổi ăn"
                  disabled
                  value={formik.values.totalMeal}
                  onChange={(event) => {
                    formik.handleChange(event);
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
                <DatePicker
                  variant="outlined"
                  inputFormat="DD-MM-YYYY"
                  name="startSale"
                  label="Ngày mở bán"
                  width="100%"
                  value={valueStarTime}
                  onChange={(e) => {
                    setValueStarTime(e);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  name="totalDate"
                  label="Tổng ngày"
                  disabled
                  value={formik.values.totalDate}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.totalDate && formik.errors.totalDate && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.totalDate}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <DatePicker
                  variant="outlined"
                  name="endSale"
                  width="100%"
                  inputFormat="DD-MM-YYYY"
                  label="Ngày kết thúc bán"
                  value={valueEndTime}
                  onChange={(e) => {
                    setValueEndtime(e);
                  }}
                />
              </Grid>
              {/* ///categoryID */}

              <Grid item xs={6}>
                <Controls.Select
                  name="categoryID"
                  width="86%"
                  label="Chọn loại gói ăn"
                  value={formik.values.categoryID}
                  onChange={(e) => {
                    const a = category.find((c) => c.id === e.target.value);
                    formik.setFieldValue("categoryID", a.id);
                  }}
                  onBlur={formik.handleBlur}
                  options={getcategoryOptions()}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.TextArea
                  width="85%"
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
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.description}
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
                  <Controls.Select
                    name="timeFrameID"
                    label="Chọn khung thời gian"
                    width="86%"
                    maxWidth="85%"
                    disabled
                    value={formik.values.timeFrameID}
                    onChange={(e) => {
                      const a = timeframe.find((c) => c.id === e.target.value);
                      formik.setFieldValue(
                        "totalMeal",
                        a.dateFilter.split("").filter((i) => i === "1").length
                      );
                      formik.setFieldValue(
                        "totalDate",
                        a.name.split("-").length
                      );
                      formik.setFieldValue(
                        "totalFood",
                        a.dateFilter.split("").filter((i) => i === "1").length
                      );
                      formik.setFieldValue("timeFrameID", a.id);
                      handClickTimeFrame(a.id);
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
              </Grid>
              {handleItem().length > 0 &&
                handleItem().map((item) => {
                  return <>{item}</>;
                })}
              <Box>
                <Stack width="200px" mt={"2rem"} ml={"240%"} mb={"1rem"}>
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
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    marginTop: "10%",
                    // boxShadow: 8,
                    marginLeft: "1%",

                    // objectFit: "cover",
                  }}
                >
                  {input != null ? (
                    <img src={input} alt="hih" />
                  ) : (
                    <img src={formik.values.image} alt="hihi" />
                  )}
                </Box>
              </label>
            </Paper>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
