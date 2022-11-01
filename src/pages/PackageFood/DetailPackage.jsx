import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Dialog, DialogContent, DialogTitle, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import {
  callAPIgetCatePackage,
  callAPIgetFoodbyGroupFoodId,
  callAPIgetGroupFood,
  callAPIgetTimeFrame,
} from "./../../redux/action/acction";
import PageHeader from "../../components/PageHeader";

import API from "./../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import { useFormik } from "formik";
import * as yup from "yup";

import Controls from "./../../components/Control/Controls";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import DateTime from "../../components/Control/DateTime";
import Stack from "@mui/material/Stack";
import { width } from "@mui/system";
import jwt_decode from "jwt-decode";

export default function DetailPackage(props) {
  const { OpenPopUpDetail, SetOpenPopUpDetail, id } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const [value, setValue] = useState();

  const [input, setInput] = useState([]);

  const [groupfood, setGroupFood] = useState([]);

  const [bit, setBit] = useState([]);
  const [packageItems, setPackageItems] = useState([]);

  const [valueStarTime, setValueStarTime] = React.useState(new Date());

  const [valueEndTime, setValueEndtime] = React.useState(new Date());

  const [prices, setPrices] = useState([]);

  const Input = styled("input")({
    display: "none",
  });
  //formData để lưu data
  const formData = new FormData();
  const [packageItem, setPackageItem] = useState([]);

  const handleClose = () => {
    SetOpenPopUpDetail(false);
  };

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
  React.useEffect(() => {
    const getTimeFrame = async () => {
      dispatch(await callAPIgetTimeFrame(token));
      dispatch(await callAPIgetCatePackage(token));
      dispatch(await callAPIgetGroupFood(token));
    };
    getTimeFrame();
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
      setPackageItems(res.data.result?.packageItem);
    });
  }, [dispatch, id, token, handClickTimeFrame]);

  const getGroupfood = useSelector((state) => {
    return state.userReducer.listGroupFood;
  });
  const listfood = useSelector((state) => {
    return state.userReducer.listFoodByGroupFoodID;
  });
  const category = useSelector((state) => {
    return state.userReducer.listCategoryPackage;
  });
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
  const getcategoryOptions = () => {
    const CategoryData = [];
    for (var i = 0; i < category.length; i++) {
      CategoryData.push({ id: category[i].id, title: category[i].name });
    }
    return CategoryData;
  };
  const handleChangeGroupFood = (e, count) => {
    let arrayfood = [];
    let pricearray = [];
    const a = getGroupfood.find((c) => c.id === e.target.value);
    const data = [...packageItem];
    const index = data.findIndex((item) => item.itemCode === count);
    data[index].foodGroup.id = a.id;

    setPackageItem(data);
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
  });
  // console.log(formik);
  // console.log(formik.handleSubmit());
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
  const handlegetPackageItems = () => {
    let arrayItem = [];
    for (let index = 0; index < packageItems.length; index++) {
      API(
        "GET",
        URL_API + `/package-item/${packageItems.id}`,
        null,
        token
      ).then((res) => {
        arrayItem.push(res.data.result);
        console.log(res.data.result);
      });
    }
  };

  const binding = () => {
    let array = [];
    for (let index = 0; index < bit.length; index++) {
      const element = bit[index];
      if (element === "1") {
        array.push(
          <Box
            sx={{
              marginTop: "2rem",
              marginLeft: "19%",
            }}
          >
            <Controls.Select
              name="foodGroupID"
              label={handleLabel(index + 1)}
              width="20rem"
              defaultValue="undefined"
              value={handlegetPackageItems()}
              onChange={(e) => handleChangeGroupFood(e, index + 1)}
              onBlur={formik.handleBlur}
              options={getGroupFoodOptions()}
            />
          </Box>
        );
      }
    }
    return array;
  };

  return (
    <Paper>
      <Dialog
        open={OpenPopUpDetail}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "90%",
            maxHeight: 600,
          },
        }}
      >
        <DialogTitle>
          <PageHeader
            title="Xem chi tiết gói ăn"
            subTitle={`Món có trong gói ${formik.values.name}`}
            icon={<img src={input} alt="hih" height={90} width={120} />}
          />
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: "background.paper",
              m: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Grid
                container
                spacing={2.5}
                sx={{ marginLeft: "3%", marginTop: "1%", marginBottom: "2%" }}
              >
                <Grid item xs={6}>
                  <Controls.Input
                    variant="outlined"
                    name="name"
                    label="Tên"
                    width="12rem"
                    disabled
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
                    width="12rem"
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
                    width="12rem"
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
                    width="12rem"
                    label="Số địa điểm giao hàng"
                    name="totalStation"
                    disabled
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
                    width="12rem"
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
                    disabled
                    width="12rem"
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
                    width="12rem"
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
                    width="12rem"
                    disabled
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
                    label="Chọn loại package"
                    width="12rem"
                    disabled
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
                  <Box>
                    <Controls.Select
                      name="timeFrameID"
                      label="Chọn khung thời gian"
                      width="12rem"
                      disabled
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
                </Grid>
                <Grid item xs={6}>
                  <Controls.TextArea
                    width="12rem"
                    variant="outlined"
                    placeholder="Mô tả"
                    name="description"
                    disabled
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
          </Box>
          <ButtonCustomize
            nameButton="Thêm món"
            marginTop="1.5rem"
            marginLeft="8rem"
            width="12rem"
            component={RouterLink}
            to={`${location.pathname}/updatefood/${id}`}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
