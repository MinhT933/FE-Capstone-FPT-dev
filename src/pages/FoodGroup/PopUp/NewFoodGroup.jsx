import { Dialog, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import React from "react";
import { useFormik } from "formik";
import Controls from "../../../components/Control/Controls";
import PageHeader from "../../../components/PageHeader";
import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import * as yup from "yup";
// import { URL_API } from "./../../Axios/URL_API/URL";
import Iconify from "../../../components/hook-form/Iconify";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";

import { CustomizedToast } from "../../../components/Toast/ToastCustom";
import ButtonCustomize from "../../../components/Button/ButtonCustomize";
import { callAPIgetListFood } from "../../../redux/action/acction";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import API from "../../../Axios/API/API";
import { URL_API } from "../../../Axios/URL_API/URL";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng điền đày đủ thông tin").trim(),
  description: yup.string().required("Vui lòng điền đày đủ thông tin").trim(),
});

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function NewFoodGroup(props) {
  const { OpenPopUp, SetOpenPopUp } = props;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

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

  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      await dispatch(callAPIgetListFood(token));
    };
    getfoodByFoodGroupId();
  }, [token, dispatch]);

  const [valueTag, setValueTag] = React.useState([]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    const a = listFoodSelectbox.find((c) => c.id === value);
    console.log(a);
    setValueTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const listFoodSelectbox = useSelector((state) => {
    return state.userReducer.listFood;
  });

  const handleClose = () => {
    SetOpenPopUp(false);
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
        const res = await API("POST", URL_API + `/food-groups`, data, token);
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
      <Dialog open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Thêm nhóm thức ăn"
            subTitle="Tinh hoa ẩm thực "
            icon={getIcon("emojione-monotone:pot-of-food")}
          />
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ maxWidth: "900px", maxHeight: "900px" }}>
              <Grid container spacing={2} sx={{ marginLeft: "5%" }}>
                <Grid item xs={12}>
                  <Controls.Input
                    variant="outlined"
                    label="Tên nhóm"
                    name="name"
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
                      {formik.errors.name}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Controls.Input
                    variant="outlined"
                    label="Số lượng"
                    name="totalFood"
                    value={formik.values.totalFood}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                {formik.touched.totalFood && formik.errors.totalFood && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.totalFood}
                  </FormHelperText>
                )}
                <Grid item xs={12}>
                  <div>
                    <FormControl sx={{ width: "28.5rem" }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Tag
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
                            <Avatar src={item.image} alt="food" />
                            <Checkbox
                              checked={valueTag.indexOf(item.name) > -1}
                            />
                            <ListItemText primary={item.name} />
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
                    name="description"
                    value={formik.values.description}
                    width="28.5rem"
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
              <Box sx={{ marginLeft: "7rem", marginTop: "2rem" }}>
                <ButtonCustomize
                  nameButton="Thêm"
                  type="submit"
                  width="20rem"
                />
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
