import React, { useCallback } from "react";
import { Paper, Stack, Button } from "@mui/material";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import * as yup from "yup";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import Controls from "./../../components/Control/Controls";

import { FormHelperText } from "@mui/material";

import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import PageHeader from "../../components/PageHeader";
import Iconify from "./../../components/hook-form/Iconify";
import { useState } from "react";
import {
  callAPIgetCatePackage,
  callAPIgetTimeFrame,
  getAPIgetGroupFoodByStatus,
} from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import { URL_API } from "./../../Axios/URL_API/URL";
import API from "../../Axios/API/API";
import ButtonCustomize from "../../components/Button/ButtonCustomize";

import DatePicker from "../../components/Control/DatePicker";
import NewSchedule from "./NewSchedule";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên").trim(),
  price: yup
    .number()
    .moreThan(0, "giá phải lớn hơn ko")
    .required("Vui lòng nhập lại giá"),
  totalMeal: yup.string().required("Vui lòng nhập bữa ăn").trim(),
  description: yup.string().required("Vui lòng nhập mô tả").trim(),
  totalDate: yup.string().required("Vui lòng nhập tổng ngày").trim(),
});

export default function NewPackage() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  //xử lí hình ảnh
  const [input, setInput] = useState([]);

  const dispatch = useDispatch();

  const [valueStarTime, setValueStarTime] = React.useState(new Date());

  const [valueEndTime, setValueEndtime] = React.useState(new Date());

  const Input = styled("input")({
    display: "none",
  });

  const packageItem = useSelector((state) => {
    return state.userReducer.packageItem;
  });
  //formData để lưu data
  const formData = new FormData();

  const token = localStorage.getItem("token");
  const bindingPackageItem = useCallback(() => {
    const array = [];
    const setTotalDate = new Set();
    for (const item of packageItem) {
      for (const i of item.lessons) {
        if (i.value) {
          if (!setTotalDate.has(item.day)) {
            setTotalDate.add(item.day);
          }
          array.push({
            label: i.namel + " " + item.day,
            value: "",
            day: item.day,
          });
        }
      }
    }

    formik.setFieldValue("totalDate", setTotalDate.size.toString());
    formik.setFieldValue("totalMeal", array.length.toString());
    setArrayBinding(array);
  }, [packageItem]);

  React.useEffect(() => {
    const getTimeFrame = async () => {
      await dispatch(callAPIgetTimeFrame(token));
      await dispatch(callAPIgetCatePackage(token));
      await dispatch(getAPIgetGroupFoodByStatus(token));
    };
    getTimeFrame();
    if (packageItem.length > 0) {
      bindingPackageItem();
    }
  }, [dispatch, token, bindingPackageItem, packageItem.length]);

  const category = useSelector((state) => {
    return state.userReducer.listCategoryPackage;
  });

  const getGroupfood = useSelector((state) => {
    return state.userReducer.listGroupFoodByStatus;
  });

  const getGroupFoodOptions = () => {
    const groupFoodData = [];
    for (var i = 0; i < getGroupfood.length; i++) {
      groupFoodData.push({
        id: getGroupfood[i].id,
        title: getGroupfood[i].name,
      });
    }
    return groupFoodData;
  };

  const handleDate = (time) => {
    const a = new Date(time).toLocaleDateString().split("/");
    // if (a[0] < 10) {
    //   if (a[1] < 10) {
    //     return `${a[2]}-0${a[1]}-0${a[0]}`;
    //   } else if (a[1] > 10) {
    //     return `${a[2]}-${a[1]}-${a[0]}`;
    //   }
    // } else if (a[0] > 10) {
    //   return `${a[2]}-${a[1]}-${a[0]}`;
    // }
    if (a[0] < 10 && a[1] < 10) {
      return `${a[2]}-0${a[1]}-0${a[0]}`;
    } else if (a[0] > 10 && a[1] > 10) {
      return `${a[2]}-${a[1]}-${a[0]}`;
    } else if (a[0] > 10 && a[1] < 10) {
      return `${a[2]}-0${a[1]}-${a[0]}`;
    } else if (a[0] < 10 && a[1] > 10) {
      return `${a[2]}-${a[1]}-0${a[0]}`;
    }
  };

  const getcategoryOptions = () => {
    const CategoryData = [];
    for (var i = 0; i < category.length; i++) {
      CategoryData.push({ id: category[i].id, title: category[i].name });
    }
    return CategoryData;
  };
  // xử lí onchange groupfood
  const [prices, setPrices] = useState([]);
  const handleChangeGroupFood = (e) => {
    let pricearray = [];
    // const a = getGroupfood.find((c) => c.id === e.target.value);
    API("GET", URL_API + `/food-groups/find/${e.target.value}`, null, token)
      .then((res) => {
        let arrayfood = [];
        arrayfood = res.data.result.foods;
        for (let index = 0; index < arrayfood.length; index++) {
          pricearray.push(arrayfood[index].price);
        }
        var priceMorthan = Math.max.apply(Math, pricearray);
        const a = [...prices];
        a.push(priceMorthan);
        formik.setFieldValue(
          "price",
          a.reduce((accumulator, item) => accumulator + item),
          0
        );
        setPrices(a);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const itemCode = (data) => {
    if (data.includes("Sáng")) {
      return 0;
    }
    if (data.includes("Trưa")) {
      return 1;
    }
    if (data.includes("Chiều")) {
      return 2;
    }
  };
  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      price: "",
      totalMeal: "",
      totalDate: "",
      startSale: "",
      endSale: "",
      description: "",
      image: null,
      GroupFoodID: "",
      // abc: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      formData.append("image", formik.values.image);
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("totalMeal", formik.values.totalMeal);
      formData.append("totalDate", formik.values.totalDate);
      formData.append("endSale", handleDate(valueEndTime));
      formData.append("startSale", handleDate(valueStarTime));
      formData.append("categoryID", formik.values.categoryID);

      try {
        // if (endDate > startDate) {
        const res = await API("POST", URL_API + "/packages", formData, token);
        const arrayPromise = [];
        for (let index = 0; index < arrayBinding.length; index++) {
          const format = arrayBinding[index].day.split("/");
          arrayPromise.push(
            API(
              "POST",
              URL_API + "/package-item",
              {
                itemCode: itemCode(arrayBinding[index].label),
                packageID: res.data.result.id,

                foodGroupID: arrayBinding[index].value,
                deliveryDate: `${format[2]}-${format[1]}-${format[0]}`,
              },
              token
            )
          );
        }
        await Promise.all(arrayPromise);

        CustomizedToast({
          message: `Đã thêm món ${formik.values.name}`,
          type: "SUCCESS",
        });
      } catch (error) {
        CustomizedToast({
          message: "Thêm gói ăn không thành công",
          type: "ERROR",
        });
      }
    },
  });
  const [arrayBinding, setArrayBinding] = useState([]);

  function _treat(e) {
    formik.setFieldValue("image", e.target.files[0]);

    setInput(URL.createObjectURL(e.target.files[0]));
  }

  const getIcon = (name) => <Iconify icon={name} width={24} height={24} />;
  return (
    <Paper>
      <PageHeader
        title="Thiết kế gói ăn"
        subTitle="Vui lòng điền đầy đủ thông tin"
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
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.price}
                  </FormHelperText>
                )}
              </Grid>
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Controls.Select
                    name="categoryID"
                    label="Chọn loại gói ăn"
                    id="categoryID"
                    width="86%"
                    value={formik.values.categoryID}
                    cd
                    onChange={(e) => {
                      const a = category.find((c) => c.id === e.target.value);
                      formik.setFieldValue("categoryID", a.id);
                    }}
                    onBlur={formik.handleBlur}
                    options={getcategoryOptions()}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Controls.TextArea
                  variant="outlined"
                  label="Mô tả"
                  placeholder="Mô tả"
                  name="description"
                  width="85%"
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
                ></Box>
                <ButtonCustomize
                  variant="outlined"
                  width="12rem"
                  onClick={() => SetOpenPopUp(true)}
                  nameButton="Tạo khung thời gian"
                />
              </Grid>
              <Box sx={{ marginLeft: "12rem" }}>
                {arrayBinding.length > 0 &&
                  arrayBinding.map((item, index) => {
                    return (
                      <Box
                        sx={{
                          marginTop: "2rem",
                          marginLeft: "55%",
                          boxShadow: "8%",
                        }}
                      >
                        <Controls.Select
                          name="packageItem"
                          label={item.label}
                          width="20rem"
                          defaultValue="undefined"
                          value={item.value}
                          onChange={(e) => {
                            const tmp = [...arrayBinding];
                            const data = tmp.find((a) => {
                              return a.label === item.label;
                            });
                            data.value = e.target.value;
                            handleChangeGroupFood(e);
                            setArrayBinding(tmp);
                          }}
                          onBlur={formik.handleBlur}
                          options={getGroupFoodOptions()}
                        />
                      </Box>
                    );
                  })}
              </Box>
            </Grid>
            <Box>
              <Stack width="200px" mt={"4%"} mb={"1rem"} marginLeft="70%">
                <ButtonCustomize
                  variant="contained"
                  type="submit"
                  nameButton="Xác Nhận"
                />
              </Stack>
            </Box>
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
                  Tải hình...
                </Button>
                {/* css button input img */}
                <Box
                  sx={{
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    marginTop: "10%",
                    marginRight: "10%",
                  }}
                >
                  {/* hiển thị hình lên  */}
                  {input != null ? (
                    <img src={input} alt="" />
                  ) : (
                    <img src={formik.values.image} alt="" />
                  )}
                </Box>
              </label>
            </Paper>
          </Box>
        </form>
      </Box>
      <NewSchedule OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
    </Paper>
  );
}
