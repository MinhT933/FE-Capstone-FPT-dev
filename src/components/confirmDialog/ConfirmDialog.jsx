import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import ButtonCustomize from "./../Button/ButtonCustomize";

function Confirm(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ConfirmDialog(props) {
  const {
    titleDialog,
    content,
    onClick,
    handleClickOpen,
    handleClose,
    open,
    setOpen,
  } = props;
  console.log(content);
  return (
    <div>
      

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={Confirm}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Thông báo
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có muốn thay đổi trạng thái của {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{ color: "red" }}>
            Hủy
          </Button>
          <ButtonCustomize onClick={onClick} nameButton="Xác nhận" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
