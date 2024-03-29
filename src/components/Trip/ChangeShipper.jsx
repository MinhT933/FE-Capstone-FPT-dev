import { Dialog, DialogContent, DialogTitle, Paper } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import PageHeader from "../PageHeader";
import Iconify from "../hook-form/Iconify";
import { CustomizedToast } from "../Toast/ToastCustom";
import ButtonCustomize from "../Button/ButtonCustomize";
import {
  callAPIgetShipperByActive,
  callAPIgetTripall,
} from "../../redux/action/acction";
import { URL_API } from "../../Axios/URL_API/URL";
import API from "../../Axios/API/API";

// const schema = yup.object().shape({
//   fullName: yup.string().required("Vui lòng điền đầy đủ thông tin").trim(),
//   // description: yup.string().required("Vui lòng điền đầy đủ thông tin").trim(),
// });

//geticon
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function ChangeShipper(props) {
  const { OpenPopUp, SetOpenPopUp, id, status } = props;

  // console.log(selectionModel);
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

  // const idKitchen = profiles.id;
  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      await dispatch(callAPIgetShipperByActive(token));
      const callAPI = async () => {
        // await dispatch(callAPIgetAPIcount(token, props.status));
        const res = await API(
          "GET",
          URL_API + `/delivery_trips?status=${status}`,
          null,
          token
        );
      };
    };
    getfoodByFoodGroupId();
  }, [token, dispatch, status]);

  const [valueTag, setValueTag] = React.useState([]);

  const handleChange = (e) => {
    setValueTag(e.target.value);
  };

  const listShipperSelectbox = useSelector((state) => {
    return state.userReducer.listShipperActive;
  });

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      shipperId: "",
    },
    onSubmit: async (values) => {
      const data = {
        shipperId: valueTag,
        deliveryTripId: id,
      };
      try {
        const res = await API(
          "PUT",
          URL_API +
            `/delivery_trips/transfer?deliveryTripId=${id}&shipperId=${valueTag}`,
          data,
          token
        );
        window.location.reload(true);
        await dispatch(callAPIgetTripall(token));

        SetOpenPopUp(false);
        CustomizedToast({
          message: "Đổi shipper thành công",
          type: "SUCCESS",
        });
      } catch (error) {
        CustomizedToast({
          message: "Đổi shipper thất bại",
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
            title="Chọn tài xế"
            subTitle="Vui lòng chọn 1 tài xế"
            icon={getIcon("carbon:delivery")}
          />
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ width: "28rem", height: "8rem", marginTop: "2%" }}>
              <div>
                <FormControl sx={{ width: "28rem" }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Tài xế
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={valueTag}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput label="Shipper" />}
                    MenuProps={MenuProps}
                  >
                    {listShipperSelectbox.map((item) => (
                      <MenuItem value={item.id}>
                        {/* <Avatar src={item.account.profile.avatar} alt="food" />
                        <ListItemText primary={item.account.profile.fullName} /> */}
                        {item.account.profile.fullName}
                      </MenuItem>
                    ))}

                    {formik.touched.fullName && formik.errors.fullName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-username-login"
                      >
                        {formik.errors.fullName}
                      </FormHelperText>
                    )}
                  </Select>
                </FormControl>
              </div>
              <Box sx={{ marginLeft: "6.5rem", marginTop: "2rem" }}>
                <ButtonCustomize
                  nameButton="Tạo chuyến đi"
                  type="submit"
                  width="15rem"
                />
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
