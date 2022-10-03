import toast from 'react-hot-toast';
import { handleLocalCart } from '../../utils/cart';
import { getLocalStorage } from '../../utils/localStorage';
import { OPEN_CART, CLOSE_CART, CLEAR_CART, GET_CARTS } from './type';

export const getCarts = () => async (dispatch) => {
  let data = [];
  data = getLocalStorage('cart');
  dispatch({
    type: GET_CARTS,
    payload: data,
  });
  if (data.length === 0) dispatch(closeCartCanvas());
};

export const addToCart =
  (product, qty = 1) =>
  async (dispatch, getState) => {
    const {
      cart: { products },
    } = getState();
    let data = [];
    data = await handleLocalCart({ ...product, qty }, products, true);
    dispatch({
      type: GET_CARTS,
      payload: data,
    });
  };

export const decreaseCartItem =
  (product, qty = 1) =>
  async (dispatch, getState) => {
    const {
      cart: { products },
    } = getState();
    let data = [];
    data = await handleLocalCart({ ...product, qty }, products);
    dispatch({
      type: GET_CARTS,
      payload: data,
    });
  };

export const removeCartItem = (id, variantId) => async (dispatch, getState) => {
  const {
    cart: { products },
  } = getState();
  let data = [];
  data = variantId
    ? await products.filter((product) => product?.hasCombination?.id !== variantId)
    : await products.filter((product) => product.id !== id);
  dispatch({
    type: GET_CARTS,
    payload: data,
  });
  toast.remove();
  toast.error('Cart item removed');
  if (data.length === 0) dispatch(closeCartCanvas());
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
  dispatch(closeCartCanvas());
};

export const openCartCanvas = () => async (dispatch) => {
  dispatch({
    type: OPEN_CART,
  });
};

export const closeCartCanvas = () => async (dispatch) => {
  dispatch({
    type: CLOSE_CART,
  });
};
