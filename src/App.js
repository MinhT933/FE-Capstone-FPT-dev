
import './App.css';
import HomeTemplate from './pages/HomeTemplate/HomeTemplate';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/home/home';
import routesHome from './route.js';
function App() {
  const showMenuHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );  
      });
    }
  };
    return (
    <BrowserRouter>
      <Routes>
      {showMenuHome(routesHome)}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="user" element={<UserList />}>
            <Route path=":userID" element={<User />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
