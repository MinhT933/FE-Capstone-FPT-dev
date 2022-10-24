import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// mock
// import account from "../_mock/account";
// hooks

// components

import Scrollbar from "../components/hook-form/Scrollbar";

//

import navConfig from "./../components/sidebar/NavConfig";
import navConfigKichen from "./../components/sidebar/NavConfig";
import navConfigManager from "./../components/sidebar/NavConfig";

import navConfigAdmin from "./../components/sidebar/NavConfig";
import NavSection from "./../components/hook-form/NavSection";
import Logo from "./../components/Logo";
import useResponsive from "./../hooks/useResponsive";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { callAPIProfile } from "../redux/action/acction";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIProfile(token));
    };
    callAPI();
  }, [dispatch]);

  const profiles = useSelector((state) => {
    return state.userReducer.profiles;
  });

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "inline-flex",
          backgroundColor: "white",
          // marginLeft: 5,
        }}
      >
        <Logo />
        <h1>Mesup</h1>
      </Box>
      <Box sx={{ backgroundColor: "white" }}>
        <Box sx={{ mb: 5, mx: 2.5, backgroundColor: "white" }}>
          <Link
            underline="none"
            component={RouterLink}
            to={`/dashboard/${decode.role}/account/my`}
          >
            <AccountStyle>
              <Avatar src={profiles.profile?.avatar} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {profiles.profile?.fullName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {profiles.profile?.email}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </Box>
      </Box>

      <NavSection
        navConfig={navConfig}
        navConfigAdmin={navConfigAdmin}
        navConfigKichen={navConfigKichen}
        navConfigManager={navConfigManager}
        sx={{ backgroundColor: "white" }}
      />

      <Box sx={{ flexGrow: 1, backgroundColor: "white" }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative" }}
        >
          <Box
            component="img"
            src="/static/logo7.png"
            alt="dâdad"
            sx={{ width: 200, position: "absolute", top: -90 }}
          />
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
