import { combineReducers } from 'redux';
import { productsReducers } from './products_reducer';

const rootReducer = combineReducers({
  products: productsReducers
});

export default rootReducer;
