import "./App.css";
import { HomeLayout } from "./pages/HomeTemplate/HomeTemplate";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import routesHome from "./route.js";
import Router from "./route.js";
function App() {
  // const showMenuHome = (routes) => {
  //   if (routes && routes.length > 0) {
  //     return routes.map((item, index) => {
  //       const Component = () => {
  //         return item.component;
  //       }
  //       // const Component = item.component;
  //       return (
  //         <Route
  //           path={item.path}
  //           key={index}
  //           index={item.index}
  //           element={
  //             <HomeLayout>
  //               <Component />
  //             </HomeLayout>
  //           }
  //         />
  //       );
  //     });
  //   }
  // };
  return (
    <BrowserRouter>
      {/* <Routes>
        {showMenuHome(Routes)}
      </Routes> */}
      <Router/>
    </BrowserRouter>
  );
}
export default App;
