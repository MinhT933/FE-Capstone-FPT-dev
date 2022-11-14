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
import {
  callAPIgetCatePackage,
  callAPIgetTimeFrame,
  callAPIgetGroupFood,
  getAPIgetGroupFoodByStatus,
} from "../../redux/action/acction";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import DateTime from "./../../components/Control/DateTime";
import jwt_decode from "jwt-decode";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên").trim(),
  price: yup
    .number()
    .moreThan(0, "giá phải lớn hơn ko")
    .required("Vui lòng nhập lại giá"),
  totalStation: yup.string().required("nhập tổng số đỉa điểm giao").trim(),
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

  const [value, setValue] = useState();

  const [input, setInput] = useState([]);

  const [groupfood, setGroupFood] = useState([]);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

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
      await dispatch(getAPIgetGroupFoodByStatus(token));
      await dispatch(callAPIgetTimeFrame(token));
      await dispatch(callAPIgetCatePackage(token));
    };
    getTimeFrame();
    API("GET", URL_API + `/packages/find/${id}`, null, token).then((res) => {
      setInput(res.data.result.image);
      setPackageItem(res.data.result.packageItem);
      console.log(res.data.result.packageItem);
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
      // console.log(res.data.result.packageCategory.id);
    });
  }, [dispatch, token, id]);

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

  const [prices, setPrices] = useState([]);
  const handleChangeGroupFood = (e, count) => {
    let arrayfood = [];
    let pricearray = [];
    const a = getGroupfood.find((c) => c.id === e.target.value);
    const data = [...packageItem];
    const index = data.findIndex((item) => item.itemCode === count);
    data[index].foodGroup.id = a.id;

    API("GET", URL_API + `/food-groups/find/${a.id}`, null, token)
      .then((res) => {
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
    setGroupFood([...groupfood, { [e.target.name]: a.id }]);
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
      totalDate: "",
      description: "",
      timeFrameID: "",
      image: null,
      totalFood: "",
    },

    // `${a[2]}-${a[1]}-${a[0]}`
    // `0${b[2]}-${b[1]}-${b[0]}`
    onSubmit: async (values) => {
      console.log(values);
      const a = new Date(valueEndTime).toLocaleDateString().split("/");
      const b = new Date(valueStarTime).toLocaleDateString().split("/");
      // const startSale = valueStarTime.format("YYYY-MM-DD hh:mm:ss");
      // const endSale = valueEndTime.format("YYYY-MM-DD hh:mm:ss");
      // console.log(startSale, endSale);
      // console.log(startSale);

      // const startDate = new Date(valueStarTime).toLocaleDateString();
      // const endDate = new Date(valueEndTime).toLocaleDateString();
      formData.append("image", formik.values.image);
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("totalStation", formik.values.totalStation);
      formData.append("totalMeal", formik.values.totalMeal);
      formData.append("totalDate", formik.values.totalDate);
      formData.append("endSale", `${a[2]}-${a[1]}-${a[0]}`);
      formData.append("startSale", `${b[2]}-${b[1]}-${b[0]}`);
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
          message: `Đã thêm món ${formik.values.name}`,
          type: "SUCCESS",
        });

        window.location.reload(true);
        // } else if (endDate < startDate || endDate === startDate) {
        // CustomizedToast({ message: "vui lòng xem lại ngày ", type: "ERROR" });
        // }
      } catch (error) {
        CustomizedToast({ message: "Thấp bại rồi", type: "ERROR" });
        console.log(error);
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
  const handleItem = () => {
    if (getGroupfood.length > 0) {
      if (packageItem.length > 0) {
        for (const item of packageItem) {
          for (let index = 0; index < getGroupfood.length; index++) {
            const element = getGroupfood[index];
            if (element.id === item.foodGroup.id) {
              setPackageItem(
                [...packageItem].filter((hehe) => hehe.id !== item.id)
              );
              return element.id;
            }
          }
        }
      }
    }
  };
  console.log(handleItem());
  const binding = () => {
    // console.log(handleItem());
    let array = [];
    for (let index = 0; index < bit.length; index++) {
      const element = bit[index];
      if (element === "1") {
        // if (handleItem() !== undefined) {
        array.push(
          <Box
            sx={{
              marginTop: "2rem",
              marginLeft: "55%",
            }}
          >
            <Controls.Select
              name="foodGroupID"
              label={handleLabel(index + 1)}
              width="20rem"
              value={handleItem()}
              onChange={(e) => handleChangeGroupFood(e, index + 1)}
              onBlur={formik.handleBlur}
              options={getGroupFoodOptions()}
            />
          </Box>
        );
        // }
      }
    }
    return array;
  };
  // console.log(array);

  const getIcon = (name) => <Iconify icon={name} width={24} height={24} />;
  return (
    <Paper>
      <PageHeader
        title="Thiết ké gói ăn"
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
                  disabled
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
                <DateTime
                  variant="outlined"
                  name="startSale"
                  label="Ngày mở bán"
                  width="16rem"
                  // disablePast
                  value={valueStarTime}
                  onChange={(e) => {
                    setValueStarTime(e);
                    console.log(e);
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
                <DateTime
                  variant="outlined"
                  name="endSale"
                  label="Ngày kết thúc bán"
                  value={valueEndTime}
                  width="16rem"
                  onChange={(e) => {
                    setValueEndtime(e);
                  }}
                />
              </Grid>
              {/* ///categoryID */}
              <Grid item xs={6}>
                <Controls.Select
                  name="categoryID"
                  label="Chọn loại package"
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
                  width="16rem"
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
                </Box>
              </Grid>
              {binding().map((item) => {
                return <>{item}</>;
              })}
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
                    // height: "100%",
                    // width: "100%",
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    marginTop: "10%",
                    // boxShadow: 8,
                    marginLeft: "11%",

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
