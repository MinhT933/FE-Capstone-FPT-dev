import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./redux/store/store";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { createRoot } from "react-dom/client";
// import ReactDOM from 'react-dom';
import { HelmetProvider } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import "simplebar/src/simplebar.css";
// import SetupInterceptors from './service/setupInterceptors';

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk)
//   // other store enhancers if any
// );
const store = createStore(rootReducer);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>

  //  document.getElementById('root')
);

// SetupInterceptors(store);
// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
