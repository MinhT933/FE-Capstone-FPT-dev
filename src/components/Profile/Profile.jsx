import React from "react";
import { Paper } from "@mui/material";
import GridContainer from "./../Grid/GridContainer";
import GridItem from "./../Grid/GridItem";
import Card from "./../Card/Card";
import CardHeader from "./../Card/CardHeader";
import CardBody from "./../Card/CardBody";
import CardFooter from "./../Card/CardFooter";
import Button from "@mui/material/Button";
import CardAvatar from "./../Card/CardAvatar";
import { makeStyles } from "@mui/styles";

import Controls from "./../Control/Controls";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import ButtonCustomize from "../Button/ButtonCustomize";
// import { useState } from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { callAPIProfile } from "../../redux/action/acction";
import { useSelector } from "react-redux";
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import { CustomizedToast } from "./../Toast/ToastCustom";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  //   cardTitleWhite: {
  //     color: "#FFFFFF",
  //     marginTop: "0px",
  //     minHeight: "auto",
  //     fontWeight: "300",
  //     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  //     marginBottom: "3px",
  //     textDecoration: "none",
  //   },
};

const schema = yup.object().shape({
  fullName: yup.string().required().trim(),
  phone: yup.string().required().trim(),
  email: yup.string().required().trim(),
  // foodCategoryId: yup.string().required().trim(),
});

