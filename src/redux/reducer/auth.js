import { LOGIN, LOGOUT } from '../action/type';

const auth = (state = { isLogin: true }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return { isLogin: true, ...payload };
    case LOGOUT:
      return { isLogin: false };
    default:
      return state;
  }
};
export default auth;
