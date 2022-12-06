import { Dialog, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import Controls from "../../../components/Control/Controls";
import PageHeader from "../../../components/PageHeader";

import * as yup from "yup";
// import { URL_API } from "./../../Axios/URL_API/URL";
import Iconify from "../../../components/hook-form/Iconify";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

import { CustomizedToast } from "../../../components/Toast/ToastCustom";
import ButtonCustomize from "../../../components/Button/ButtonCustomize";
import {
  callAPIgetGroupFood,
  callAPIgetListFoodActive,
} from "../../../redux/action/acction";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import API from "../../../Axios/API/API";
import { URL_API } from "../../../Axios/URL_API/URL";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng điền đày đủ thông tin").trim(),
  description: yup.string().required("Vui lòng điền đày đủ thông tin").trim(),
});

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function NewFoodGroup(props) {
  const { OpenPopUp, SetOpenPopUp } = props;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

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
  ///
  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      await dispatch(callAPIgetListFoodActive(token));
    };
    getfoodByFoodGroupId();
  }, [token, dispatch]);

  const [valueTag, setValueTag] = React.useState([]);

  const [OptionValue, setOptionValue] = React.useState([]);

  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleChange = (event, value) => setSelectedOptions(value);

  console.log(OptionValue);

  // const handleChange = (e) => {
  //   const {
  //     target: { value },
  //   } = e;

  //   const a = listFoodSelectbox.find((c) => c.id === value);
  //   console.log(a);
  //   setValueTag(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

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
  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const getid = () => {
    const arr = [...selectedOptions];
    for (let index = 0; index < OptionValue.length; index++) {
      const element = OptionValue[index];

      arr.push(element.id);
    }
    return arr;
  };

  console.log(selectedOptions);
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
        // totalFood: formik.values.totalFood,
        // foodIds: a,
        foodIds: getid(),
      };
      try {
        const res = await API("POST", URL_API + `/food-groups`, data, token);
        await dispatch(callAPIgetGroupFood(token));
        CustomizedToast({
          message: `Đã Thêm ${formik.values.name}`,
          type: "SUCCESS",
        });
      } catch (error) {
        // eslint-disable-next-line no-lone-blocks
        {
          error.response.data.message ===
          "Foods must be less than or equal to TotalFood"
            ? CustomizedToast({
                message:
                  "Số thức ăn được chọn phải bé hơn hoặc bằng tổng số thức ăn",
                type: "ERROR",
              })
            : CustomizedToast({
                message: "Vui lòng xem lại thông tin",
                type: "ERROR",
              });
        }
      }
    },
  });

  return (
    <Paper>
      <Dialog open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Thêm nhóm thức ăn"
            subTitle="vui lòng điền đầy đủ thông tin "
            icon={getIcon("emojione-monotone:pot-of-food")}
          />
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ maxWidth: "900px", maxHeight: "900px" }}>
              <Grid
                container
                spacing={2}
                sx={{ marginLeft: "5%", marginTop: "2%" }}
              >
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
                  {/* <div>
                    <FormControl sx={{ width: "28.5rem" }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Món ăn
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple={true}
                        value={valueTag}
                        onChange={(e) => handleChange(e)}
                        // input={<OutlinedInput label="Món ăn" />}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Checkboxes"
                            placeholder="Favorites"
                          />
                        )}
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
                            <ListItemText primary={`${item.price}đ`} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div> */}
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={getOptions()}
                    disableCloseOnSelect
                    // value={valueTag}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(e, value) => {
                      setOptionValue(value);
                      // if (e.target.ariaSelected === true) {
                      //   for (let index = 0; index < value.length; index++) {
                      //     console.log(e.target.ariaSelected);
                      //     const element = value[index];
                      //     const arr = [...OptionValue];
                      //     arr.push(element.id);
                      //     setOptionValue(arr);
                      //   }
                      // }
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
                    style={{ width: "85%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Món ăn"
                        placeholder="Tìm kiếm..."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controls.TextArea
                    variant="outlined"
                    label="Mô tả"
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
