import React, { useState } from "react";
import { Paper, Grid, Box, Button, styled } from "@mui/material";
import PageHeader from "./../../components/PageHeader";
import Iconify from "../../components/hook-form/Iconify";
//componets
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
//validate
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { callAPIgetListCategory } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
// import { FormHelperText } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import FormHelperText from "@mui/material/FormHelperText";

//-------------------------------------------------------------------

//styles paper
const useStyles = styled("Paper")(({ theme }) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(9),
  },
}));
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  price: yup.string().required().trim(),
  description: yup.string().required().trim(),
  foodCategoryId: yup.string().required().trim(),
});

export default function EditFood() {
  let { id } = useParams();

  const dispatch = useDispatch();

  const [input, setInput] = useState(null);

  const navigate = useNavigate();

  const formData = new FormData();

  React.useEffect(() => {
    const getlistCateFood = async () => {
      await dispatch(callAPIgetListCategory());
    };
    getlistCateFood();
    API("GET", URL_API + `/foods/${id}`)
      .then((res) => {
        formik.setFieldValue("name", res.data.result.name);
        formik.setFieldValue("image", res.data.result.image);
        formik.setFieldValue("price", res.data.result.price);
        formik.setFieldValue("description", res.data.result.description);
        formik.setFieldValue("foodCategoryId", res.data.result.foodCategory.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const categoriesFood = useSelector((state) => {
    return state.userReducer.listCategory;
  });
  // get_option
  const getOptions = () => {
    const item = [];
    for (var i = 0; i < categoriesFood.length; i++) {
      item.push({ id: categoriesFood[i].id, title: categoriesFood[i].name });
    }
    return item;
  };

  const Input = styled("input")({
    display: "none",
  });

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      price: "",
      description: "",
      foodCategoryId: "",
      image: null,
    },

    onSubmit: async (values) => {
      formData.append("image", formik.values.image);
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("foodCategoryId", formik.values.foodCategoryId);
      try {
        const res = await API(
          "PUT",
          URL_API + `/foods/update-food/${id}`,
          formData
        );

        CustomizedToast({
          message: `Cập nhập ${formik.values.name}`,
          type: "SUCCESS",
        });
        navigate("/dashboard/admin/food");
      } catch (err) {
        CustomizedToast({ message: "Cập nhập thất bại rồi ", type: "ERROR" });
      }
    },
  });

  function _treat(e) {
    formik.setFieldValue("image", e.target.files[0]);

    setInput(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Paper>
      <PageHeader
        title="Điều chỉnh món ăn"
        subTitle="Tinh hoa ẩm thực "
        icon={getIcon("emojione-monotone:pot-of-food")}
      />

      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "background.paper",
          m: 1,
          display: "flex",
          justifyContent: "center",
          boxShadow: 12,
          paddingLeft: "12%",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{ float: "left", width: "50%", flexGrow: 1, mt: "2rem" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid></Grid>
            <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <Controls.Input
                  variant="outlined"
                  name="name"
                  label="Tên"
                  value={formik.values.name}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <FormHelperText
                    error={false}
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
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <FormHelperText
                    error={false}
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.price}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controls.Select
                  name="foodCategoryId"
                  label="loại"
                  value={formik.values.foodCategoryId}
                  onChange={(e) => {
                    const a = categoriesFood.find(
                      (c) => c.id === e.target.value
                    );
                    formik.setFieldValue("foodCategoryId", a.id);
                  }}
                  onBlur={formik.handleBlur}
                  options={getOptions()}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.TextArea
                  width="24.5rem"
                  row={2}
                  maxRows={4}
                  multiline
                  variant="outlined"
                  name="description"
                  label="Mô tả"
                  value={formik.values.description}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <FormHelperText
                    error={false}
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.description}
                  </FormHelperText>
                )}
              </Grid>

              <Box>
                <Stack
                  width="200px"
                  marginTop={"10rem"}
                  ml={"18rem"}
                  mb={"2rem"}
                >
                  <ButtonCustomize
                    variant="contained"
                    type="submit"
                    nameButton=" Xác Nhận"
                  />
                </Stack>
              </Box>
            </Grid>
          </Box>
          <Box sx={{ float: "left", width: "40%", mt: "2rem", ml: "5rem" }}>
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
                  height: 165,
                  width: 165,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  marginTop: "10%",
                  boxShadow: 8,
                  marginLeft: "11%",
                }}
              >
                {/* hiển thị hình lên  */}
                {input != null ? (
                  <img src={input} />
                ) : (
                  <img src={formik.values.image} />
                )}
              </Box>
            </label>
          </Box>
        </form>
      </Box>
    </Paper>
  );
}
