import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_REJECTED = 'GET_PRODUCTS_REJECTED';

export function getProducts() {
  return function(dispatch) {
    axios.get('/api/products')
      .then(function(response) {
        dispatch({type: GET_PRODUCTS, payload: response.data});
      })
      .catch(function(err) {
        dispatch({type: GET_PRODUCTS_REJECTED, payload:"there was an error while getting products"});
      })
  }
}
