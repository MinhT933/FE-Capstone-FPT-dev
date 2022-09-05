
import Home from './pages/home/home.jsx';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import ProductList from './pages/Product/ProductList';
import { useRoutes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.js';
import Page404 from './pages/NotFound/Page404';


export default function Router(){
    return useRoutes([
        {
            path: '/',
            element:<DashboardLayout/>,
            children:[{path:'/', element:<Home/>}]
        },
        
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            { path: 'app', element: <Home /> },
            { path: 'users', element: <UserList /> },
            { path: 'product', element: <ProductList /> },
            { path: '404', element: <Page404/> },
            { path: 'blog', element: <Page404/> },
            { path: 'login', element: <Page404/> },
            { path: 'register', element: <Page404/> },
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