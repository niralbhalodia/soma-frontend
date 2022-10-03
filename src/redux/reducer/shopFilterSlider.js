import { CLOSE_SHOPFILTER, OPEN_SHOPFILTER } from '../action/type';

const shopFilterSlider = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_SHOPFILTER:
      return true;
    case CLOSE_SHOPFILTER:
      return false;
    default:
      return state;
  }
};
export default shopFilterSlider;