const useStyles = makeStyles(styles);
export default function Profile() {
  const navigate = useNavigate();
  const [valueStarTime, setValueStarTime] = React.useState(
    dayjs("2022-10-23T21:11:5")
  );
  const [input, setInput] = useState([]);

  const dispatch = useDispatch();
  // const token = localStorage.getItem("token");
  // const decoded = jwt_decode(token);
  const Navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // var decoded = jwt_decode(token);
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

  const handleJob = () => {
    let text = "";
    let arrarText = [];
    if (decoded.role === "admin") {
      text = "NHÀ SÁNG LẬP";
      arrarText.push(text);
    } else if (decoded.role === "manager") {
      text = "QUẢN LÍ";
      arrarText.push(text);
    } else if (decoded.role === "kitchen") {
      text = "QUẢN LÍ BẾP";
      arrarText.push(text);
    }
    return arrarText;
  };
  const Input = styled("input")({
    display: "none",
  });

  function _treat(e) {
    formik.setFieldValue("image", e.target.files[0]);

    setInput(URL.createObjectURL(e.target.files[0]));
  }

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIProfile(token));
    };
    callAPI();
  }, [dispatch]);

  const profiles = useSelector((state) => {
    return state.userReducer.profiles;
  });

  const formData = new FormData();

  React.useEffect(() => {
    formik.setFieldValue("fullName", profiles.profile?.fullName);
    formik.setFieldValue("phone", profiles.phone);
    formik.setFieldValue("email", profiles.profile?.email);
    formik.setFieldValue("image", setInput(profiles.profile?.avatar));
    formik.setFieldValue("DOB", setValueStarTime(profiles.profile?.DOB));
  }, []);
  const formik = useFormik({
    //gắn schema để so sánh
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      image: null,
    },

    onSubmit: async (values) => {
      const b = new Date(valueStarTime).toLocaleDateString().split("/");
      formData.append("avatar", formik.values.image);

      const data = {
        fullName: formik.values.fullName,
        email: formik.values.email,
        DOB: `${b[2]}-${b[1]}-${b[0]}`,
      };
      try {
        const res = await API("PUT", URL_API + "/profiles", data, token).then(
          (res) => {
            dispatch(callAPIProfile(token));
          }
        );
        const resq = API(
          "PUT",
          URL_API + "/profiles/avatar",
          formData,
          token
        ).then((resq) => {
          dispatch(callAPIProfile(token));
        });
        CustomizedToast({
          message: `chỉnh sửa thành công`,
          type: "SUCCESS",
        });
      } catch (error) {
        CustomizedToast({
          message: `Thất bại`,
          type: "ERROR",
        });
      }
    },
  });

  // const handleSaveImage = () => {
  //   try {
  //     // const

  //     CustomizedToast({
  //       message: `chỉnh sửa thành công`,
  //       type: "SUCCESS",
  //     });
  //     dispatch(callAPIProfile(token));
  //   } catch (error) {
  //     CustomizedToast({
  //       message: `Thất bại`,
  //       type: "ERROR",
  //     });
  //   }
  // };
  const classes = useStyles();
  return (
    <Paper>
      {/* <form onClick={formik.onSubmit} */}
      <div>
        <form onSubmit={formik.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4} sx={{ marginTop: "3%", marginLeft: "2%" }}>
              <Card profile >
                <CardAvatar profile>
                  {input != null ? (
                    <img
                      src={input}
                      alt=""
                      width="220%"
                      height="220%"
                      object-fit="cover"
                    />
                  ) : (
                    // <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/139447725_1107181816401286_7367347044669173523_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=fk_P-vsAZHcAX9Xobgv&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT-KEre7K5a1iB8qCET13pn5olOOL-dFvV2P2feSJcC1fA&oe=637B7310" />
                    <img src={formik.values.image} alt="hihi" />
                  )}
                </CardAvatar>

                <CardBody profile>
                  <h6 className={classes.cardCategory}>
                    {`${profiles.role?.name}`} /{handleJob()}
                  </h6>
                  {/* <h4
                  className={classes.cardTitle}
                >{`${profiles.profile?.fullName}`}</h4>
                <p className={classes.description}>
                  Số điện thoại:{`${profiles.phone}`}
                </p>
                <p className={classes.description}>
                  Email:{`${profiles.profile?.email}`}
                </p>
                <p className={classes.description}>
                  DOB:
                  {`${new Date(profiles.profile?.DOB).toLocaleDateString()}`}
                </p> */}
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      name="image"
                      type="file"
                      onChange={_treat}
                    />

                    <ButtonCustomize
                      variant="contained"
                      component="span"
                      nameButton="Tải ảnh"
                      sx={{
                        marginLeft: "20%",
                      }}
                    />
                  </label>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={7.5} sx={{ marginTop: "3%" }}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    Chỉnh sửa trang cá nhân
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>www.Mesub.com</p> */}
                  <p>www.Mesub.com</p>
                </CardHeader>
                <CardBody>
                  <Box
                    sx={{
                      float: "left",
                      width: "50%",
                      flexGrow: 1,
                      mt: "2rem",
                      marginLeft: "8rem",
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid container spacing={1.5}>
                      <Grid item xs={12}>
                        <Controls.Input
                          variant="outlined"
                          name="phone"
                          label="Số điện thoại"
                          width="24rem"
                          disabled
                          // bỏ giá trị value vào đây để nó get giá trị đó xuống
                          // nói chung là m nhập cái gì
                          // thì nó bỏ xuống cái cái kho có tên mà m khởi tạo rồi đảy xuống BE
                          value={formik.values.phone || ""}
                          /// để nó ghi nhận sự thay đổi
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {/* nếu sai thì nó đỏ */}
                        {formik.touched.phone && formik.errors.phone && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-username-login"
                          >
                            {formik.errors.phone}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Controls.Input
                          variant="outlined"
                          name="fullName"
                          label="Họ và tên"
                          width="24rem"
                          value={formik.values.fullName || ""}
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {/* nếu sai thì nó đỏ */}
                        {formik.touched.fullName && formik.errors.fullName && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-username-login"
                          >
                            {formik.errors.fullName}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Controls.Input
                          variant="outlined"
                          name="email"
                          label="Email"
                          width="24rem"
                          value={formik.values.email}
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <FormHelperText
                            error={false}
                            id="standard-weight-helper-text-username-login"
                          >
                            {formik.errors.email}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Controls.DatePicker
                          label="Ngày tháng năm sinh"
                          width="28rem"
                          inputFormat="DD-MM-YYYY"
                          value={valueStarTime}
                          onChange={(e) => {
                            setValueStarTime(e);
                          }}
                        />
                      </Grid>

                      <Box>
                        <Stack
                          width="200px"
                          marginTop={"2rem"}
                          ml={"7rem"}
                          mb={"1rem"}
                        >
                          <ButtonCustomize
                            variant="contained"
                            type="submit"
                            nameButton="Cập nhập"
                          />
                        </Stack>
                      </Box>
                    </Grid>
                  </Box>
                </CardBody>
                <CardFooter>
                  {/* <Button color="primary">Update Profile</Button> */}
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    </Paper>
  );
}
