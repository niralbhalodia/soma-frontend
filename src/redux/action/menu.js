import { postData } from '../../utils/apiCall';
import { SET_MENU } from './type';

export const setMenu = () => async (dispatch) => {
  let data = [];
  const res = await postData('/categories/getMenu');
  data = res?.data?.categoriesData || [];
  dispatch({
    type: SET_MENU,
    payload: data,
  });
};
