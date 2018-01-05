import { combineReducers } from 'redux';
import { productsReducers } from './products_reducer';
import { cartReducers } from './cart_reducers'

const rootReducer = combineReducers({
  products: productsReducers,
  cart: cartReducers
});

export default rootReducer;
