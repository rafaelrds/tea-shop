import { GET_PRODUCTS } from '../actions/product_actions'

export function productsReducers(state = { products: [] }, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: [ ...action.payload ] }
    default:
      return state;
  }
}
