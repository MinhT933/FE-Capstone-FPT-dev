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
import account from "../_mock/account";
// hooks

// components

import Scrollbar from "../components/hook-form/Scrollbar";

//

import navConfig from "./../components/sidebar/NavConfig";
import NavSection from "./../components/hook-form/NavSection";
import Logo from "./../components/Logo";
import useResponsive from "./../hooks/useResponsive";

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
        }}
      >
        <Logo />
        <h1>Admin-Mesu</h1>
      </Box>
      <Box sx={{ backgroundColor: "white" }}>
        <Box sx={{ mb: 5, mx: 2.5, backgroundColor: "white" }}>
          <Link underline="none" component={RouterLink} to="#">
            <AccountStyle>
              <Avatar src={account.photoURL} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {account.displayName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {account.role}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </Box>
      </Box>

      <NavSection navConfig={navConfig} sx={{ backgroundColor: "white" }} />

      <Box sx={{ flexGrow: 1, backgroundColor: "white" }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative" }}
        >
          <Box
            component="img"
            src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/302918650_3266017480383457_2186236725953791994_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=Tp-EINlGlcIAX-yq8kj&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT9wnAyZ5meOWF3OoSNdddep9JYEqdLfy9gzOTd7bexIiw&oe=631AD9CD"
            sx={{ width: 100, position: "absolute", top: -50 }}
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
