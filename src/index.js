import React from 'react';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './redux/store/store';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {createRoot} from 'react-dom/client';
import ReactDOM from 'react-dom';
import { HelmetProvider } from "react-helmet-async";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
ReactDOM.render(
  
    <Provider store={store}>
       <HelmetProvider>
        <App />
    </HelmetProvider>
    </Provider>,
 
   document.getElementById('root')
);

