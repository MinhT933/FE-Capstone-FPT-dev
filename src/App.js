import "./App.css";
import { HomeLayout } from "./pages/HomeTemplate/HomeTemplate";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import routesHome from "./route.js";
import Router from "./route.js";
function App() {

  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  );
}
export default App;
