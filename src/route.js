
import Home from './pages/home/home';
import UserList from './pages/userList/UserList';
const routesHome = [
{
    path: "/",
    exact: true,
    component: Home,

},
{
    path: "/users",
    exact: false,
    component: UserList,
},
];
export default { routesHome };