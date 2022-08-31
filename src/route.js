
import Home from './pages/home/home.jsx';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import ProductList from './pages/Product/ProductList';

const routesHome = [
{
    path: "/",
    index: true,
    component: Home,

},
{
    path: "/users",
    index: false,
    component: UserList,
},
{
    path: "/users/detail",
    index: false,
    component: User,
},
{
    path: "/product",
    index: false,
    component: ProductList,
},
];
export default routesHome;