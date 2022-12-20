import React from "react";
import { Paper, Stack, Button } from "@mui/material";

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
import NewTimeFrame from "./NewTimeFrame";
import NewCate from "./newCate";
import DatePicker from "../../components/Control/DatePicker";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên").trim(),
  price: yup
    .number()
    .moreThan(0, "giá phải lớn hơn ko")
    .required("Vui lòng nhập lại giá"),
  // totalStation: yup.string().required("nhập tổng số đỉa điểm giao").trim(),
  totalMeal: yup.string().required("Vui lòng nhập bữa ăn").trim(),
  description: yup.string().required("Vui lòng nhập mô tả").trim(),
  totalDate: yup.string().required("Vui lòng nhập tổng ngày").trim(),
  timeFrameID: yup.string().required().trim(),
  totalFood: yup.string().required("Vui lòng nhập tổng số thức ăn").trim(),
});

export default function NewPackage() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [OpenPopUpCate, SetOpenPopUpCate] = useState(false);
  //xử lí hình ảnh
  const [input, setInput] = useState([]);

  const dispatch = useDispatch();

  const [groupfood, setGroupFood] = useState([]);

  const [value, setValue] = useState();

  const [valueStarTime, setValueStarTime] = React.useState(new Date());

  const [valueEndTime, setValueEndtime] = React.useState(new Date());

  const [indexFitel, setIndexFitel] = useState("");

  const Input = styled("input")({
    display: "none",
  });

  //formData để lưu data
  const formData = new FormData();

  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const getTimeFrame = async () => {
      await dispatch(callAPIgetTimeFrame(token));
      await dispatch(callAPIgetCatePackage(token));
      await dispatch(getAPIgetGroupFoodByStatus(token));
    };
    getTimeFrame();
  }, [dispatch, token]);

  const timeframe = useSelector((state) => {
    return state.userReducer.listTimeFrame;
  });

  const category = useSelector((state) => {
    return state.userReducer.listCategoryPackage;
  });

  const getGroupfood = useSelector((state) => {
    return state.userReducer.listGroupFoodByStatus;
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
    return groupFoodData;
  };

  const handleDate = (time) => {
    const a = new Date(time).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-${a[1]}-0${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
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
  const handleChangeGroupFood = (e, count) => {
    let arrayfood = [];
    let pricearray = [];
    const a = getGroupfood.find((c) => c.id === e.target.value);
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
    setGroupFood([...groupfood, { [e.target.name]: a.id, count }]);
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
      startSale: "",
      endSale: "",
      description: "",
      timeFrameID: "",
      image: null,
      totalFood: "",
      GroupFoodID: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      formData.append("image", formik.values.image);
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      // formData.append("totalStation", formik.values.totalStation);
      formData.append("totalStation", 3);
      formData.append("totalMeal", formik.values.totalMeal);
      formData.append("totalDate", formik.values.totalDate);
      formData.append("endSale", handleDate(valueEndTime));
      formData.append("startSale", handleDate(valueStarTime));
      formData.append("timeFrameID", formik.values.timeFrameID);
      formData.append("totalFood", formik.values.totalFood);
      formData.append("categoryID", formik.values.categoryID);

      try {
        // if (endDate > startDate) {
        const res = await API("POST", URL_API + "/packages", formData, token);
        const arrayPromise = [];
        for (let index = 0; index < groupfood.length; index++) {
          arrayPromise.push(
            API(
              "POST",
              URL_API + "/package-item",
              {
                itemCode: groupfood[index].count,
                packageID: res.data.result.id,
                timeFrameID: formik.values.timeFrameID,
                foodGroupID: groupfood[index].GroupID,
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

  const [bit, setBit] = useState([]);

  const handClickTimeFrame = (id) => {
    API("GET", URL_API + `/time-frame/${id}`, null, token)
      .then((res) => {
        let filter = res.data.result.dateFilter;
        setIndexFitel(filter);
        const count = 3;
        const temp = [];
        let data = [];
        data = [...filter];
        for (let index = 0; index < data.length; index += count) {
          let slice = data.slice(index, index + count);
          temp.push(slice);
        }
        setBit(temp);
      })
      .catch((err) => {});
  };

  //hàm check buổi
  const handlelession = (index) => {
    let text = "";
    let arrayText = [];
    switch (index) {
      case 0:
        text = "Sáng";
        arrayText.push(text);
        break;
      case 1:
        text = "Trưa";
        arrayText.push(text);
        break;
      case 2:
        text = " Chiều ";
        arrayText.push(text);
        break;
      default:
        break;
    }
    return arrayText;
  };

  //==============================================================================

  const binding = () => {
    let dayOfweek = "";
    let arrayText = [];
    let array = [];

    for (let index = 0; index < bit.length; index++) {
      const element = bit[index];
      const childArr = [];
      for (let a = 0; a < element.length; a++) {
        //checked xem thứ nào ( index = 0 là thứ 2)
        if (index === 0) {
          dayOfweek = "thứ 2";
          arrayText.push(dayOfweek);
          if (element[a] === "1") {
            childArr.push(
              <Box
                sx={{
                  marginTop: "2rem",
                  marginLeft: "55%",
                  boxShadow: "8%",
                }}
              >
                <Controls.Select
                  name="GroupID"
                  label={[handlelession(a) + " " + dayOfweek]}
                  width="20rem"
                  defaultValue="undefined"
                  value={value}
                  onChange={(e) => handleChangeGroupFood(e, index * 3 + a + 1)}
                  onBlur={formik.handleBlur}
                  options={getGroupFoodOptions()}
                />
              </Box>
            );
          }
        }
        if (index === 1) {
          //110 ==> code 4 5
          dayOfweek = "thứ 3";
          arrayText.push(dayOfweek);
          if (element[a] === "1") {
            childArr.push(
              <Box
                sx={{
                  marginTop: "2rem",
                  marginLeft: "55%",
                }}
              >
                <Controls.Select
                  name="GroupID"
                  label={[handlelession(a) + " " + dayOfweek]}
                  width="20rem"
                  defaultValue="undefined"
                  value={value}
                  onChange={(e) => handleChangeGroupFood(e, index * 3 + a + 1)}
                  onBlur={formik.handleBlur}
                  options={getGroupFoodOptions()}
                />
              </Box>
            );
          }
        }

        if (index === 2) {
          dayOfweek = "thứ 4";
          arrayText.push(dayOfweek);
          if (element[a] === "1") {
            childArr.push(
              <Box
                sx={{
                  marginTop: "2rem",
                  marginLeft: "55%",
                }}
              >
                <Controls.Select
                  name="GroupID"
                  value={value}
                  label={[handlelession(a) + " " + dayOfweek]}
                  width="20rem"
                  defaultValue="undefined"
                  onChange={(e) => handleChangeGroupFood(e, index * 3 + a + 1)}
                  onBlur={formik.handleBlur}
                  options={getGroupFoodOptions()}
                />
              </Box>
            );
          }
        }
        if (index === 3) {
          dayOfweek = "thứ 5";
          arrayText.push(dayOfweek);
          if (element[a] === "1") {
            childArr.push(
              <Box
                sx={{
                  marginTop: "2rem",
                  marginLeft: "55%",
                }}
              >
                <Controls.Select
                  name="GroupID"
                  value={value}
                  label={[handlelession(a) + " " + dayOfweek]}
                  width="20rem"
                  defaultValue="undefined"
                  onChange={(e) => handleChangeGroupFood(e, index * 3 + a + 1)}
                  onBlur={formik.handleBlur}
                  options={getGroupFoodOptions()}
                />
              </Box>
            );
          }
        }
        if (index === 4) {
          dayOfweek = "thứ 6";
          arrayText.push(dayOfweek);
          if (element[a] === "1") {
            childArr.push(
              <Box
                sx={{
                  marginTop: "2rem",
                  marginLeft: "55%",
                }}
              >
                <Controls.Select
                  name="GroupID"
                  value={value}
                  label={[handlelession(a) + " " + dayOfweek]}
                  width="20rem"
                  defaultValue="undefined"
                  onChange={(e) => handleChangeGroupFood(e, index * 3 + a + 1)}
                  onBlur={formik.handleBlur}
                  options={getGroupFoodOptions()}
                />
              </Box>
            );
          }
        }
        if (index === 5) {
          dayOfweek = "thứ 7 ";
          arrayText.push(dayOfweek);
          if (element[a] === "1") {
            childArr.push(
              <Box
                sx={{
                  marginTop: "2rem",
                  marginLeft: "55%",
                }}
              >
                <Controls.Select
                  name="GroupID"
                  value={value}
                  label={[handlelession(a) + " " + dayOfweek]}
                  width="20rem"
                  defaultValue="undefined"
                  onChange={(e) => handleChangeGroupFood(e, index * 3 + a + 1)}
                  onBlur={formik.handleBlur}
                  options={getGroupFoodOptions()}
                />
              </Box>
            );
          }
        }
      }
      array.push({ childArray: childArr });
    }
    // console.log(array);
    return array;
  };

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
                >
                  <Controls.Select
                    name="timeFrameID"
                    label="Chọn khung thời gian"
                    // m={1}
                    width="86%"
                    maxWidth="85%"
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
              <Box sx={{ marginLeft: "12rem" }}>
                {binding().map((item) => {
                  return (
                    <>
                      {item.childArray.map((a) => {
                        return a;
                      })}
                    </>
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
                  Tải lên...
                </Button>
                {/* css button input img */}
                <Box
                  sx={{
                    // height: 165,
                    // width: 165,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    marginTop: "10%",
                    marginRight: "10%",
                    // objectFit: "cover",
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
      <NewCate
        OpenPopUpCate={OpenPopUpCate}
        SetOpenPopUpCate={SetOpenPopUpCate}
      />
      <NewTimeFrame OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
    </Paper>
  );
}
