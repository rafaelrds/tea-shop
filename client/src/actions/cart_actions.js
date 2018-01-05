import axios from 'axios';

export const GET_CART = 'GET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const GET_CART_REJECTED = 'GET_CART_REJECTED';
export const ADD_TO_CART_REJECTED = 'ADD_TO_CART_REJECTED';
export const UPDATE_CART_REJECTED = 'UPDATE_CART_REJECTED';
export const DELETE_FROM_CART_REJECTED = 'DELETE_FROM_CART_REJECTED';

export function getCart() {
  return function (dispatch) {
    axios.get('/api/cart')
      .then(function (response) {
        dispatch({ type: GET_CART, payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: GET_CART_REJECTED, msg: "Error while getting CART!" })
      });
  }
}

export function addToCart(cart) {
  return function (dispatch) {
    axios.post("/api/cart", cart)
      .then(function (response) {
        dispatch({ type: ADD_TO_CART, payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: ADD_TO_CART_REJECTED, msg: 'Error while adding to CART!' })
      });
  }
}

export function updateCart(_id, amount, cart) {
  const currentProductToUpdate = cart;
  // Finds which index of product to update
  const indexToUpdate = currentProductToUpdate.findIndex((product) => product._id === _id);

  const newProductToUpdate = {
    ...currentProductToUpdate[ indexToUpdate ],
    quantity: currentProductToUpdate[ indexToUpdate ].quantity + amount
  };

  let cartUpdate = [ ...currentProductToUpdate.slice(0, indexToUpdate), newProductToUpdate,
  ...currentProductToUpdate.slice(indexToUpdate + 1) ];
  return function (dispatch) {
    axios.post("/api/cart", cartUpdate)
      .then(function (response) {
        dispatch({ type: UPDATE_CART, payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: UPDATE_CART_REJECTED, msg: 'Error while updating the CART!' })
      });
  }
}

export function deleteFromCart(cart) {
  return function (dispatch) {
    axios.post("/api/cart", cart)
      .then(function (response) {
        dispatch({ type: DELETE_FROM_CART, payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: DELETE_FROM_CART_REJECTED, msg: 'Error while deleting from CART!' })
      })
  }
}