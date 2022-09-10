
import Home from './pages/home/home.jsx';
import UserList from './pages/userList/UserList';

import ProductList from './pages/userList/UserList';
import { Navigate, useRoutes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.js';
import Page404 from './pages/NotFound/Page404';
import Food from './pages/Food/Food';
import PackageFood from './pages/PackageFood/PackageFood';
import NewPackage from './pages/PackageFood/newPackage';
import NewFood from './pages/Food/NewFood.jsx';
import Login from './pages/Login/login';


  
export default function Router(){
    return useRoutes([
        {
            path: '/',
            element:<DashboardLayout/>,
            children:[{path:'/', element:<Home/>},
            { path:'/login',element:<Login/>}
           ]
        },  
        
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            { path: 'app', element: <Home /> },
            { path: 'users', element: <ProductList /> },
            { path: 'product', element: <Food/>  },
            { path: '404', element: <Page404/> },
            { path: 'package', element: <PackageFood/> },
            { path:'newpackage',element:<NewPackage/>},
            { path: 'login', element: <Page404/> },
            { path: 'register', element: <Page404/> },
            { path:'newfood',element:<NewFood/>},
            // { path:'login',element:<Login/>}
            
          ],
        },
        { path: "*", element: <Navigate to="/404" replace /> },
        
      ]);
}
