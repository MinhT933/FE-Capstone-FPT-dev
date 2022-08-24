
import Home from './pages/home/home.jsx';
import UserList from './pages/userList/UserList';
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
];
export default routesHome;