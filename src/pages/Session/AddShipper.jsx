import React from "react";
import { Link as useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, Paper, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import API from "./../../Axios/API/API";
import { URL_API } from "./../../Axios/URL_API/URL";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  callAPIGetListSessionDetail,
  callAPIGetListTripByID,
  callAPIgetShipperByKitchenID,
} from "../../redux/action/acction";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import PageHeaderAddShipper from "../../components/PageHeaderAddShipper";
import SetOpenPopUp from "./../../components/Trip/ChangeShipper";
//----------------------------------------------------------------

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddShipper(props) {
  const {
    id,
    setOpenSetShipper,
    OpenSetShipper,
    ButtonShipper,
    setButtonShipper,
  } = props;

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
  const handleClose = () => {
    setOpenSetShipper(false);
  };

  React.useEffect(() => {
    const getlistShipper = async () => {
      dispatch(await callAPIgetShipperByKitchenID(token, idkitchen));
      dispatch(await callAPIGetListTripByID(token, id));
    };
    getlistShipper();
  }, [dispatch, token, idkitchen, id]);

  const shipper = useSelector((state) => {
    return state.userReducer.shipperbyIDkitchen;
  });
  const listripByID = useSelector((state) => {
    return state.userReducer.listripByID;
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
          dispatch(callAPIGetListSessionDetail(token, id));
          setButtonShipper(false);
          CustomizedToast({
            message: `Đã thêm shipper thành công`,
            type: "SUCCESS",
          });
        }
      } catch (error) {
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
          <PageHeaderAddShipper title={`${listripByID.length} `} />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ marginLeft: "6rem" }}>
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
              marginLeft="43%"
              marginTop="2%"
              nameButton="Thêm shipper"
            />
          </form>
        </DialogContent>
      </Dialog>
    
    </Paper>
  );
}
