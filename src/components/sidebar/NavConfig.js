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
        title: "Gói ăn",
        path: "/dashboard/admin/package",
        icon: getIcon("eva:shopping-bag-fill"),
      },
      {
        title: "Thức ăn",
        path: "/dashboard/admin/product",
        icon: getIcon("ep:food"),
      },
      {
        title: "Nhóm thức ăn",
        path: "/dashboard/admin/foodGroup",
        icon: getIcon("clarity:blocks-group-line"),
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
    title: "Trạm",
    path: "/dashboard/admin/station",
    icon: getIcon("carbon:location-company"),
  },
  {
    title: "Người giao hàng",
    path: "/dashboard/admin/product",
    icon: getIcon("carbon:delivery"),
  },
  {
    title: "Lịch trình",
    path: "/dashboard/kichen/schedule",
    icon: getIcon("ant-design:schedule-outlined"),
  },
  {
    title: "Quản lí đơn hàng",
    path: "/dashboard/kichen/order",
    icon: getIcon("icon-park-outline:transaction-order"),
  },

  {
    title: "bếp",
    path: "/dashboard/admin/time",
    icon: getIcon("fa6-solid:kitchen-set"),
  },
  // {
  //   title: 'register',
  //   path: '/dashboard/admin/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
];

export default navConfig;
