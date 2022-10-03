import { SET_WISHLIST } from '../action/type';

const wishList = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WISHLIST:
      return payload;
    default:
      return state;
  }
};
export default wishList;
