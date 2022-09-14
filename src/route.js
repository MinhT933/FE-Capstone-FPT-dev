
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

import EditFood from './pages/Food/EditFood.jsx';
import UserDetail from './pages/userList/UserDetail';
import ScheduleFood from './pages/Schedule/ScheduleFood';

import FindAccount from './pages/Login/FindAccount.js';
import SignInOutContainer from './pages/Login/index.js';
import VerifyPhone from './pages/Login/VerifyPhone.js';
import ChangePassword from './pages/Login/ChangePassword.js';


  

export default function Router(){
    return useRoutes([
        {
            path: '/',
           element:<DashboardLayout/>,
            children:[{path:'/', element:<Home/>},

         
           ]  

          // { path: 'login', element: <SignInOutContainer/> },
          ]

        },  

        {
          path: '/login',
          element: <SignInOutContainer/>,
        },
        {
          path: '/findaccount',
          element: <FindAccount/>,
        },
        {
          path: '/verifyphone',
          element: <VerifyPhone/>,
        },
        {
          path: '/changepassword',
          element: <ChangePassword/>,
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
            // { path: 'login', element: <Page404/> },
            { path: 'login', element: <SignInOutContainer/> },
            
            { path: 'register', element: <Page404/> },
            { path:'newfood',element:<NewFood/>},
          ],
        },
        { path: "*", element: <Navigate to="/404" replace /> },
        
      ]);
}
