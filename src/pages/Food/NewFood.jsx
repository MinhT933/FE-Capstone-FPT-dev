import React from "react";
import { Paper, Grid, Box, Button, styled } from "@mui/material";
import PageHeader from "./../../components/PageHeader";
import Iconify from "../../components/hook-form/Iconify";
//componets
import Controls from "./../../components/Control/Controls";
import Stack from "@mui/material/Stack";
import InputImg from "./../../components/InputImg/inputImg";
//api
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
//validate
import { useFormik } from "formik";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { callAPIgetListCategory } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
import { selectName } from "./../../utils/UpdateService/UpdateService";
import { FormHelperText, TextField } from "@material-ui/core";
import TextArea from "./../../components/Control/TextArea";

//styles paper
const useStyles = styled((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(9),
  },
}));
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/// csss button
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FFCC32"),
  backgroundColor: "#FFCC32",
  "&:hover": {
    backgroundColor: "#ffee32",
  },
  display: "center",
}));

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  price: yup.string().required().trim(),
  description: yup.string().required().trim(),
  categories: yup.string().required().trim(),
});

export default function NewFood() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getlistCateFood = async () => {
      await dispatch(callAPIgetListCategory());
    };
    getlistCateFood();
  }, [dispatch]);

  const categoriesFood = useSelector((state) => {
    return state.userReducer.listCategory;
  });

  const getOptions = (id, title) => {
    const item = [];
    for (var i = 0; i < categoriesFood.length; i++) {
      item.push({ id: categoriesFood[i].id, title: categoriesFood[i].name });
    }

    return item;
  };

  const formik = useFormik(
    {
      validationSchema: schema,
      validateOnMount: true,
      validateOnBlur: true,
      initialValues: {
        name: "",
        price: "",
        description: "",
        categories: "",
        image: "",
      },

      onSubmit: async (values) => {
        console.log(values);
        // input image
        const formData = new FormData();
        const dataImage = formData.append("File", InputImg);
        //sử lí data lưu xuống dưới
        const data = {
          name: formik.values.name,
          price: formik.values.price,
          description: formik.values.description,
          categories: formik.values.categories,
          dataImage,
        };
        console.log(formik.values.categories);
        const res = await API({
          method: "POST",
          URL_API,
          data,
        });
        console.log(res);
      },
    },
    []
  );

  const { touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const classes = useStyles();
  // console.log(formik);
  return (
    <Paper className={classes.pageContent} onSubmit={formik.handleSubmit}>
      <PageHeader
        title="Thêm thức ăn"
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
        <Box
          sx={{ float: "left", width: "50%", flexGrow: 1, mt: "2rem" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <Controls.Input
                variant="outlined"
                name="name"
                label="Tên"
                value={formik.values.name || ""}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {/* nếu sai thì nó đỏ */}
              {formik.touched.name && formik.errors.name ? (
                <FormHelperText
                  error={false}
                  id="standard-weight-helper-text-username-login"
                >
                  {formik.errors.name}
                </FormHelperText>
              ) : (
                <>hehe </>
              )}
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                variant="outlined"
                name="price"
                label="Giá"
                value={formik.values.price}
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
              <Controls.Select
                name="foodCategoryId"
                label="Loại"
                // defaultValue={categoriesFood[0].name}
                value={formik.values.categories}
                onChange={(e) => {
                  const a = categoriesFood.find((c) => c.id === e.target.value);
                  console.log(a);
                  // formik.handleChange(a.name);
                  formik.setFieldValue("categories", a.id);

                  // console.log(e);
                }}
                onBlur={formik.handleBlur}
                options={getOptions()}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.TextArea
                row={2}
                maxRows={4}
                multiline
                variant="outlined"
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
              <Stack width="200px" marginTop={"10rem"} ml={"10rem"} mb={"2rem"}>
                <ColorButton variant="contained">Tạo thực phẩm </ColorButton>
              </Stack>
            </Box>
          </Grid>
        </Box>
        <Box sx={{ float: "left", width: "40%", mt: "2rem" }}>
          <Paper backgroundColor="red">
            <InputImg />
          </Paper>
        </Box>
      </Box>
    </Paper>
  );
}
