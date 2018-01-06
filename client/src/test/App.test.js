// libraries
import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

// actions
import { getProducts } from '../actions/product_actions';
import reducers from '../reducers/index';

// components
import { App } from '../components/App';
import Footer from '../components/footer';

//test dependencies
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect'
import enzymify from 'expect-enzyme'

configure({ adapter: new Adapter() });
expect.extend(enzymify());

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      , div);
  });

  it('to be a div', () => {
    const app = shallow(<App />);
    expect(app).toBeA('div');
  });
});
