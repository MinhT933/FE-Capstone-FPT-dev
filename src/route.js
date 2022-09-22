import Home from "./pages/home/home.jsx";
import ProductList from "./pages/userList/UserList";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.js";
import Page404 from "./pages/NotFound/Page404";
import Food from "./pages/Food/Food";
import PackageFood from "./pages/PackageFood/PackageFood";
import NewPackage from "./pages/PackageFood/newPackage";
import NewFood from "./pages/Food/NewFood.jsx";
import EditFood from "./pages/Food/EditFood.jsx";
import UserDetail from "./pages/userList/UserDetail";
import ScheduleFood from "./pages/Schedule/ScheduleFood";
import FindAccount from "./pages/Login/FindAccount.js";
import SignInOutContainer from "./pages/Login/index.js";
import VerifyPhone from "./pages/Login/VerifyPhone.js";
import ChangePassword from "./pages/Login/ChangePassword.js";

import TabsPacket from "./pages/PackageFood/Tabs/ColorTabs.js";

import StationList from "./pages/Station/StationList";
import NewStation from "./pages/Station/NewStation.jsx";

import KitchenList from "./pages/Kitchen/KitchenList";
import NewKitchen from "./pages/Kitchen/NewKitchen";


import AdminOrderList from "./pages/AdminOrder/AdminOrderList";
import NewAdminOrder from "./pages/AdminOrder/NewAdminOrder";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      path: "/login",
      element: <SignInOutContainer />,
    },
    {
      path: "/findaccount",
      element: <FindAccount />,
    },
    {
      path: "/verifyphone",
      element: <VerifyPhone />,
    },
    {
      path: "/changepassword",
      element: <ChangePassword />,
    },

    //Role Admin
    {
      path: "/dashboard/admin",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <Home /> },
        { path: "users", element: <ProductList /> },
        { path: "product", element: <Food /> },
        { path: "404", element: <Page404 /> },
        { path: "package", element: <PackageFood /> },
        { path: "newpackage", element: <TabsPacket /> },
        { path: "login", element: <Page404 /> },
        { path: "register", element: <Page404 /> },
        { path: "newfood", element: <NewFood /> },
        { path: "product/:id", element: <EditFood /> },
        { path: "users/:id", element: <UserDetail /> },

        { path: "station", element: <StationList /> },
        { path: "newstation", element: <NewStation /> },

        { path: "kitchen", element: <KitchenList /> },
        { path: "newkitchen", element: <NewKitchen /> },


        { path: "adminorder", element: <AdminOrderList /> },
        { path: "newadminorder", element: <NewAdminOrder /> },
      ],
    },

    //Role Kitchen
    {
      path: "/dashboard/kitchen",
      element: <DashboardLayout />,
      children: [
        { path: "kitchen", element: <KitchenList /> },
        { path: "newkitchen", element: <NewKitchen /> },

      ],
    },


    // {
    //   path: "/dashboard/kitchen",
    //   element: <DashboardLayout />,
    //   children: [
    //     { path: "schedule", element: <ScheduleFood /> },
    //     { path: "order", element: <Page404 /> },
    //   ],
    // },

    { path: "*", element: <Navigate to="404" replace /> },
  ]);
}
