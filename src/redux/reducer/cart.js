import { setLocalStorage } from '../../utils/localStorage';
import { CLEAR_CART, CLOSE_CART, GET_CARTS, OPEN_CART } from '../action/type';

const initState = {
  isCanvasOpen: false,
  products: [],
};

const cart = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CARTS:
      setLocalStorage('cart', payload);
      return {
        ...state,
        products: [...payload],
      };
    case CLEAR_CART:
      setLocalStorage('cart', []);
      return {
        ...state,
        products: [],
      };
    case OPEN_CART:
      return {
        ...state,
        isCanvasOpen: true,
      };
    case CLOSE_CART:
      return {
        ...state,
        isCanvasOpen: false,
      };
    default:
      return state;
  }
};
export default cart;
