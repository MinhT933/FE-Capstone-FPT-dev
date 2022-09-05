// component
import Iconify from '../../components/hook-form/Iconify';


// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    // component: Home
  },
  {
    title: 'user',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
    // s
  },
  {
    title: 'product',
    path: '/dashboard/product',
    icon: getIcon('eva:shopping-bag-fill'),
    // component:ProductList,
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
