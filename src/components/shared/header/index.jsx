import React, { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeSidebar, openSidebar } from '../../../redux/action/sidebar';
import cx from 'classnames';
import { logout } from '../../../redux/action/auth';
import MiniCart from '../cart/miniCart';
import MobileToolBar from '../../layout/MobileToolBar';
import NavCategories from '../../sections/nav/NavCategories';
import MobileOffCanvasHeader from '../../layout/MobileOffCanvasHeader';
import StickyHeader from './StickyHeader';
import SearchBox from './SearchBox';
import PageMenu from './menu/PageMenu';
import GoogleTranslation from '../../layout/GoogleTranslation';
import CurrencyDropdown from '../currency/CurrencyDropdown';

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const showMenu = useSelector((state) => state.sideBar);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const setShowMenu = (data) => {
    if (data) {
      dispatch(openSidebar());
    } else {
      dispatch(closeSidebar());
    }
  };
  const categories = useSelector((state) => state.menu);

  const langDropDown = useMemo(() => {
    return (
      <li className='language__currency--list'>
        <Link
          className={cx('language__switcher text-red', { active: showLangDropdown })}
          to='#'
          onClick={(e) => setShowLangDropdown(!showLangDropdown)}
        >
          <img
            className='language__switcher--icon__img'
            src='assets/images/icon/language-icon.png'
            alt='currency'
          />
          <span>English&nbsp;</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='11.797'
            height='9.05'
            viewBox='0 0 9.797 6.05'
          >
            <path
              d='M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z'
              transform='translate(-6 -8.59)'
              fill='currentColor'
              opacity='0.7'
            />
          </svg>
        </Link>
        <div className={cx('dropdown__language', { active: showLangDropdown })}>
          <ul>
            <li className='language__items'>
              <Link className='language__text' to='#'>
                France
              </Link>
            </li>
            <li className='language__items'>
              <Link className='language__text' to='#'>
                Russia
              </Link>
            </li>
            <li className='language__items'>
              <Link className='language__text' to='#'>
                Spanish
              </Link>
            </li>
          </ul>
        </div>
      </li>
    );
  }, [showLangDropdown]);

  const currencyDropDown = useMemo(() => {
    return (
      <li className='language__currency--list'>
        <Link
          className={cx('account__currency--link text-red', {
            active: showCurrencyDropdown,
          })}
          to='#'
          onClick={(e) => setShowCurrencyDropdown(!showCurrencyDropdown)}
        >
          <img src='assets/images/icon/usd-icon.png' alt='currency' />
          <span>&nbsp;$ US Dollar&nbsp;</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='11.797'
            height='9.05'
            viewBox='0 0 9.797 6.05'
          >
            <path
              d='M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z'
              transform='translate(-6 -8.59)'
              fill='currentColor'
              opacity='0.7'
            />
          </svg>
        </Link>
        <div className={cx('dropdown__currency', { active: showCurrencyDropdown })}>
          <ul>
            <li className='currency__items'>
              <Link className='currency__text' to='#'>
                INR
              </Link>
            </li>
          </ul>
        </div>
      </li>
    );
  }, [showCurrencyDropdown]);

  return (
    <div>
      {/* Start header area */}
      <header className='header__section'>
        <StickyHeader setShowMenu={setShowMenu} categories={categories} />
        <div
          className='header__topbar bg__secondary'
          style={{ borderTop: 'solid #d12421', backgroundColor: '#ffe54a' }}
        >
          <div className='container-fluid'>
            <div className='header__topbar--inner d-flex align-items-center justify-content-between'>
              <div className='header__shipping'>
                <ul className='header__shipping--wrapper d-flex'>
                  <li className='header__shipping--text text-red'>
                    Welcome to <span style={{ fontSize: 20 }}>SomaShop</span> - The World Of Block
                    Prints
                  </li>
                  <li className='header__shipping--text text-red d-sm-2-none'>
                    <img
                      className='header__shipping--text__icon'
                      src='assets/images/icon/email.jpg'
                      alt='email-icon'
                    />{' '}
                    <Link className='header__shipping--text__link' to='mailto:info@somashop.com'>
                      info@somashop.com
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='language__currency d-none d-lg-block'>
                <ul className='d-flex align-items-center'>
                  <li className='header__shipping--text text-red d-sm-2-none'>
                    <Link to='/track-order'>
                      <>
                        <img
                          className='header__shipping--text__icon'
                          src='assets/images/icon/bus.jpg'
                          alt='bus-icon'
                        />{' '}
                        Track Your Order
                      </>
                    </Link>
                  </li>
                  <GoogleTranslation />
                  {/* {langDropDown} */}
                  {/* {currencyDropDown} */}
                  <CurrencyDropdown />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='header__bottom'>
          <div className='container-fluid'>
            <div className='header__bottom--inner position__relative d-none d-lg-flex justify-content-between align-items-center'>
              <div className='main__logo'>
                {/* <h1 class="main__logo--title">
                    <Link class="main__logo--link" to="index.html"><img class="main__logo--img" src="assets/images/logo/nav-log2.png" alt="logo-img"></Link>
                </h1> */}
              </div>
              <div className='header__menu'>
                <nav className='header__menu--navigation'>
                  <ul className='d-flex'>
                    <li className='header__menu--items'>
                      <Link className='header__menu--link text-white' to='/'>
                        Home
                      </Link>
                    </li>
                    <li className='header__menu--items d-none d-xl-block'>
                      <Link className='header__menu--link text-white' to='/shop'>
                        Shop{' '}
                      </Link>
                    </li>
                    <NavCategories />
                    <PageMenu />
                    <li className='header__menu--items'>
                      <Link className='header__menu--link text-white' to='/about-us'>
                        About Us{' '}
                      </Link>
                    </li>
                    <li className='header__menu--items style2'>
                      <Link className='header__menu--link text-white' to='/blogs'>
                        Blog{' '}
                      </Link>
                    </li>
                    <li className='header__menu--items'>
                      <Link className='header__menu--link text-white' to='/contact-us'>
                        Contact Us{' '}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <p className='header__discount--text' />
              {/* <p class="header__discount--text"><img class="header__discount--icon__img" src="assets/images/icon/lamp.png" alt="lamp-img"> Special up to 60% Off all item</p> */}
            </div>
          </div>
        </div>
        <SearchBox />
        <MobileOffCanvasHeader
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          isLogin={isLogin}
          logout={logout}
          setShowLangDropdown={setShowLangDropdown}
          showLangDropdown={showLangDropdown}
          dispatch={dispatch}
          setShowCurrencyDropdown={setShowCurrencyDropdown}
          showCurrencyDropdown={showCurrencyDropdown}
          categories={categories}
        />
        <MobileToolBar />
        <MiniCart />
        {/* Start serch box area */}
        <div className='predictive__search--box '>
          <div className='predictive__search--box__inner'>
            <h2 className='predictive__search--title'>Search Products</h2>
            <form className='predictive__search--form' action='#'>
              <label>
                <input
                  className='predictive__search--input'
                  placeholder='Search Here'
                  type='text'
                />
              </label>
              <button
                className='predictive__search--button'
                aria-label='search button'
                type='submit'
              >
                <svg
                  className='header__search--button__svg'
                  xmlns='http://www.w3.org/2000/svg'
                  width='30.51'
                  height='25.443'
                  viewBox='0 0 512 512'
                >
                  <path
                    d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
                    fill='none'
                    stroke='currentColor'
                    strokeMiterlimit={10}
                    strokeWidth={32}
                  />
                  <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d='M338.29 338.29L448 448'
                  />
                </svg>
              </button>
            </form>
          </div>
          <button className='predictive__search--close__btn' aria-label='search close button'>
            <svg
              className='predictive__search--close__icon'
              xmlns='http://www.w3.org/2000/svg'
              width='40.51'
              height='30.443'
              viewBox='0 0 512 512'
            >
              <path
                fill='currentColor'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={32}
                d='M368 368L144 144M368 144L144 368'
              />
            </svg>
          </button>
        </div>
        {/* End serch box area */}
      </header>
      {/* End header area */}
    </div>
  );
};

export default memo(Header);
