import React from "react";
import { Link as useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Box,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Iconify from "../../components/hook-form/Iconify";
import { useFormik } from "formik";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import * as yup from "yup";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import Controls from "./../../components/Control/Controls";
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { callAPIgetShipperByKitchenID } from "../../redux/action/acction";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
//----------------------------------------------------------------

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddShipper(props) {
  const { id, setOpenSetShipper, OpenSetShipper } = props;

  const profiles = useSelector((state) => {
    return state.userReducer.profiles;
  });

  const idkitchen = profiles.id;

  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const [OptionValue, setOptionValue] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }
  console.log(id);
  const handleClose = () => {
    setOpenSetShipper(false);
  };

  React.useEffect(() => {
    const getlistShipper = async () => {
      dispatch(await callAPIgetShipperByKitchenID(token, idkitchen));
    };
    getlistShipper();
  }, [dispatch, token, idkitchen]);

  const shipper = useSelector((state) => {
    return state.userReducer.shipperbyIDkitchen;
  });

  const getid = () => {
    const arr = [...selectedOptions];
    for (let index = 0; index < OptionValue.length; index++) {
      const element = OptionValue[index];

      arr.push(element.id);
    }
    return arr;
  };
  const getOptions = () => {
    const item = [];
    for (var i = 0; i < shipper.length; i++) {
      item.push({
        id: shipper[i].id,
        title: shipper[i].account.profile.fullName,
      });
    }
    return item;
  };

  const formik = useFormik({
    //gắn schema để so sánh

    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      sessionId: "",
      shipperIds: [""],
    },

    onSubmit: async (values) => {
      const data = { sessionId: id, shipperIds: getid() };
      try {
        const res = await API(
          "POST",
          URL_API + "/delivery_trips/shipper_toTrip",
          data,
          token
        );
        if (res) {
          CustomizedToast({
            message: `Đã thêm ${formik.values.name}`,
            type: "SUCCESS",
          });
        }
      } catch (error) {
        console.log(error.response.data.message);
        if (error.response.data.message === "shipper not enough") {
          CustomizedToast({
            message: "Không đủ shipper",
            type: "ERROR",
          });
        } else {
          CustomizedToast({
            message: "Vui lòng xem lại thông tin",
            type: "ERROR",
          });
        }
      }
    },
  });

  return (
    <Paper>
      <Dialog
        open={OpenSetShipper}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {/* <PageHeader
            title="Xem chi tiết món có trong phiên làm việc"
            subTitle={`Thông tin chi tiết`}
            icon={getIcon("fluent-mdl2:work-item")}
          /> */}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              {/* <Controls.Select
                name="shipperIds"
                required
                label="Loại"
                width="85%"
                value={formik.values.shipperIds}
                onChange={(e) => {
                  const a = shipper.find((c) => c.id === e.target.value);

                  formik.setFieldValue("shipperIds", a.id);
                }}
                onBlur={formik.handleBlur}
                options={getOptions()}
              /> */}
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={getOptions()}
                disableCloseOnSelect
                // value={valueTag}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                    label="Shipper"
                    placeholder="Tìm kiếm..."
                  />
                )}
              />
            </Box>
            <ButtonCustomize
              type="submit"
              witdh="12%"
              marginLeft="30%"
              nameButton="Thêm shipper"
            />
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
