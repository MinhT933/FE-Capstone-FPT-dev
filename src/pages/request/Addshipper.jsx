import React from "react";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import PageHeader from "../../components/PageHeader";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import Iconify from "../../components/hook-form/Iconify";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import { URL_API } from "../../Axios/URL_API/URL";
import API from "../../Axios/API/API";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  callAPIgetListReq,
  callAPIgetShipperActive,
} from "../../redux/action/acction";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export default function Addshipper(props) {
  const { Open, setOpen, id, idre } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
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
  ///
  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      await dispatch(callAPIgetShipperActive(token));
    };
    getfoodByFoodGroupId();
  }, []);

  const listShipperSelectbox = useSelector((state) => {
    return state.userReducer.listShipperActive;
  });

  const handleAccept = (idre) => {
    // if (request.status === "waiting") {
    API("PUT", URL_API + `/request/${idre}`, null, token).then((res) => {
      try {
        dispatch(callAPIgetListReq(token));
        CustomizedToast({
          message: `Đã chuyển trạng thái thành công`,
          type: "SUCCESS",
        });
      } catch (err) {
        CustomizedToast({
          message: `không thể thực hiện yêu cầu này vì đã xác nhận rồi`,
          type: "ERROR",
        });
      }
    }, []);
  };

  const [valueTag, setValueTag] = React.useState([]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    const a = listShipperSelectbox.find((c) => c.id === value);
    setValueTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const dispatch = useDispatch();
  const formik = useFormik({
    //gắn schema để so sánh

    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      shippers: [],
    },

    onSubmit: async (values) => {
      console.log(values);
      const a = [];
      for (const i of valueTag) {
        const arr = listShipperSelectbox.filter(
          (item) => item.account.profile.fullName === i
        );

        if (arr.length > 0) {
          //   a.push(arr[0].id);
          a.push({ idShipper: arr[0].id });
        }
      }
      const data = {
        shippers: a,
      };

      //gọi API để đẩy data xuống
      try {
        const res = await API(
          "POST",
          URL_API + `/kitchens/addShipper/${id}`,
          data,
          token
        );
        CustomizedToast({
          message: `Thêm thành công`,
          type: "SUCCESS",
        });
        API("PUT", URL_API + `/request/${idre}`, null, token).then((res) => {
          try {
            dispatch(callAPIgetListReq(token));
            CustomizedToast({
              message: `Đã chuyển trạng thái thông công`,
              type: "SUCCESS",
            });
          } catch (err) {
            CustomizedToast({
              message: `không thể thực hiện yêu cầu này vì đã xác nhận rồi`,
              type: "ERROR",
            });
          }
        }, []);
        dispatch(callAPIgetShipperActive(token));
        setOpen(false);
        dispatch(callAPIgetListReq(token));

        // window.location.reload(true);
      } catch (error) {
        CustomizedToast({
          message: `thêm thất bại`,
          type: "ERROR",
        });
        console.log(error);
      }
    },
  });
  return (
    <Paper>
      <Dialog open={Open} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Danh Sách người giao hàng "
            subTitle="Thêm người gia hàng"
            icon={getIcon("fluent:apps-list-detail-20-filled")}
          />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <FormControl sx={{ width: "28.5rem" }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple={true}
                  value={valueTag}
                  onChange={(e) => handleChange(e)}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {listShipperSelectbox.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.account?.profile?.fullName}
                    >
                      <Avatar src={item.account?.profile?.avatar} alt="food" />
                      <Checkbox
                        checked={
                          valueTag.indexOf(item.account?.profile?.fullName) > -1
                        }
                      />
                      <ListItemText primary={item.account?.profile?.fullName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <ButtonCustomize
              nameButton="Thêm"
              marginTop="1.5rem"
              marginLeft="8rem"
              width="12rem"
              type="submit"
            />
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
