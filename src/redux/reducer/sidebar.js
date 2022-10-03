import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from '../action/type';

const sideBar = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_SIDEBAR:
      return true;
    case CLOSE_SIDEBAR:
      return false;
    default:
      return state;
  }
};
export default sideBar;
