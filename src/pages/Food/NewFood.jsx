import React, { useState } from "react";
import {
  Paper,
  Grid,
  Box,
  Button,
  styled,
  FormHelperText,
} from "@mui/material";
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
// import { FormHelperText } from "@mui/material";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import ButtonCustomize from "../../components/Button/ButtonCustomize";

//styles paper
const useStyles = styled("Paper")(({ theme }) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(9),
  },
}));
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

//yub dùng để validation trong reactjs
// khởi tạo schema để so sánh value(theo tao hiểu)
const schema = yup.object().shape({
  name: yup.string().required().trim(),
  price: yup.string().required().trim(),
  description: yup.string().required().trim(),
  foodCategoryId: yup.string().required().trim(),
});

export default function NewFood() {
  const dispatch = useDispatch();
  //khởi tạo lần đầu gọi thằng getlist cate để nó hiện thị lên selectbox ô select của tao á
  // ctr+ click chuột vào callAPIgetListCategory để xem nó cách callAPI getlistCateFood no giống y chan
  //call Food list vậy thay vị đổ vào bảng thì mình đỗ vào selectbox
  React.useEffect(() => {
    const getlistCateFood = async () => {
      await dispatch(callAPIgetListCategory());
    };
    getlistCateFood();
    //disparch để kết thúc vào lặp vô tận loop infinity á
  }, [dispatch]);

  //kéo data categoriesFood từ store zìa mà xài nè
  const categoriesFood = useSelector((state) => {
    return state.userReducer.listCategory;
  });

  /// get list options để hiển thị lên ô selectbox
  const getOptions = () => {
    //tạo mảng rỗng để chứa data ở đây là name và id của categoriesFood
    //hình dung nó giống nhà kho vậy á
    // sau này trước khi muốn gọi cái gì đó phải tạo 1 mảng rỗng để bỏ vào
    const item = [];
    // vòng food này để đẩy data từ categoriesFood vào trong items ( vì nó có nhiều object) nên phải làm vậy
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

  const token = localStorage.getItem("token");

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
      //formdata.append gg.com => nôm na à đẩy giá trị vào formdata có key là 1 chuỗi
      //value là formik.values.(something you want ) nó giống như muốn vào nhà ai đó thì phải biết tên m trước
      //sau đó mới biết về bản thân m sau nôm na vậy đó hi vọng m hiểu
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
      } catch (error) { }
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

  return (
    <Paper>
      <PageHeader
        title="Thêm thức ăn"
        subTitle="Tinh hoa ẩm thực "
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
            paddingLeft: "12%",
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
                  // bỏ giá trị value vào đây để nó get giá trị đó xuống
                  // nói chung là m nhập cái gì
                  // thì nó bỏ xuống cái cái kho có tên mà m khởi tạo rồi đảy xuống BE
                  value={formik.values.name || ""}
                  /// để nó ghi nhận sự thay đổi
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
                <Controls.Select
                  name="foodCategoryId"
                  label="Loại"
                  // defaultValue={categoriesFood[0].name}

                  value={formik.values.foodCategoryId}
                  onChange={(e) => {
                    // map tên với adi hiện thị name nhưng chọn ẩn ở dưới là id
                    const a = categoriesFood.find(
                      (c) => c.id === e.target.value
                    );
                    formik.setFieldValue("foodCategoryId", a.id);
                  }}
                  onBlur={formik.handleBlur}
                  //getOption để lấy giá trị category
                  options={getOptions()}
                />
              </Grid>
              <Grid item xs={12}>
                <Controls.TextArea
                  columns={12}
                  width="24.5rem"
                  row={6}
                  maxRows={6}
                  multiline
                  width="24.5rem"
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
                  <ButtonCustomize
                    variant="contained"
                    type="submit"
                    nameButton="Tạo thực phẩm"
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
                {input.map((i) => (
                  <img key={i} src={i} alt="hihi" />
                ))}
              </Box>
            </label>
          </Box>

        </Box>
      </form>
    </Paper>
  );
}
