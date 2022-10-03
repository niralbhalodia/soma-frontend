import { SET_MENU } from '../action/type';

const menu = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MENU:
      return [...payload];
    default:
      return state;
  }
};
export default menu;
