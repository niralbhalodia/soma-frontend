import { SET_CURRENCY, SET_SELECTED_CURRENCY } from '../action/type';

const initState = {
  allCurrency: [],
  selectedCurrency: {
    id: 1,
    name: 'INR',
    symbol: '₹',
    indian_price: 1,
  },
};

const currency = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENCY:
      return {
        ...state,
        allCurrency: [...payload],
      };
    case SET_SELECTED_CURRENCY:
      return {
        ...state,
        selectedCurrency: payload,
      };
    default:
      return state;
  }
};
export default currency;
