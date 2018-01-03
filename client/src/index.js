// libraries
import React from 'react';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// actions
import { getProducts } from './actions/product_actions';
import reducers from './reducers/index';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
