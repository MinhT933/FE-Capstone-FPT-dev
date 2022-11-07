import React from "react";
import ButtonCustomize from "../../components/Button/ButtonCustomize";
import PageHeader from "../../components/PageHeader";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import Iconify from "../../components/hook-form/Iconify";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import FormHelperText from "@mui/material/FormHelperText";
import Controls from "./../../components/Control/Controls";
import { useFormik } from "formik";
import { CustomizedToast } from "./../../components/Toast/ToastCustom";
import { URL_API } from "../../Axios/URL_API/URL";
import API from "../../Axios/API/API";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callAPIgetListReq } from "../../redux/action/acction";

export default function ReasionReject(props) {
  const { Open, setOpen, id } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  if (token === null) {
    Navigate("/");
  }
  const dispatch = useDispatch();
  const formik = useFormik({
    //gắn schema để so sánh

    validateOnMount: true,
    validateOnBlur: true,
    //khởi tạo kho để bỏ data vào
    initialValues: {
      rejectReason: "",
    },

    //onSubmit ngay từ cái tên đầu nó dùng đẩy data xuống BE
    onSubmit: async (values) => {
      //formdata.append gg.com => nôm na à đẩy giá trị vào formdata có key là 1 chuỗi
      //value là formik.values.(something you want ) nó giống như muốn vào nhà ai đó thì phải biết tên m trước
      //sau đó mới biết về bản thân m sau nôm na vậy đó hi vọng m hiểu
      const data = {
        rejectReason: formik.values.rejectReason,
      };

      //gọi API để đẩy data xuống
      try {
        const res = await API(
          "PUT",
          URL_API + `/request/reject/${id}`,
          data,
          token
        );
        CustomizedToast({
          message: `Đã từ chối yêu cầu`,
          type: "SUCCESS",
        });
        setOpen(false);
        dispatch(callAPIgetListReq(token));

        // window.location.reload(true);
      } catch (error) {}
    },
  });
  return (
    <Paper>
      <Dialog open={Open} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Lí do Từ chối"
            subTitle="Nhập lí do"
            icon={getIcon("fluent:apps-list-detail-20-filled")}
          />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Controls.Input
              variant="outlined"
              name="rejectReason"
              label="Lí do"
              value={formik.values.rejectReason}
              onChange={(event) => {
                formik.handleChange(event);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rejectReason && formik.errors.rejectReason && (
              <FormHelperText
                error
                id="standard-weight-helper-text-username-login"
              >
                {formik.errors.rejectReason}
              </FormHelperText>
            )}

            <ButtonCustomize
              nameButton="Thêm món"
              marginTop="1.5rem"
              marginLeft="1rem"
              width="12rem"
              type="submit"
            />
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
