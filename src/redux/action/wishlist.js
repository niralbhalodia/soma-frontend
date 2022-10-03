import toast from 'react-hot-toast';
import { postData, postJsonData } from '../../utils/apiCall';
import { SET_WISHLIST } from './type';

export const getWishList = () => async (dispatch, getState) => {
  const {
    auth: { isLogin },
  } = getState();
  let res;
  if (isLogin) {
    res = await postData('/products/getWishlist');
  }
  dispatch({
    type: SET_WISHLIST,
    payload: res?.data || [],
  });
};

export const setWishList = (id) => async (dispatch) => {
  await postJsonData('/products/like', JSON.stringify({ product_id: id }));
  toast.remove();
  toast.success('Product added to wishlist');
  dispatch(getWishList());
};
export const removeFromWishList = (id) => async (dispatch) => {
  await postJsonData('/products/unlike', JSON.stringify({ product_id: id }));
  toast.remove();
  toast.error('Product removed from wishlist');
  dispatch(getWishList());
};
