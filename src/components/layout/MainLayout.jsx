import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/action/auth';
import { closeCartCanvas, getCarts } from '../../redux/action/cart';
import { getWishList } from '../../redux/action/wishlist';
import { postData } from '../../utils/apiCall';
import { getLocalStorage } from '../../utils/localStorage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AllToaster from '../AllToaster';
import BackToTop from '../BackToTop';
import Header from '../shared/header';
import Footer from '../shared/footer/Footer';
import { closeSidebar } from '../../redux/action/sidebar';
import { closeSearchBox } from '../../redux/action/searchBox';
import classNames from 'classnames';
import { CLOSE_SHOPFILTER, LOGOUT } from '../../redux/action/type';
import { setMenu } from '../../redux/action/menu';
import { useQuery } from 'react-query';
import { setCurrency, setSelectedCurrency } from '../../redux/action/currency';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.sideBar);
  const showCart = useSelector((state) => state.cart.isCanvasOpen);
  const showSearchBox = useSelector((state) => state.searchBox);
  const isMobileFilterVisible = useSelector((state) => state.shopFilterSlider);

  const { data: currencyData } = useQuery(['currency'], () => postData('/currency/getCurrency'), {
    refetchOnWindowFocus: false,
  });
  const getGeoInfo = async () => {
    try {
      const res = await fetch('https://ipapi.co/json');
      res.json().then((res) => {
        res.country && dispatch(setSelectedCurrency(res.country === 'IN' ? 1 : 2));
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getProfile = async () => {
    const res = await postData('/user/getById');
    await dispatch(login(res.data));
    dispatch(getWishList());
  };
  useEffect(() => {
    if (currencyData?.data?.length > 0) {
      dispatch(setCurrency(currencyData.data));
    }
  }, [currencyData]);
  useEffect(() => {
    let token = getLocalStorage('token');
    if (token) {
      getProfile();
    } else dispatch({ type: LOGOUT });

    dispatch(getCarts());
    dispatch(setMenu());
    getGeoInfo();
  }, []);
  return (
    <>
      <div
        className={classNames({
          offCanvas__minicart_active:
            showMenu || showCart || showSearchBox || isMobileFilterVisible,
        })}
        onClick={() => {
          if (isMobileFilterVisible) dispatch({ type: CLOSE_SHOPFILTER });
          if (showCart) dispatch(closeCartCanvas());
          if (showMenu) dispatch(closeSidebar());
          if (showSearchBox) dispatch(closeSearchBox());
        }}
      >
        <Header />
        {children}
        <AllToaster />
        <BackToTop />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
