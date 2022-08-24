import "./App.css";
import HomeTemplate, { HomeLayout } from "./pages/HomeTemplate/HomeTemplate";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/home/home";
import routesHome from "./route.js";
import { combineReducers } from "redux";
function App() {
  const showMenuHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        const Component = item.component;
        return (
          // <HomeTemplate
          //   key={index}
          //   exact={item.exact}
          //   path={item.path}
          //   Component={item.component}
          // />
          <Route
            path={item.path}
            key={index}
            index={item.index}
            element={
              <HomeLayout>
                <Component />
              </HomeLayout>
            }
          />
        );
      });
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        {showMenuHome(routesHome)}
        {/* <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="user" element={<UserList />}>
            <Route path=":userID" element={<User />} />
          </Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
