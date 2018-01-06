// libraries
import React from 'react';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// actions
import reducers from './reducers/index';

// main component and css
import './index.css';
import { App } from './components/App';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
