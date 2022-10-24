import ProductList from "./pages/userList/UserList";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Page404 from "./pages/NotFound/Page404";
import Food from "./pages/Food/Food";
import PackageFood from "./pages/PackageFood/PackageFood";
import NewFood from "./pages/Food/NewFood";
import EditFood from "./pages/Food/EditFood";
import UserDetail from "./pages/userList/UserDetail";
import FindAccount from "./pages/Login/FindAccount";
import SignInOutContainer from "./pages/Login/index";
import VerifyPhone from "./pages/Login/VerifyPhone";
import ChangePassword from "./pages/Login/ChangePassword";

import StationList from "./pages/Station/StationList";
import NewStation from "./pages/Station/NewStation";
import KitchenList from "./pages/Kitchen/KitchenList";
import NewKitchen from "./pages/Kitchen/NewKitchen";
import AdminOrderList from "./pages/AdminOrder/AdminOrderList";
import NewAdminOrder from "./pages/AdminOrder/NewAdminOrder";
import StepDesignPacketFood from "./pages/PackageFood/Step/StepDesignPacketFood";
import ListFoodGroup from "./pages/FoodGroup/ListFoodGroup";
import UpdateStaion from "./pages/Station/UpdateStation";
import UpdateKitchen from "./pages/Kitchen/UpdateKitchen";
import KitchenOrderList from "./pages/KitchenOrder/KitchenOrderList";

import KitchenShipperList from "./pages/KitchenShipper/KitchenShipperList";
import RequestShipper from "./pages/KitchenShipper/RequestShipper";
import KitchenProfile from "./pages/KitchenProfile/KitchenProfile";

import AdminShipperList from "./pages/AdminShipper/AdminShipperList";
import NewShipper from "./pages/AdminShipper/NewShipper";
import UpdateShipper from "./pages/AdminShipper/UpdateShipper";
import NewPackage from "./pages/PackageFood/newPackage";
import EditPackage from "./pages/PackageFood/EditPackage";
import KitchenViewOrderList from "./pages/KitchenViewOrder/KitchenViewOrderList";
import { useEffect } from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";

import NewTimeFrame from "./pages/PackageFood/NewTimeFrame";

// import NewPackageItem from "./pages/PackageFood/NewPacketItem";

import Timeframe from "./pages/PackageFood/timeframe/Timeframe";
// import NewPackageItem from "./pages/PackageFood/NewPacketItem";
import AdminViewFeedBackList from "./pages/AdminViewFeedBack/AdminViewFeedBack";
import UpdateFood from "./pages/FoodGroup/UpdateFood";
import Profile from "./components/Profile/Profile";
import UserAccount from "./pages/userList/UserAccount";
import KitchenAccount from "./pages/userList/KitchenAccount";
import ShipperAccount from "./pages/userList/ShipperAccount";
import ManagerAccount from "./pages/userList/ManagerAccount";
import AdminAccount from "./pages/userList/AdminAccount";

