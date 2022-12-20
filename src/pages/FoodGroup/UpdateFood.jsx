import { Autocomplete, Grid, Paper } from "@mui/material";
import React from "react";
import Controls from "../../components/Control/Controls";
import PageHeader from "../../components/PageHeader";
import Stack from "@mui/material/Stack";
//validate
import { useFormik } from "formik";
import * as yup from "yup";

import Iconify from "../../components/hook-form/Iconify";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../Axios/API/API";
import TextField from "@mui/material/TextField";
import { URL_API } from "./../../Axios/URL_API/URL";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useDispatch } from "react-redux";
import {
  callAPIgetFoodbyGroupFoodId,
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
  // const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  let { id } = useParams();
  const dispatch = useDispatch();
  const [OptionValue, setOptionValue] = React.useState([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

  const listFoodSelectbox = useSelector((state) => {
    return state.userReducer.listFoodActive;
  });
  const getOptions = () => {
    const item = [];
    for (var i = 0; i < listFoodSelectbox.length; i++) {
      item.push({
        id: listFoodSelectbox[i].id,
        title: listFoodSelectbox[i].name,
      });
    }

    return item;
    //trả về item đã có data muốn biết thì console.log ra mà xem
  };

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
          message: "Cập nhập món ăn không thành công",
          type: "ERROR",
        });
      }
    },
  });

  return (
    <Paper>
      <PageHeader
        title="Điều chỉnh món ăn có trong nhóm "
        subTitle="Điều chỉnh thông tin"
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
            <div>
              <FormControl sx={{ width: "27.5rem" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Món ăn
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

            {/* <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={getOptions()}
              disableCloseOnSelect
              // value={valueTag}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                setOptionValue(value);
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              style={{ width: "37%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // required
                  label="Món ăn"
                  placeholder="Tìm kiếm..."
                />
              )}
            /> */}
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
          sx={{ marginLeft: "28rem", marginTop: "2rem", paddingBottom: "2rem" }}
        >
          <ButtonCustomize nameButton="Xác nhận" type="submit" width="16rem" />
        </Stack>
      </form>
    </Paper>
  );
}
