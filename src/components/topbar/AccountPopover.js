import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/hook-form/MenuPopover";
// mocks_
// import account from "../../_mock/account";
import { useDispatch } from "react-redux";
import { callAPIProfile, LogOut } from "../../redux/action/acction";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------
// const token = localStorage.getItem("token");
// const decode = jwt_decode(token);

// ----------------------------------------------------------------------

export default function AccountPopover() {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  // const handleLink = () => {
  //   let text = "";
  //   let arr = [];
  //   if (decoded.role === "admin") {
  //     text = "/dashboard/admin/app";
  //     arr.push(text);
  //   } else if (decoded.role === "manager") {
  //     text = "/dashboard/manager/food";
  //     arr.push(text);
  //   } else if (decoded.role === "kitchen") {
  //     text = "/dashboard/kitchen/kitchenorder";
  //     arr.push(text);
  //   }
  //   return arr;
  // };
  const handleClose = () => {
    setOpen(null);
  };
  const MENU_OPTIONS = [
    // {
    //   label: "Home",
    //   icon: "eva:home-fill",
    //   linkTo: { handleLink },
    // },
    {
      label: "Trang cá nhân",
      icon: "eva:person-fill",
      linkTo: `/dashboard/${decoded.role}/account/my`,
    },
    {
      label: "Đổi mật khẩu",
      icon: "eva:settings-2-fill",
      linkTo: "/changepassword",
    },
  ];
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    dispatch(LogOut(token, navigate));
  };

  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await callAPIProfile(token));
    };
    callAPI();
  }, [dispatch]);

  const profiles = useSelector((state) => {
    return state.userReducer.profiles;
  });
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              // bgcolor: (theme) => alpha(theme.palette.white[900], 0.8),
            },
          }),
        }}
      >
        {/* <Avatar src={account.photoURL} alt="photoURL" /> */}
        <Avatar src={profiles.profile?.avatar} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profiles.profile?.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {profiles.profile?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1 }}
          // component={RouterLink}
          // to="/"
        >
          Đăng xuất
        </MenuItem>
      </MenuPopover>
    </>
  );
}