const ProtectedRouteAuthen = ({ redirectPath = "/", roles, children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  var decoded = jwt_decode(token);
  if (token && !decoded.role) {
    return <Navigate to={redirectPath} replace />;
  }
  if (roles.includes(decoded.role)) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <SignInOutContainer />,
      children: [{ path: "/", element: <SignInOutContainer /> }],
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
    //
    {
      path: "/dashboard/admin",
      element: (
        <ProtectedRouteAuthen roles={["admin", "manager"]}>
          <DashboardLayout />
        </ProtectedRouteAuthen>
      ),
      children: [
        { path: "app", element: <Page404 /> },
        { path: "users", element: <ProductList /> },

        { path: "userAccount", element: <UserAccount /> },
        { path: "adminAccount", element: <AdminAccount /> },
        { path: "managerAccount", element: <ManagerAccount /> },
        { path: "shipperAccount", element: <ShipperAccount /> },
        { path: "kitchenAccount", element: <KitchenAccount /> },



        { path: "404", element: <Page404 /> },
        { path: "package", element: <PackageFood /> },
        // { path: "package/:id", element: <EditPackage /> },
        { path: "newpackage", element: <NewPackage /> },
        { path: "newfood", element: <NewFood /> },
        // { path: "food/:id", element: <EditFood /> },
        { path: "users/:id", element: <UserDetail /> },
        { path: "foodGroup", element: <ListFoodGroup /> },

        //admin quản lí Trạm - CURD
        { path: "station", element: <StationList /> },
        { path: "newstation", element: <NewStation /> },
        { path: "station/updatestation/:id", element: <UpdateStaion /> },

        //admin quản lí Kitchen - CURD
        { path: "kitchen", element: <KitchenList /> },
        { path: "newkitchen", element: <NewKitchen /> },
        { path: "kitchen/updatekitchen/:id", element: <UpdateKitchen /> },

        //MANAGER quản lí đơn hàng - VIEW theo ERD
        { path: "adminorder", element: <AdminOrderList /> },
        // { path: "newadminorder", element: <NewAdminOrder /> },

        //admin quản lí shipper
        //CURD + chuyển shipper cho bếp
        { path: "adminshipper", element: <AdminShipperList /> },

        { path: "newshipper", element: <NewShipper /> },
        { path: "updateshipper", element: <UpdateShipper /> },

        //admin xem đánh giá bếp
        {
          path: "adminviewfeedback",
          element: (
            // <ProtectedRouteAuthen role="manager">
            <AdminViewFeedBackList />
            // </ProtectedRouteAuthen>
          ),
        },
        { path: "account/my", element: <Profile /> },
      ],
    },
    //Role Manager
    ///dashboard/manager/newpackage
    {
      path: "/dashboard/manager",
      element: <DashboardLayout />,
      children: [
        // { path: "users", element: <ProductList /> },
        {
          path: "food",
          element: <Food />,
        },
        { path: "404", element: <Page404 /> },
        { path: "package", element: <PackageFood /> },
        { path: "package/:id", element: <EditPackage /> },
        { path: "newpackage", element: <NewPackage /> },
        { path: "login", element: <Page404 /> },
        { path: "register", element: <Page404 /> },
        { path: "newfood", element: <NewFood /> },
        { path: "food/:id", element: <EditFood /> },
        { path: "users/:id", element: <UserDetail /> },
        { path: "foodGroup", element: <ListFoodGroup /> },

        { path: "timeFrame", element: <NewTimeFrame /> },

        //admin quản lí Trạm - CURD
        { path: "station", element: <StationList /> },
        { path: "newstation", element: <NewStation /> },
        { path: "updatestation", element: <UpdateStaion /> },

        //admin quản lí Kitchen - CURD
        { path: "kitchen", element: <KitchenList /> },
        { path: "newkitchen", element: <NewKitchen /> },
        { path: "updatekitchen", element: <UpdateKitchen /> },

        //MANAGER quản lí đơn hàng - VIEW theo ERD
        { path: "adminorder", element: <AdminOrderList /> },
        // { path: "newadminorder", element: <NewAdminOrder /> },
        { path: "account/my", element: <Profile /> },
        //admin quản lí shipper
        //CURD + chuyển shipper cho bếp
        { path: "adminshipper", element: <AdminShipperList /> },

        { path: "newshipper", element: <NewShipper /> },
        { path: "updateshipper", element: <UpdateShipper /> },
        { path: "foodGroup/updatefood/:id", element: <UpdateFood /> },
        { path: "package/updatePackageFood/:id", element: <EditPackage /> },
      ],
    },

    //Role Kitchen
    {
      path: "/dashboard/kitchen",
      element: (
        <ProtectedRouteAuthen roles={["kitchen"]}>
          <DashboardLayout />
        </ProtectedRouteAuthen>
      ),

      children: [
        {
          path: "Listkitchen",
          element: (
            // <ProtectedRouteAuthen>
            <KitchenList />
            // </ProtectedRouteAuthen>
          ),
        },
        {
          path: "newkitchen",
          element: (
            // <ProtectedRouteAuthen>
            <NewKitchen />
          ),
          // </ProtectedRouteAuthen>
        },

        //kitchen xem chuẩn bị món ăn
        {
          path: "kitcheviewnorder",
          element: (
            // <ProtectedRouteAuthen role="kitchen">
            <KitchenViewOrderList />
            // </ProtectedRouteAuthen>
          ),
        },

        //kitchen xem đơn hàng
        {
          path: "kitchenorder",
          element: (
            // <ProtectedRouteAuthen role="kitchen">
            <KitchenOrderList />
            // </ProtectedRouteAuthen>
          ),
        },

        //kitchen quản lí shipper
        //View shipper của cửa hàng + Request shipper
        {
          path: "kitchenshipper",
          element: (
            // <ProtectedRouteAuthen role="admin">
            <KitchenShipperList />
            // </ProtectedRouteAuthen>
          ),
        },
        {
          path: "requestshipper",
          element: (
            // <ProtectedRouteAuthen role="kitchen">
            <RequestShipper />
            // </ProtectedRouteAuthen>
          ),
        },

        //kitchen xem thông tin bếp
        {
          path: "kitchenprofile",
          element: (
            // <ProtectedRouteAuthen role="admin">
            <KitchenProfile />
            // </ProtectedRouteAuthen>
          ),
        },
      ],
    },
    { path: "*", element: <Navigate to="404" replace /> },
  ]);
}
