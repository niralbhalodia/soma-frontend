import { SET_CURRENCY, SET_SELECTED_CURRENCY } from './type';

export const setCurrency =
  (data = []) =>
  async (dispatch) => {
    dispatch({
      type: SET_CURRENCY,
      payload: data,
    });
    dispatch({
      type: SET_SELECTED_CURRENCY,
      payload: data[0],
    });
  };
export const setSelectedCurrency = (id) => async (dispatch, getState) => {
  const {
    currency: { allCurrency },
  } = getState();
  const currency = allCurrency.find((currency) => currency.id === Number(id));
  dispatch({
    type: SET_SELECTED_CURRENCY,
    payload: currency,
  });
};
