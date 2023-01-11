// component

import Iconify from "../../components/hook-form/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigManager = [
  {
    // title: "Sản phẩm",
    // icon: getIcon("tabler:building-warehouse"),
    // children: [
    //   {
    title: "Món ăn",
    path: "/dashboard/manager/food",
    icon: getIcon("ep:food"),
  },
  {
    title: "Nhóm thức ăn",
    path: "/dashboard/manager/foodGroup",
    icon: getIcon("clarity:blocks-group-line"),
  },
  {
    title: "Gói ăn",
    path: "/dashboard/manager/package",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "Khung thời gian - phân loại",
    path: "/dashboard/manager/timeframe-category",
    icon: getIcon("material-symbols:category-outline"),
  },
  {
    title: "Danh sách chuyến giao hàng",
    path: "/dashboard/manager/ListDelivery",
    icon: getIcon("mdi:language-go"),
  },

  // ],
  // },
];

const navConfigAdmin = [
  {
    title: "Trang Chủ",
    path: "/dashboard/admin/app",
    icon: getIcon("eva:pie-chart-2-fill"),
    // component: Home
  },
  {
    title: "Đơn hàng",
    path: "/dashboard/admin/adminorder",
    icon: getIcon("eos-icons:subscription-management"),
  },

  // {
  //   title: "Sản phẩm",
  //   icon: getIcon("tabler:building-warehouse"),
  //   children: [
  //     // {
  //     //   title: "Thức ăn",
  //     //   path: "/dashboard/admin/food",
  //     //   icon: getIcon("ep:food"),
  //     // },
  //     {
  //       title: "Nhóm thức ăn",
  //       path: "/dashboard/admin/foodGroup",
  //       icon: getIcon("clarity:blocks-group-line"),
  //     },
  //     {
  //       title: "Gói ăn",
  //       path: "/dashboard/admin/package",
  //       icon: getIcon("eva:shopping-bag-fill"),
  //     },
  //   ],
  // },
  // {
  //   title: "Gói ăn",
  //   path: "/dashboard/admin/package",
  //   icon: getIcon("eva:shopping-bag-fill"),
  // },
  // {
  //   title: "Người Dùng",
  //   path: "/dashboard/admin/users",
  //   icon: getIcon("eva:people-fill"),
  // },

  {
    title: "Tài Khoản",
    icon: getIcon("bxs:user-detail"),
    children: [
      {
        title: "Khách hàng",
        path: "/dashboard/admin/userAccount",
        icon: getIcon("eva:people-fill"),
      },
      //admin
      {
        title: "Quản trị viên",
        path: "/dashboard/admin/adminAccount",
        icon: getIcon("ic:round-manage-accounts"),
      },

      //manager
      {
        title: "Quản lí",
        path: "/dashboard/admin/managerAccount",
        icon: getIcon("wpf:administrator"),
      },
    ],
  },

  // {
  //   title: "Người giao hàng",
  //   path: "/dashboard/admin/shipperAccount",
  //   icon: getIcon("carbon:delivery"),
  // },
  {
    title: "Người giao hàng",
    path: "/dashboard/admin/adminshipper",
    icon: getIcon("carbon:delivery"),
  },
  {
    title: "Trạm",
    path: "/dashboard/admin/station",
    icon: getIcon("carbon:location-company"),
  },

  {
    title: "Quản lí bếp",
    path: "/dashboard/admin/kitchen",
    icon: getIcon("fa6-solid:kitchen-set"),
  },
  // {
  //   title: "Admin xem đánh giá",
  //   path: "/dashboard/admin/adminviewfeedback",
  //   icon: getIcon("teenyicons:star-circle-outline"),
  // },
  // {
  //   title: "Quản lí bếp",
  //   path: "/dashboard/admin/kitchenAccount",
  //   icon: getIcon("fa6-solid:kitchen-set"),
  // },
];

const navConfigKichen = [
  // {
  //   title: "Bếp xem bếp",
  //   path: "/dashboard/kitchen/Listkitchen",
  //   icon: getIcon("mdi:card-account-details-star-outline"),
  // },

  {
    title: "Bếp quản lí Người giao hàng",
    path: "/dashboard/kitchen/kitchenshipper",
    icon: getIcon("carbon:delivery"),
  },
  // {
  //   title: "Chuẩn bị món ăn theo ngày",
  //   path: "/dashboard/kitchen/kitchenorder",
  //   icon: getIcon("ic:outline-restaurant-menu"),
  // },
  // {
  //   title: "Chuyến giao hàng",
  //   path: "/dashboard/kitchen/createTrip",
  //   icon: getIcon("ic:outline-restaurant-menu"),
  // },
  // {
  //   title: "Đơn hàng theo ngày",
  //   path: "/dashboard/kitchen/kitcheviewnorder",
  //   icon: getIcon("eos-icons:subscription-management"),
  // },
  // {
  //   title: "Món ăn chuẩn bị theo tuần",
  //   path: "/dashboard/kitchen/kitcheViewOrderByWeek",
  //   icon: getIcon("healthicons:i-schedule-school-date-time"),
  // },
  {
    title: "Phiên làm việc",
    path: "/dashboard/kitchen/session",
    icon: getIcon("healthicons:i-schedule-school-date-time"),
  },
];
const navConfig = [
  {
    title: "Trang Chủ",
    path: "/dashboard/admin/app",
    icon: getIcon("eva:pie-chart-2-fill"),
    // component: Home
  },
  {
    title: "Sản phẩm",
    icon: getIcon("tabler:building-warehouse"),
    children: [
      {
        title: "Thức ăn",
        path: "/dashboard/admin/food",
        icon: getIcon("ep:food"),
      },
      {
        title: "Nhóm thức ăn",
        path: "/dashboard/admin/foodGroup",
        icon: getIcon("clarity:blocks-group-line"),
      },
      {
        title: "Gói ăn",
        path: "/dashboard/admin/package",
        icon: getIcon("eva:shopping-bag-fill"),
      },
    ],
  },
  {
    title: "Người Dùng",
    path: "/dashboard/admin/users",
    icon: getIcon("eva:people-fill"),
  },

  {
    title: "Người giao hàng",
    path: "/dashboard/admin/404",
    icon: getIcon("carbon:delivery"),
  },
  {
    title: "Trạm",
    path: "/dashboard/admin/station",
    icon: getIcon("carbon:location-company"),
  },

  {
    title: "Admin quản lí đơn hàng",
    path: "/dashboard/admin/adminorder",
    icon: getIcon("eos-icons:subscription-management"),
  },

  {
    title: "Admin xem bếp",
    path: "/dashboard/admin/kitchen",
    icon: getIcon("fa6-solid:kitchen-set"),
  },
  {
    title: "Admin quản lí Người giao hàng",
    path: "/dashboard/admin/adminshipper",
    icon: getIcon("carbon:delivery"),
  },
  //=========================================================
  {
    title: "Admin xem đánh giá",
    path: "/dashboard/admin/adminviewfeedback",
    icon: getIcon("teenyicons:star-circle-outline"),
  },
  //=========================================================
  {
    title: "Bếp chuẩn bị món ăn",
    path: "/dashboard/kitchen/kitchenorder",
    icon: getIcon("ic:outline-restaurant-menu"),
  },

  {
    title: "Bếp quản lí đơn hàng",
    path: "/dashboard/kitchen/kitcheviewnorder",
    icon: getIcon("eos-icons:subscription-management"),
  },
];
const exportedObject = {
  navConfig,
  navConfigAdmin,
  navConfigKichen,
  navConfigManager,
};
export default exportedObject;
