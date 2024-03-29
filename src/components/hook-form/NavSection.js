import { useState } from "react";
import PropTypes from "prop-types";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
//
import Iconify from "./Iconify";

import jwt_decode from "jwt-decode";

// import { Navigate, Outlet, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "#FFCC33",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const activeSubStyle = {
    color: "#FFCC33",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        {/* menu multipe  */}
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={
              open
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>
        {/* map với navConfig */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ left: "7%" }}>
            {children.map((item) => {
              const { title, path, icon } = item;
              const isActiveSub = active(path);
              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  icon={icon}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(2)",
                          bgcolor: "primary.main",
                          // icon:{icon}
                        }),
                      }}
                    />
                    <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
  navConfigAdmin: PropTypes.array,
};

//NavSection
export default function NavSection({
  navConfig,
  navConfigAdmin,
  navConfigKichen,
  navConfigManager,
  ...other
}) {
  const { pathname } = useLocation();
  const Navigate = useNavigate();
  const checkRole = () => {
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
    // var decoded = jwt_decode(token);

    switch (decoded.role) {
      case "admin":
        return navConfig.navConfigAdmin;
        break;
      case "manager":
        return navConfig.navConfigManager;
        break;
      case "kitchen":
        return navConfig.navConfigKichen;
        break;
      default:
        break;
    }
  };

  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;
  return (
    <Box {...other} sx={{ backgroundColor: "white" }}>
      {
        <List disablePadding sx={{ p: 1 }}>
          {checkRole()?.map((item) => (
            <NavItem key={item.title} item={item} active={match} />
          ))}
        </List>
      }
    </Box>
  );
}
