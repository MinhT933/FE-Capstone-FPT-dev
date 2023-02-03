import React from "react";
// import { Paper } from "@mui/material";
import PageHeader from "./../../components/PageHeader";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "../../components/hook-form/Iconify";
import Checkbox from "@mui/material/Checkbox";
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
//time
import Paper from "@mui/material/Paper";

//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
//validate
import { useFormik } from "formik";
import * as yup from "yup";

import { useSelector } from "react-redux";

import FormHelperText from "@mui/material/FormHelperText";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { useNavigate, useParams } from "react-router-dom";
import { callAPIgetListFreeShipper } from "../../redux/action/acction";
import { useDispatch } from "react-redux";
import FreeShipper from "./FreeShipper";
//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button

//callAPIforCreateStation========================================
const schema = yup.object().shape({
  fullName: yup.string().required("Điền đầy đủ thông tin").trim(),
  email: yup.string().required("Điền đầy đủ thông tin").trim(),
  address: yup.string().required("Điền đầy đủ thông tin").trim(),
  ability: yup.string().required("Điền đầy đủ thông tin").trim(),
});

//callAPIforCreateStation========================================
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function UpdateKitchen() {
  //callAPIforCreateStation========================================
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  React.useEffect(() => {
    API("GET", URL_API + `/kitchens/${id}`, null, token)
      .then((res) => {
        formik.setFieldValue(
          "fullName",
          res.data.result.account.profile.fullName
        );
        formik.setFieldValue("email", res.data.result.account.profile.email);
        formik.setFieldValue("address", res.data.result.address);
        formik.setFieldValue("ability", res.data.result.ability);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    const getFreeShipper = async () => {
      await dispatch(callAPIgetListFreeShipper(token));
    };
    getFreeShipper();
  }, [token, dispatch]);

  const [OptionValue, setOptionValue] = React.useState([]);

  const station = useSelector((state) => {
    return state.userReducer.listKitchen;
  });

  const freeShipper = useSelector((state) => {
    return state.userReducer.listFreeShipper;
  });

  const getOptions = () => {
    const item = [];
    for (var i = 0; i < freeShipper.length; i++) {
      item.push({
        id: freeShipper[i].account.profile.id,
        title: freeShipper[i].account.profile.fullName,
      });
    }

    return item;
  };

  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      // ability: "",
    },

    onSubmit: async (values) => {
      // console.log(values);
      const data = {
        fullName: formik.values.fullName,
        email: formik.values.email,
        address: formik.values.address,
        // ability: formik.values.ability,
      };
      try {
        const res = await API("PUT", URL_API + `/kitchens/${id}`, data, token);

        if (res) {
          CustomizedToast({
            message: `Cập nhập ${formik.values.fullName} thành công`,
            type: "SUCCESS",
          });
        }
        navigate("/dashboard/admin/kitchen");
      } catch (error) {
        // console.log(error);
        CustomizedToast({ message: "Cập nhập thất bại", type: "ERROR" });
      }
    },
  });

  return (
    <Paper
      title="Cập nhập bếp"
      elevation={3}
      sx={{
        padding: "2%",
        marginBottom: "10%",
        margin: "2%",
        marginTop: "2%",
      }}
    >
      <PageHeader
        display="left"
        title="Cập nhập bếp"
        subTitle="Vui lòng điền đầy đủ thông tin"
        icon={getIcon("mdi:chef-hat")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" justifyContent="left" alignItems="left">
          {/* <Grid container spacing={4} columns={20}> */}
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
          >
            <Grid>
              <Stack spacing={3}>
                <Controls.Input
                  variant="outlined"
                  label="Tên bếp"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.fullName}
                  </FormHelperText>
                )}

                <Controls.Input
                  variant="outlined"
                  label="Địa chỉ"
                  name="address"
                  value={formik.values.address}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.address}
                  </FormHelperText>
                )}

                <Controls.Input
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.email}
                  </FormHelperText>
                )}

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
                      // required
                      label="Thêm tài xế cho bếp"
                      placeholder="Tìm kiếm..."
                    />
                  )}
                />
              </Stack>
            </Grid>

            <Grid>
              <FreeShipper />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Stack
            width="20%"
            justifyContent="center"
            marginLeft={"40%"}
            marginTop={"2%"}
          >
            <ButtonCustomize nameButton="Cập nhập" type="submit" />
          </Stack>
        </Box>
      </form>
    </Paper>
  );
}
