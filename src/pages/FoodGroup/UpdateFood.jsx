import { Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import Controls from "../../components/Control/Controls";
import PageHeader from "../../components/PageHeader";
import Stack from "@mui/material/Stack";
//validate
import { useFormik } from "formik";
import * as yup from "yup";
import Card from "@mui/material/Card";

import Iconify from "../../components/hook-form/Iconify";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { useParams } from "react-router-dom";
import API from "../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import CardHeader from "@mui/material/CardHeader";
import { useDispatch } from "react-redux";
import {
  callAPIgetFoodbyGroupFoodId,
  callAPIgetListFood,
  callAPIgetListFoodActive,
} from "../../redux/action/acction";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import { SET_VALUE_TAG } from "../../redux/PathAction";
import FormHelperText from "@mui/material/FormHelperText";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng điền đày đủ thông tin").trim(),
  description: yup.string().required("Vui lòng điền đày đủ thông tin").trim(),
});

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function UpdateFood() {
  const token = localStorage.getItem("token");
  let { id } = useParams();
  const dispatch = useDispatch();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // const food = [];
  const [active, setActive] = useState([]);
  React.useEffect(() => {
    API("GET", URL_API + `/food-groups/find/${id}`, null, token)
      .then((res) => {
        formik.setFieldValue("name", res.data.result.name);
        formik.setFieldValue("description", res.data.result.description);
        formik.setFieldValue("totalFood", res.data.result.totalFood);
      })

      .catch((err) => {});
  }, []);

  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      await dispatch(callAPIgetFoodbyGroupFoodId(id, token));
      await dispatch(callAPIgetListFoodActive(token));
    };
    getfoodByFoodGroupId();
  }, [dispatch, id, token]);

  const listfood = useSelector((state) => {
    return state.userReducer.listFoodByGroupFoodID;
  });
  // console.log(listfood.foods.id);

  const listFoodSelectbox = useSelector((state) => {
    return state.userReducer.listFoodActive;
  });
  console.log(listFoodSelectbox);
  // const handleActive = () => {
  //   let arr = [];
  //   for (let index = 0; index < listFoodSelectbox.length; index++) {
  //     if (listFoodSelectbox.status === "active") {
  //       console.log("hihi");
  //     }
  //   }
  //   return arr;
  // };
  // console.log(active);

  const valueTag = useSelector((state) => {
    return state.userReducer.valueTag;
  });

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    const a = listFoodSelectbox.find((c) => c.id === value);

    dispatch({
      type: SET_VALUE_TAG,
      payload: typeof value === "string" ? value.split(",") : value,
    });
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      description: "",
      totalFood: "",
      foodIds: [],
    },
    onSubmit: async (values) => {
      const a = [];
      for (const i of valueTag) {
        const arr = listFoodSelectbox.filter((item) => item.name === i);

        if (arr.length > 0) {
          a.push(arr[0].id);
        }
      }
  
      const data = {
        name: formik.values.name,
        description: formik.values.description,
        totalFood: formik.values.totalFood,
        foodIds: a,
      };

      try {
        const res = await API(
          "PUT",
          URL_API + `/food-groups/${id}`,
          data,
          token
        );
        CustomizedToast({
          message: `Đã Cập nhập ${formik.values.name}`,
          type: "SUCCESS",
        });
      } catch (error) {
        CustomizedToast({
          message: "Vui lòng xem lại thông tin",
          type: "ERROR",
        });
      }
    },
  });

  return (
    <Paper>
      <PageHeader
        title="Thêm thức ăn vào nhóm thực phầm"
        subTitle="Thêm và điều chỉnh thông tin"
        icon={getIcon("emojione-monotone:pot-of-food")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1.5} sx={{ marginLeft: "28%" }}>
          <Grid item xs={12}>
            <Controls.Input
              variant="outlined"
              label="Tên nhóm"
              name="name"
              width="27.5rem"
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
                {formik.errors.description}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controls.Input
              variant="outlined"
              label="Số lượng"
              name="totalFood"
              width="27.5rem"
              value={formik.values.totalFood}
              onChange={(e) => {
                formik.handleChange(e);
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
          <Grid item xs={12}>
            <div>
              <FormControl sx={{ width: "27.5rem" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Chọn Thức ăn
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple={true}
                  value={valueTag}
                  onChange={(e) => handleChange(e)}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {listFoodSelectbox.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      <Avatar alt="food" src={item.image} />
                      <Checkbox checked={valueTag.indexOf(item.name) > -1} />
                      <ListItemText primary={item.name}>
                        {item.price}
                      </ListItemText>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Controls.TextArea
              variant="outlined"
              placeholder="Mô tả"
              value={formik.values.description}
              name="description"
              width="27.5rem"
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
        </Grid>
        <Stack
          spacing={2}
          direction="row"
          sx={{ marginLeft: "25rem", marginTop: "2rem", paddingBottom: "2rem" }}
        >
          <ButtonCustomize nameButton="Thêm" type="submit" width="16rem" />
        </Stack>
      </form>
    </Paper>
  );
}
