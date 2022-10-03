import ProductList from "./pages/userList/UserList";
import { Navigate, useRoutes } from "react-router-dom";
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
import AdminViewFeedBackList from './pages/AdminViewFeedBack/AdminViewFeedBackList';
import KitchenViewOrderList from './pages/KitchenViewOrder/KitchenViewOrderList';

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
        { path: "package/:id", element: <EditPackage /> },
        { path: "newpackage", element: <NewPackage /> },
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
        // { path: "newadminorder", element: <NewAdminOrder /> },

        //admin quản lí shipper
        //CURD + chuyển shipper cho bếp
        { path: "adminshipper", element: <AdminShipperList /> },

        { path: "newshipper", element: <NewShipper /> },
        { path: "updateshipper", element: <UpdateShipper /> },

        //admin xem đánh giá bếp
        { path: "adminviewfeedback", element: <AdminViewFeedBackList /> },
      ],
    },

    //Role Kitchen
    {
      path: "/dashboard/kitchen",
      element: <DashboardLayout />,
      children: [
        { path: "kitchen", element: <KitchenList /> },
        { path: "newkitchen", element: <NewKitchen /> },

        //kitchen xem chuẩn bị món ăn
        { path: "kitcheviewnorder", element: <KitchenViewOrderList /> },

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
