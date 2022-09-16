import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import Router from "./route.js";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import ThemeProvider from "./theme";
import ScrollToTop from './components/hook-form/ScrollToTop';
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop/>
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
