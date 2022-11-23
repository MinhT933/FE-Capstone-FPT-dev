import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import Router from "./route.js";
// import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import ThemeProvider from "./theme";
import ScrollToTop from "./components/hook-form/ScrollToTop";
import ToastContainerConfig from "./components/Toast/ToastContainer";
import { UserAuthContextProvider } from "./pages/Login/UserAuthContextProvider";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <ThemeProvider>
          <ScrollToTop />
          <ToastContainerConfig />
          {/* <BaseOptionChartStyle /> */}
          <Router />
        </ThemeProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}
export default App;
