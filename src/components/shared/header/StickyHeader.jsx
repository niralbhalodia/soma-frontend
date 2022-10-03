import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { closeCartCanvas, openCartCanvas } from '../../../redux/action/cart';
import NavCategories from '../../sections/nav/NavCategories';
import PageMenu from './menu/PageMenu';

const StickyHeader = ({ setShowMenu, categories }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const cartProducts = useSelector((state) => state.cart.products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(0);

  const setShowCart = (data) => {
    if (data) {
      dispatch(openCartCanvas());
    } else {
      dispatch(closeCartCanvas());
    }
  };

  const checkScrollTop = () => {
    let btn = document.getElementById('sticky_header');
    if (btn) {
      if (
        document.body.scrollTop > btn.offsetHeight ||
        document.documentElement.scrollTop > btn.offsetHeight
      ) {
        btn.className = 'main__header header__sticky sticky';
      } else {
        btn.className = 'main__header header__sticky';
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollTop);
  }
  return (
    <>
      <div id='sticky_header' className='main__header header__sticky'>
        <div className='container-fluid'>
          <div className='main__header--inner position__relative d-flex justify-content-between align-items-center'>
            <div className='offcanvas__header--menu__open ' onClick={() => setShowMenu(true)}>
              <Link
                className='offcanvas__header--menu__open--btn'
                to='#'
                onClick={(e) => e.preventDefault()}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='ionicon offcanvas__header--menu__open--svg'
                  viewBox='0 0 512 512'
                >
                  <path
                    fill='currentColor'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d='M80 160h352M80 256h352M80 352h352'
                  />
                </svg>
                <span className='visually-hidden'>Menu Open</span>
              </Link>
            </div>
            <div className='main__logo'>
              <h1 className='main__logo--title'>
                <Link className='main__logo--link' to='/'>
                  <img
                    className='main__logo--img'
                    src='assets/images/logo/nav-log.png'
                    alt='logo-img'
                  />
                </Link>
              </h1>
            </div>
            <div className='header__search--widget header__sticky--none d-none d-lg-block'>
              <form className='d-flex header__search--form' action='#'>
                <div className='header__select--categories select'>
                  <select
                    className='header__select--inner'
                    defaultValue={1}
                    onChange={(e) => {
                      navigate(e.target.value);
                    }}
                  >
                    <option value={'/shop'}>All Categories</option>

                    {categories.length > 0 &&
                      categories.map((category, index) => {
                        let redirectUrl = `/shop?catId=${category?.id}`;
                        return (
                          <option value={`/shop?catId=${category?.id}`} key={index}>
                            {category?.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className='header__search--box'>
                  <label>
                    <input
                      className='header__search--input'
                      placeholder='Keyword here...'
                      type='text'
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                  <button
                    className='header__search--button bg__secondary text-white'
                    type='button'
                    aria-label='search button'
                    onClick={(e) => {
                      e.preventDefault();
                      if (category) {
                        navigate(`/shop?catId=${category}&search=${search}`);
                      } else {
                        navigate(`/shop?search=${search}`);
                      }
                    }}
                  >
                    <svg
                      className='header__search--button__svg'
                      xmlns='http://www.w3.org/2000/svg'
                      width='27.51'
                      height='26.443'
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
                </div>
              </form>
            </div>
            <div className='header__account header__sticky--none'>
              <ul className='d-flex'>
                <li className='header__account--items'>
                  <Link className='header__account--btn' to={isLogin ? '/profile' : '/login'}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='26.51'
                      height='23.443'
                      viewBox='0 0 512 512'
                    >
                      <path
                        d='M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z'
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={32}
                      />
                      <path
                        d='M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z'
                        fill='none'
                        stroke='currentColor'
                        strokeMiterlimit={10}
                        strokeWidth={32}
                      />
                    </svg>
                    <span className='header__account--btn__text text-red'>
                      {isLogin ? 'My Account' : 'Login'}
                    </span>
                  </Link>
                </li>
                <li className='header__account--items' onClick={() => setShowCart(true)}>
                  <Link className='header__account--btn minicart__open--btn' to='#'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='26.51'
                      height='23.443'
                      viewBox='0 0 14.706 13.534'
                    >
                      <g transform='translate(0 0)'>
                        <g>
                          <path
                            data-name='Path 16787'
                            d='M4.738,472.271h7.814a.434.434,0,0,0,.414-.328l1.723-6.316a.466.466,0,0,0-.071-.4.424.424,0,0,0-.344-.179H3.745L3.437,463.6a.435.435,0,0,0-.421-.353H.431a.451.451,0,0,0,0,.9h2.24c.054.257,1.474,6.946,1.555,7.33a1.36,1.36,0,0,0-.779,1.242,1.326,1.326,0,0,0,1.293,1.354h7.812a.452.452,0,0,0,0-.9H4.74a.451.451,0,0,1,0-.9Zm8.966-6.317-1.477,5.414H5.085l-1.149-5.414Z'
                            transform='translate(0 -463.248)'
                            fill='currentColor'
                          />
                          <path
                            data-name='Path 16788'
                            d='M5.5,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,5.5,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,6.793,478.352Z'
                            transform='translate(-1.191 -466.622)'
                            fill='currentColor'
                          />
                          <path
                            data-name='Path 16789'
                            d='M13.273,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,13.273,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,14.566,478.352Z'
                            transform='translate(-2.875 -466.622)'
                            fill='currentColor'
                          />
                        </g>
                      </g>
                    </svg>
                    <span className='header__account--btn__text text-red'> My cart</span>
                    <span className='items__count'>{cartProducts.length}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='header__menu d-none header__sticky--block d-lg-block'>
              <nav className='header__menu--navigation'>
                <ul className='d-flex'>
                  <li className='header__menu--items style2'>
                    <Link className='header__menu--link text-white' to='/'>
                      Home{' '}
                    </Link>
                  </li>
                  <li className='header__menu--items style2 d-none d-xl-block'>
                    <Link className='header__menu--link text-white' to='/shop'>
                      Shop{' '}
                    </Link>
                  </li>
                  <NavCategories />
                  <PageMenu />
                  <li className='header__menu--items style2'>
                    <Link className='header__menu--link text-white' to='/about-us'>
                      About Us{' '}
                    </Link>
                  </li>
                  <li className='header__menu--items style2'>
                    <Link className='header__menu--link text-white' to='/blogs'>
                      Blog{' '}
                    </Link>
                  </li>
                  <li className='header__menu--items style2'>
                    <Link className='header__menu--link text-white' to='/contact-us'>
                      Contact{' '}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='header__account header__account2 header__sticky--block'>
              <ul className='d-flex'>
                <li className='header__account--items header__account2--items  header__account--search__items d-none d-lg-block'>
                  <Link className='header__account--btn search__open--btn' to='#'>
                    <svg
                      className='header__search--button__svg'
                      xmlns='http://www.w3.org/2000/svg'
                      width='26.51'
                      height='23.443'
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
                    <span className='visually-hidden'>Search</span>
                  </Link>
                </li>
                <li className='header__account--items header__account2--items'>
                  <Link className='header__account--btn' to={isLogin ? '/profile' : '/login'}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='26.51'
                      height='23.443'
                      viewBox='0 0 512 512'
                    >
                      <path
                        d='M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z'
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={32}
                      />
                      <path
                        d='M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z'
                        fill='none'
                        stroke='currentColor'
                        strokeMiterlimit={10}
                        strokeWidth={32}
                      />
                    </svg>
                    <span className='visually-hidden'>{isLogin ? 'My Account' : 'Login'}</span>
                  </Link>
                </li>
                <li
                  className='header__account--items header__account2--items'
                  onClick={() => setShowCart(true)}
                >
                  <Link
                    className='header__account--btn minicart__open--btn'
                    to='#'
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='26.51'
                      height='23.443'
                      viewBox='0 0 14.706 13.534'
                    >
                      <g transform='translate(0 0)'>
                        <g>
                          <path
                            data-name='Path 16787'
                            d='M4.738,472.271h7.814a.434.434,0,0,0,.414-.328l1.723-6.316a.466.466,0,0,0-.071-.4.424.424,0,0,0-.344-.179H3.745L3.437,463.6a.435.435,0,0,0-.421-.353H.431a.451.451,0,0,0,0,.9h2.24c.054.257,1.474,6.946,1.555,7.33a1.36,1.36,0,0,0-.779,1.242,1.326,1.326,0,0,0,1.293,1.354h7.812a.452.452,0,0,0,0-.9H4.74a.451.451,0,0,1,0-.9Zm8.966-6.317-1.477,5.414H5.085l-1.149-5.414Z'
                            transform='translate(0 -463.248)'
                            fill='currentColor'
                          />
                          <path
                            data-name='Path 16788'
                            d='M5.5,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,5.5,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,6.793,478.352Z'
                            transform='translate(-1.191 -466.622)'
                            fill='currentColor'
                          />
                          <path
                            data-name='Path 16789'
                            d='M13.273,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,13.273,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,14.566,478.352Z'
                            transform='translate(-2.875 -466.622)'
                            fill='currentColor'
                          />
                        </g>
                      </g>
                    </svg>
                    <span className='items__count style2'>{cartProducts.length}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyHeader;
