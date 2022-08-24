import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './store/store';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <BrowserRouter> */}
       <App />
    {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

