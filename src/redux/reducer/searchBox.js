import { OPEN_SEARCHBOX, CLOSE_SEARCHBOX } from '../action/type';

const searchBox = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_SEARCHBOX:
      return true;
    case CLOSE_SEARCHBOX:
      return false;
    default:
      return state;
  }
};
export default searchBox;
