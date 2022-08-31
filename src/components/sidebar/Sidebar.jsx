import "./sidebar.css";

import { Link, NavLink } from "react-router-dom";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PeopleIcon from "@mui/icons-material/People";
import SellIcon from "@mui/icons-material/Sell";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản Lí Kho</h3>
          <ul className="sidebarList">
            <NavLink
              style={(isActive) => ({
                color: isActive ? "black" : "black",
              })}
              to="/product"
              className="link"
            >
              <li className="sidebarList">
                <FoodBankIcon className="sidebarIcon" />
                Sản Phẩm
              </li>
            </NavLink>
            <NavLink
              style={(isActive) => ({
                color: isActive ? "black" : "black",
              })}
              to="/"
              className="link"
            >
              <li className="sidebarListItem">
                <InsertDriveFileIcon className="sidebarIcon" />
                Đơn Hàng
              </li>
            </NavLink>
          </ul>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quản lí người dùng</h3>
            <ul className="sidebarList">
              <NavLink
                style={(isActive) => ({
                  color: isActive ? "black" : "black",
                })}
                to="/users"
                className="link"
              >
                <li className="sidebarListItem">
                  <PeopleIcon className="sidebarIcon" />
                  Người Mua
                </li>
              </NavLink>
              <NavLink
                style={(isActive) => ({
                  color: isActive ? "black" : "black",
                })}
                to="/"
                className="link"
              >
                <li className="sidebarListItem">
                  <SellIcon className="sidebarIcon" />
                  Người Bán
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
