// component
import Iconify from "../../components/hook-form/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Trang Chủ",
    path: "/dashboard/admin/app",
    icon: getIcon("eva:pie-chart-2-fill"),
    // component: Home
  },
  {
    title: "sản phẩm",
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
    // s
  },

  {
    title: "Người giao hàng",
    path: "/dashboard/admin/404",
    icon: getIcon("carbon:delivery"),
  },
  {
    title: "Lịch trình",
    path: "/dashboard/kitchen/schedule",
    icon: getIcon("ant-design:schedule-outlined"),
  },
  {
    title: "Trạm",
    path: "/dashboard/admin/station",
    icon: getIcon("carbon:location-company"),
  },


  // {
  //   title: "Admin quản lí đơn hàng",
  //   path: "/dashboard/admin/adminorder",
  //   icon: getIcon("icon-park-outline:transaction-order"),
  // },

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


  {
    title: "Bếp quản lí đơn hàng",
    path: "/dashboard/kitchen/kitchenorder",
    icon: getIcon("eos-icons:subscription-management"),
  },
  {
    title: "Bếp xem bếp",
    path: "/dashboard/kitchen/kitchen",
    icon: getIcon("mdi:card-account-details-star-outline"),
  },
  {
    title: "Bếp xem thông tin bếp",
    path: "/dashboard/kitchen/kitchenprofile",
    icon: getIcon("mdi:card-account-details-star-outline"),
  },
  {
    title: "Bếp quản lí Người giao hàng",
    path: "/dashboard/kitchen/kitchenshipper",
    icon: getIcon("carbon:delivery"),
  },
  // {
  //   title: 'register',
  //   path: '/dashboard/admin/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
];

export default navConfig;
