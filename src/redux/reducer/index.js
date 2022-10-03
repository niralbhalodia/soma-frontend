import { combineReducers } from 'redux';
import auth from './auth';
import cart from './cart';
import sideBar from './sidebar';
import wishList from './wishList';
import searchBox from './searchBox';
import shopFilterSlider from './shopFilterSlider';
import menu from './menu';
import currency from './currency';

export default combineReducers({
  auth,
  sideBar,
  searchBox,
  cart,
  wishList,
  shopFilterSlider,
  menu,
  currency,
});
