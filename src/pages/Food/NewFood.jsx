import React, { useState } from "react";
import { Grid, Box, Button, styled, FormHelperText } from "@mui/material";
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
import IconButton from "@mui/material/IconButton";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { callAPIgetListCategory } from "./../../redux/action/acction";
import { useDispatch } from "react-redux";
// import { FormHelperText } from "@mui/material";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewCateFood from "./NewCateFood";
import { width } from "@mui/system";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  price: yup.string().required().trim(),
  description: yup.string().required().trim(),
  foodCategoryId: yup.string().required().trim(),
});

export default function NewFood() {
  const dispatch = useDispatch();

  const [OpenPopUpCate, SetOpenPopUpCate] = useState(false);
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

  React.useEffect(() => {
    const getlistCateFood = async () => {
      await dispatch(callAPIgetListCategory(token));
    };
    getlistCateFood();
  }, [dispatch]);

  const categoriesFood = useSelector((state) => {
    return state.userReducer.listCategory;
  });

  const getOptions = () => {
    const item = [];
    for (var i = 0; i < categoriesFood.length; i++) {
      item.push({ id: categoriesFood[i].id, title: categoriesFood[i].name });
    }

    return item;
    //trả về item đã có data muốn biết thì console.log ra mà xem
  };

  const Input = styled("input")({
    display: "none",
  });
  //xử lí hình ảnh
  const [input, setInput] = useState([]);
  //formData để lưu data
  const formData = new FormData();

  //selected dùng để lí ảnh

  //dùng use formik để validate giá trị  nhập vào
  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      name: "",
      price: "",
      description: "",
      foodCategoryId: "",
      image: null,
    },

    //onSubmit ngay từ cái tên đầu nó dùng đẩy data xuống BE
    onSubmit: async (values) => {
      formData.append("image", formik.values.image);
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("foodCategoryId", formik.values.foodCategoryId);
      //gọi API để đẩy data xuống
      try {
        const res = await API("POST", URL_API + "/foods", formData, token);
        CustomizedToast({
          message: `Đã thêm món ${formik.values.name}`,
          type: "SUCCESS",
        });
        window.location.reload(true);
      } catch (error) {}
    },
  });

  //cái này là sử lí image t box bỏ qua bên kia t xử lí khó quá nên t gôm bỏ zo đây T.T
  function _treat(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    formik.setFieldValue("image", e.target.files[0]);
    return (
      selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
      formData.append("File", selecteds),
      setInput(images)
    );
  }
  // const classes = useStyles();
  return (
    <Box>
      <PageHeader
        width="60%"
        marginLeft="20%"
        title="Thêm món ăn"
        subTitle="Vui lòng điền đầy đủ thông tin "
        icon={getIcon("emojione-monotone:pot-of-food")}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            borderRadius: 2,
            bgcolor: "background.paper",
            m: 1,
            display: "flex",
            justifyContent: "center",
            boxShadow: 12,
            paddingLeft: "7%",
            width: "60%",
            marginLeft: "20%",
          }}
        >
          {/* // à nhớ bỏ cái form ở đây thì nó mới hiểu và làm onsubmit đc */}

          <Box
            sx={{ float: "left", width: "50%", flexGrow: 1, mt: "2rem" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box>
                    <Controls.Select
                      name="foodCategoryId"
                      label="Loại"
                      width="15vw"
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
                  </Box>
                  <Box sx={{ mt: "3%" }}>
                    <IconButton
                      onClick={() => {
                        SetOpenPopUpCate(true);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Controls.TextArea
                  columns={12}
                  width="85%"
                  row={6}
                  maxRows={6}
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
                <Stack width="200px" marginTop={"10%"} ml={"9rem"} mb={"2rem"}>
                  <ButtonCustomize
                    variant="contained"
                    type="submit"
                    nameButton="Thêm món ăn"
                  />
                </Stack>
              </Box>
            </Grid>
          </Box>

          <Box sx={{ float: "left", width: "60%", mt: "2rem", pl: "20%" }}>
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
                  <img key={i} src={i} alt="hihi" />
                ))}
              </Box>
            </label>
          </Box>
        </Box>
      </form>
      <NewCateFood
        OpenPopUpCate={OpenPopUpCate}
        SetOpenPopUpCate={SetOpenPopUpCate}
      />
    </Box>
  );
}
