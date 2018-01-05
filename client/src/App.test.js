// libraries
import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

// actions
import { getProducts } from './actions/product_actions';
import reducers from './reducers/index';

// component
import { App } from './components/App';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , div);

});
