
import Home from './pages/home/home.jsx';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import ProductList from './pages/Product/ProductList';
import { useRoutes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.js';


export default function Router(){
    return useRoutes([
        // {
        //     path: '/',
        
        //     children:[{path:'/', element:<Home/>}]
        // },
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            { path: 'app', element: <Home /> },
            { path: 'users', element: <UserList /> },
            { path: 'product', element: <ProductList /> },
          ],
        }]);
}



// const routesHome = [
// {
//     path: "/",
//     index: true,
//     component: Home,

// },
// {
//     path: "/users",
//     index: false,
//     component: UserList,
// },
// {
//     path: "/users/detail",
//     index: false,
//     component: User,
// },
// {
//     path: "/products",
//     index: false,
//     component: ProductList,
// },
// ];
// export default routesHome;