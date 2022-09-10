// component
import Iconify from '../../components/hook-form/Iconify';


// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Trang Chủ',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    // component: Home
  },
   {
    title:'sản phẩm',
    icon:getIcon('tabler:building-warehouse'),
    children:[
      {
        title: 'Gói ăn',
        path: '/dashboard/package',
        icon: getIcon('eva:shopping-bag-fill'),
        
      },
        {
          title: 'Thức ăn',
          path: '/dashboard/product',
          icon: getIcon('ep:food'),
        
        },
       
    ]
   },
  {
    title: 'Người Dùng',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
    // s
  },
  {
    title: 'login',
    path: '/dashboard/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/dashboard/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/dashboard/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
