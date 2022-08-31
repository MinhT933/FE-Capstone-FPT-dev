import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PersonIcon from "@mui/icons-material/Person";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HelpIcon from "@mui/icons-material/Help";
import { NavLink } from 'react-router-dom';
const drawerWidth = 200;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Divider />
      <List>
        <ListItem>
          <NavLink to='/product/'
           style={(isActive) => ({
            color: isActive ? "black" : "black",textDecoration: 'none'
          })}>
          <ListItemButton>
            <ListItemIcon sx={{ fontFamily: "arial" }}>
              <LocalDiningIcon sx={{ mr: "20px" }} />
              Sản Phẩm
            </ListItemIcon>
          </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon sx={{ fontFamily: "arial" }}>
              <InsertDriveFileIcon sx={{ mr: "20px" }} />
              Đơn Hàng
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <NavLink to ='/users/'
          style={(isActive) => ({
            color: isActive ? "black" : "black",textDecoration: 'none'
          })} >
          <ListItemButton>
            <ListItemIcon sx={{ fontFamily: "arial" }}>
              <PersonIcon sx={{ mr: "20px" }} />
              Người Mua
            </ListItemIcon>
          </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon sx={{ fontFamily: "arial" }}>
              <QuestionAnswerIcon sx={{ mr: "20px" }} />
              Phản Hồi
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon sx={{ fontFamily: "arial" }}>
              <HelpIcon sx={{ mr: "20px" }} />
              Trợ Giúp
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              pt:"100px"
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt:"65px"
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
