import { OPEN_SEARCHBOX, CLOSE_SEARCHBOX } from './type';

export const openSearchBox = () => async (dispatch) => {
  dispatch({
    type: OPEN_SEARCHBOX,
  });
};

export const closeSearchBox = () => async (dispatch) => {
  dispatch({
    type: CLOSE_SEARCHBOX,
  });
};
