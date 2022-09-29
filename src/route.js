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

import StationList from "./pages/Station/StationList";
import NewStation from "./pages/Station/NewStation.jsx";
import KitchenList from "./pages/Kitchen/KitchenList";
import NewKitchen from "./pages/Kitchen/NewKitchen";
import AdminOrderList from "./pages/AdminOrder/AdminOrderList";
import NewAdminOrder from "./pages/AdminOrder/NewAdminOrder";
import StepDesignPacketFood from "./pages/PackageFood/Step/StepDesignPacketFood.jsx";
import ListFoodGroup from "./pages/FoodGroup/ListFoodGroup.jsx";
import UpdateStaion from "./pages/Station/UpdateStation.jsx";
import UpdateKitchen from "./pages/Kitchen/UpdateKitchen.jsx";
import KitchenOrderList from "./pages/KitchenOrder/KitchenOrderList.jsx";

import KitchenShipperList from "./pages/KitchenShipper/KitchenShipperList.jsx";
import RequestShipper from "./pages/KitchenShipper/RequestShipper.jsx";
import KitchenProfile from "./pages/KitchenProfile/KitchenProfile.jsx";

import AdminShipperList from "./pages/AdminShipper/AdminShipperList.jsx";
import NewShipper from "./pages/AdminShipper/NewShipper.jsx";
import UpdateShipper from "./pages/AdminShipper/UpdateShipper.jsx";


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
    {
      path: "/dashboard/admin",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <Page404 /> },
        { path: "users", element: <ProductList /> },
        { path: "food", element: <Food /> },
        { path: "404", element: <Page404 /> },
        { path: "package", element: <PackageFood /> },
        { path: "newpackage", element: <StepDesignPacketFood /> },
        { path: "login", element: <Page404 /> },
        { path: "register", element: <Page404 /> },
        { path: "newfood", element: <NewFood /> },
        { path: "food/:id", element: <EditFood /> },
        { path: "users/:id", element: <UserDetail /> },
        { path: "foodGroup", element: <ListFoodGroup /> },

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
        { path: "newadminorder", element: <NewAdminOrder /> },

        //admin quản lí shipper
        //CURD + chuyển shipper cho bếp
        { path: "adminshipper", element: <AdminShipperList /> },

        { path: "newshipper", element: <NewShipper /> },
        { path: "updateshipper", element: <UpdateShipper /> },



      ],
    },

    //Role Kitchen
    {
      path: "/dashboard/kitchen",
      element: <DashboardLayout />,
      children: [
        { path: "kitchen", element: <KitchenList /> },
        { path: "newkitchen", element: <NewKitchen /> },
        //kitchen xem đơn hàng
        { path: "kitchenorder", element: <KitchenOrderList /> },

        //kitchen quản lí shipper
        //View shipper của cửa hàng + Request shipper
        { path: "kitchenshipper", element: <KitchenShipperList /> },
        { path: "requestshipper", element: <RequestShipper /> },

        //kitchen xem thông tin bếp
        { path: "kitchenprofile", element: <KitchenProfile /> },
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
