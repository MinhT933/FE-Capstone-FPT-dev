import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import PageHeader from "../../components/PageHeader";
import DialogTitle from "@mui/material/DialogTitle";
import Iconify from "../../components/hook-form/Iconify";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import Controls from "./../../components/Control/Controls";
import FormHelperText from "@mui/material/FormHelperText";
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import te from "date-fns/esm/locale/te/index.js";

const shema = yup.object().shape({
  name: yup.string().required(" Vui điền đầy đủ thông tin"),
});

export default function NewTimeFrame(props) {
  const { OpenPopUp, SetOpenPopUp } = props;

  const token = localStorage.getItem("token");

  const [checkedList, setCheckedList] = useState([]);

  const [data, setData] = useState([
    {
      id: 2,
      label: "T2",
      name: "mon",
      value: false,
      lessons: [
        { namel: "S", value: false, id: Math.floor(Math.random() * 99999) },
        {
          namel: "T",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
        {
          namel: "C",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
      ],
    },
    {
      id: 3,
      label: "T3",
      name: "tues",
      value: false,
      lessons: [
        { namel: "S", value: false, id: Math.floor(Math.random() * 99999) },
        { namel: "T", value: false, id: Math.floor(Math.random() * 99999) },
        {
          namel: "C",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
      ],
    },
    {
      id: 4,
      label: "T4",
      name: "wed",
      value: false,
      lessons: [
        { namel: "S", value: false, id: Math.floor(Math.random() * 99999) },
        {
          namel: "T",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
        {
          namel: "C",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
      ],
    },
    {
      id: 5,
      label: "T5",
      name: "thur",
      value: false,
      lessons: [
        { namel: "S", value: false, id: Math.floor(Math.random() * 99999) },
        {
          namel: "T",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
        {
          namel: "C",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
      ],
    },
    {
      id: 6,
      label: "T6",
      name: "fri",
      value: false,
      lessons: [
        { namel: "S", value: false, id: Math.floor(Math.random() * 99999) },
        {
          namel: "T",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
        {
          namel: "C",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
      ],
    },
    {
      id: 7,
      label: "T7",
      name: "sat",
      value: false,
      lessons: [
        { namel: "S", value: false, id: Math.floor(Math.random() * 99999) },
        {
          namel: "T",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
        {
          namel: "C",
          value: false,
          id: Math.floor(Math.random() * 99999),
        },
      ],
    },
  ]);
  // const i = [];

  const handleCase = (item) => {
    let text = "";
    for (const i of item.lessons) {
      if (item.value === false) {
        text = "000";
      } else if (item.value === true) {
        if (i.value === true) {
          text += "1";
        } else {
          text += "0";
        }
      }
    }
    return text;
  };

  const handleBit = () => {
    let mon = "";
    let tues = "";
    let wed = "";
    let thur = "";
    let fri = "";
    let sat = "";
    for (const item of data) {
      if (item.name === "mon") {
        mon = handleCase(item);
      } else if (item.name === "tues") {
        tues = handleCase(item);
      } else if (item.name === "wed") {
        wed = handleCase(item);
      } else if (item.name === "thur") {
        thur = handleCase(item);
      } else if (item.name === "fri") {
        fri = handleCase(item);
      } else if (item.name === "sat") {
        sat = handleCase(item);
      }
    }
    let result = "";
    return (result = mon + tues + wed + thur + fri + sat);
  };

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;

  const formik = useFormik({
    validationSchema: shema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
    },

    onSubmit: async (values) => {
      const data = {
        name: formik.values.name,
        dateFilter: handleBit(),
      };
      try {
        const res = await API("POST", URL_API + "/time-frame", data, token);
        CustomizedToast({
          message: `Đã thêm khung thời gian ${formik.values.name}`,
          type: "SUCCESS",
        });
        SetOpenPopUp(false);
        // window.location.reload();
      } catch (error) {
        CustomizedToast({
          message: "Thêm thất bại Vui lòng kiểm tra thông tin",
          type: "ERROR",
        });
      }
    },
  });

  const onChangeSelectAll = (e) => {
    const { checked, name } = e.target;
    const collection = [];
    const tmp = [...data];
    if (checked) {
      ///che lại vì fix ko đc

      // for (const item of tmp) {
      //   for (const i of item.lessons) {
      //     if (item.name === name) {
      //       collection.push(i.id);
      //     }
      //   }
      // }
      for (let index = 0; index < tmp.length; index++) {
        for (let a = 0; a < tmp[index].lessons.length; a++) {
          if (tmp[index].name === name) {
            collection.push(tmp.id);
            tmp[index].lessons[a].value = checked;
          }
        }
      }
    }
    setData(tmp);
    const index = tmp.findIndex((item) => {
      return item.name === name;
    });
    tmp[index].value = checked;

    setCheckedList(collection);
  };

  const handleCheckboxClick = (e) => {
    const { value, checked } = e.target;

    const a = [...checkedList];

    a.push(+value);
    const tmp = [...data];
    for (let index = 0; index < tmp.length; index++) {
      for (let a = 0; a < tmp[index].lessons.length; a++) {
        if (tmp[index].lessons[a].id === +value) {
          tmp[index].value = checked;
          tmp[index].lessons[a].value = checked;
          // console.log(tmp[index].lessons[a].namel);
        }
      }
    }
    setData(tmp);
    if (checked) {
      setCheckedList(a);
    } else {
      setCheckedList(checkedList.filter((item) => item !== +value));
    }
    // T2(S, T, C)-T3(S, T, C)-T4(S, T, C)-T5(S, T, C)-T6(S, T, C)-T7(S, T, C)"
    let texta = [];

    for (const item of tmp) {
      if (item.value === true) {
        let text = [];
        for (const lession of item.lessons) {
          if (lession.value === true) {
            text.push(lession.namel);
          }
        }
        texta.push(`${item.label}(${text.join(",")})`);
      }
    }
    formik.setFieldValue("name", texta.join("-"));
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "center",
        boxShadow: 12,
      }}
    >
      <Paper>
        <Box
          sx={{
            display: "grid",
            marginBottom: "3%",
          }}
        >
          <Dialog
            open={OpenPopUp}
            onClose={handleClose}
            style={{ minHeight: "80vh", maxHeight: "120vh" }}
          >
            <DialogTitle>
              <PageHeader
                title="Tạo Khung thời gian"
                subTitle="Chọn ngày và buổi cho gói ăn"
                icon={getIcon("uil:schedule")}
              />
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  m: 3,
                  mt: 1,
                  justifyContent: "center",
                  boxShadow: 12,
                  // paddingLeft: "12%",
                  // spacing:6
                }}
              >
                <Controls.Input
                  label="Tên khung thời gian"
                  name="name"
                  width="70%"
                  disabled
                  marginLeft="29%"
                  marginTop="8%"
                  marginBottom="8%"
                  value={formik.values.name}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
                {formik.touched.name && formik.errors.name && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {formik.errors.name}
                  </FormHelperText>
                )}
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={5}
                    xs={2}
                    sx={{ marginTop: "4.24rem" }}
                  >
                    <Typography variant="p" gutterBottom>
                      Sáng
                    </Typography>
                    <Typography variant="p" gutterBottom>
                      Trưa
                    </Typography>
                    <Typography variant="p" gutterBottom>
                      Chiều
                    </Typography>
                  </Grid>
                  {data.map((itemData) => {
                    return (
                      <Grid item={true} xs={1.5} key={itemData}>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          gap={4}
                          // spacing={6}
                          paddingLeft={0}
                        >
                          <Typography variant="p" gutterBottom>
                            {itemData.label}
                          </Typography>
                          <Checkbox
                            checked={itemData.value}
                            name={itemData.name}
                            sx={{
                              color: "black",
                              "&.Mui-checked": {
                                color: "#FFCC32",
                              },
                              display: "none",
                            }}
                            onChange={onChangeSelectAll}
                          />
                          {itemData.lessons.map((lesson) => {
                            return (
                              <Checkbox
                                key={lesson}
                                value={lesson.id}
                                onChange={handleCheckboxClick}
                                checked={checkedList.includes(lesson.id)}
                                sx={{
                                  color: "black",
                                  "&.Mui-checked": {
                                    color: "#FFCC32",
                                  },
                                }}
                              />
                            );
                          })}
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
                <Box
                  sx={{
                    marginLeft: "42%",
                    paddingBottom: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <ButtonCustomize nameButton="tạo" type="submit" />
                </Box>
              </Box>
            </form>
          </Dialog>
        </Box>
      </Paper>
    </Box>
  );
}
