import { useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// component
import Iconify from "../../../components/hook-form/Iconify";
import DnDFoodGroup from "../../../pages/FoodGroup/DnDFoodGroup";
import Button from "@mui/material/Button";

// ----------------------------------------------------------------------

export default function GroupMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id, path } = props;
  const location = useLocation();
  const [OpenPopUp, SetOpenPopUp] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: "30%", maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          onClick={() => {
            SetOpenPopUp(true);
          }}
        >
          Cập nhập trạng thái
        </Button>
        <MenuItem sx={{ color: "text.secondary" }}></MenuItem>
        <MenuItem
          component={RouterLink}
          to={`${location.pathname}/${id}`}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Cập nhật"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
      {/* <DnDFoodGroup openPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} /> */}
    </>
  );
}
