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
import { FormHelperText } from "@material-ui/core";

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
  foodCategoryId: yup.string().required().trim(),
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

  const Input = styled("input")({
    display: "none",
  });
  //xử lí hình ảnh
  const [input, setInput] = useState([]);
  const formData = new FormData();
  const [selecteds, setselecteds] = useState(false);


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

      //sử lí data lưu xuống dưới
      // const data = {
      //   name: formik.values.name,
      //   price: formik.values.price,
      //   description: formik.values.description,
      //   foodCategoryId: formik.values.foodCategoryId,
      //   image: formData,
      // };
      console.log(formik.values.categories);
      const res = await API("POST", URL_API + "/foods", formData);
    },
  });

  function _treat(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    formik.setFieldValue("image", e.target.files[0]);
    // setselecteds(e.target.files[0]);
    // setselecteds(true);

    return (
      // xử lí hình ảnh cho nó hiển thị lên
      selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
      //form data đẩy file hình lên ==> formData.append chèn cặp giá trị key 'File'
      //value là 'selecteds' muốn biết selecteds là gì console.log ra mà xem
      formData.append("File", selecteds),
      setInput(images)
    );
  }

  // const { touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
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
                  value={formik.values.foodCategoryId}
                  onChange={(e) => {
                    const a = categoriesFood.find(
                      (c) => c.id === e.target.value
                    );
                    console.log(a);
                    // formik.handleChange(a.name);
                    formik.setFieldValue("foodCategoryId", a.id);

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
                  name="description"
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
                  ml={"10rem"}
                  mb={"2rem"}
                >
                  <ColorButton variant="contained" type="submit">
                    Tạo thực phẩm
                  </ColorButton>
                </Stack>
              </Box>
            </Grid>
          </Box>
          <Box sx={{ float: "left", width: "40%", mt: "2rem" }}>
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
                {input.map((i) => (
                  <img key={i} src={i} />
                ))}
              </Box>
            </label>
          </Box>
        </form>
      </Box>
    </Paper>
  );
}
