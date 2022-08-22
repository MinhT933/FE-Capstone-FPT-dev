import "./sidebar.css";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarList">
                {/* <LineStyle className="sidebarIcon" /> */}
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              {/* <Timeline className="sidebarIcon" /> */}
              Analytics
            </li>
            <Link to = "/TravelTour" className="link">
            <li className="sidebarListItem">
            {/* <DirectionsWalk className="sidebarIcon" /> */}
            tour
          </li>
            </Link>
          </ul>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  {/* <PermIdentity className="sidebarIcon" /> */}
                  Users
                </li>
              </Link>
              <Link to="/Tour" className="link">
              <li className="sidebarListItem">
                {/* <AccountCircle className="sidebarIcon" /> */}
                Tourguide
              </li>
              </Link>
             <Link to="/Booking" className="link">
             <li className="sidebarListItem">
                {/* <AttachMoney className="sidebarIcon" /> */}
                Booking
              </li>
             </Link>
              <li className="sidebarListItem">
                {/* <BarChart className="sidebarIcon" /> */}
                Reports
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                {/* <MailOutline className="sidebarIcon" /> */}
                Mail
              </li>
              <li className="sidebarListItem">
                {/* <DynamicFeed className="sidebarIcon" /> */}
                Feedback
              </li>
              <li className="sidebarListItem">
                {/* <ChatBubbleOutline className="sidebarIcon" /> */}
                Messages
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                {/* <WorkOutline className="sidebarIcon" /> */}
                Manage
              </li>
              <li className="sidebarListItem">
                {/* <Timeline className="sidebarIcon" /> */}
                Analytics
              </li>
              <li className="sidebarListItem">
                {/* <Report className="sidebarIcon" /> */}
                Reports
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
