import React from "react";
import "./topbar.css";
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';



export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin-MeSu</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
           <NotificationsNoneIcon/>
         
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
          <LanguageOutlinedIcon/>
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
          <SettingsOutlinedIcon/>
          </div>
          <img src="" />
        </div>
      </div>
    </div>
  );
}
