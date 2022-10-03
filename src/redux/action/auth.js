import toast from 'react-hot-toast';
import { postData } from '../../utils/apiCall';
import { setLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { LOGIN, LOGOUT } from './type';

export const login = (data) => async (dispatch) => {
  if (data) {
    if (data.token) setLocalStorage('token', data.token);
  }
  // Action for Login
  dispatch({
    type: LOGIN,
    payload: data || {},
  });
};

export const logout = () => async (dispatch) => {
  await postData('/user/logout');
  removeLocalStorage('token');
  dispatch({
    type: LOGOUT,
  });
};
