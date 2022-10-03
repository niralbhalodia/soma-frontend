import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import CurrencyDropdown from '../shared/currency/CurrencyDropdown';

const MobileOffCanvasHeader = ({
  showMenu,
  setShowMenu,
  isLogin,
  logout,
  dispatch,
  categories,
}) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState(null);
  const [isSubSubCategoriesOpen, setIsSubSubCategoriesOpen] = useState(null);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  return (
    <>
      {/* Start Offcanvas header menu */}
      <div className={cx('offcanvas-header', { open: showMenu })}>
        <div className='offcanvas__inner'>
          <div className='offcanvas__logo'>
            <Link className='offcanvas__logo_link' to='/'>
              <img src='assets/images/logo/nav-log.png' alt='Grocee Logo' width={158} height={36} />
            </Link>
            <button className='offcanvas__close--btn' onClick={() => setShowMenu(false)}>
              close
            </button>
          </div>
          <nav className='offcanvas__menu'>
            <ul className='offcanvas__menu_ul'>
              <li className='offcanvas__menu_li'>
                <Link className='offcanvas__menu_item' to='/'>
                  Home
                </Link>
              </li>
              <li className='offcanvas__menu_li'>
                <Link className='offcanvas__menu_item' to='/shop'>
                  Shop
                </Link>
              </li>

              <li className='offcanvas__menu_li'>
                <Link
                  className='offcanvas__menu_item'
                  to='#'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCategoriesOpen(!isCategoriesOpen);
                    setIsSubCategoriesOpen(null);
                  }}
                >
                  Categories
                  <button
                    className={cx('offcanvas__sub_menu_toggle', {
                      active: isCategoriesOpen,
                    })}
                  ></button>
                </Link>
                <ul
                  className='offcanvas__sub_menu'
                  style={{ boxSizing: 'border-box', display: isCategoriesOpen ? 'block' : 'none' }}
                >
                  {categories?.length > 0 &&
                    categories.map((category, index) => (
                      <li className='offcanvas__sub_menu_li' key={index}>
                        <Link
                          to='#'
                          className='offcanvas__sub_menu_item'
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSubCategoriesOpen === index) {
                              setIsSubCategoriesOpen(null);
                            } else {
                              setIsSubCategoriesOpen(index);
                            }
                          }}
                        >
                          {category?.name}
                          <button
                            className={cx('offcanvas__sub_menu_toggle', {
                              active: isSubCategoriesOpen === index,
                            })}
                          ></button>
                        </Link>
                        <ul
                          className='offcanvas__sub_menu'
                          style={{
                            boxSizing: 'border-box',
                            display: isSubCategoriesOpen === index ? 'block' : 'none',
                          }}
                        >
                          <li className='offcanvas__sub_menu_li'>
                            <Link
                              className='offcanvas__sub_menu_item'
                              to={`/shop?catId=${category?.id}`}
                            >
                              All
                            </Link>
                          </li>
                          {category?.subCategory?.length > 0 &&
                            category?.subCategory.map((subCategory, subindex) => (
                              <li className='offcanvas__sub_menu_li' key={subindex}>
                                <Link
                                  className='offcanvas__sub_menu_item'
                                  to='#'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (isSubSubCategoriesOpen === subindex) {
                                      setIsSubSubCategoriesOpen(null);
                                    } else {
                                      setIsSubSubCategoriesOpen(subindex);
                                    }
                                  }}
                                >
                                  {subCategory?.name}
                                  <button
                                    className={cx('offcanvas__sub_menu_toggle', {
                                      active: isSubSubCategoriesOpen === subindex,
                                    })}
                                  ></button>
                                </Link>
                                <ul
                                  className='offcanvas__sub_menu'
                                  style={{
                                    boxSizing: 'border-box',
                                    paddingLeft: '20px',
                                    display: isSubSubCategoriesOpen === subindex ? 'block' : 'none',
                                  }}
                                >
                                  <li className='offcanvas__sub_menu_li'>
                                    <Link
                                      className='offcanvas__sub_menu_item'
                                      to={`/shop?catId=${category?.id}&sub_catId=${subCategory?.id}`}
                                    >
                                      All
                                    </Link>
                                  </li>
                                  {subCategory?.children?.length > 0 &&
                                    subCategory?.children.map((subSubCategory, index) => (
                                      <li className='offcanvas__sub_menu_li' key={index}>
                                        <Link
                                          className='offcanvas__sub_menu_item'
                                          to={`/shop?catId=${category?.id}&sub_catId=${subCategory?.id}&sub_subcategory_id=${subSubCategory?.id}`}
                                        >
                                          {subSubCategory?.name}
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </li>
              <li className='offcanvas__menu_li'>
                <Link
                  className='offcanvas__menu_item'
                  to='#'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPagesOpen(!isPagesOpen);
                  }}
                >
                  Pages
                  <button className='offcanvas__sub_menu_toggle'></button>
                </Link>
                <ul
                  className='offcanvas__sub_menu'
                  style={{ boxSizing: 'border-box', display: isPagesOpen ? 'block' : 'none' }}
                >
                  <li className='offcanvas__sub_menu_li'>
                    <Link to='/about-us' className='offcanvas__sub_menu_item'>
                      About Us
                    </Link>
                  </li>
                  <li className='offcanvas__sub_menu_li'>
                    <Link to='/contact-us' className='offcanvas__sub_menu_item'>
                      Contact Us
                    </Link>
                  </li>
                  <li className='offcanvas__sub_menu_li'>
                    <Link to='/cart' className='offcanvas__sub_menu_item'>
                      My Cart
                    </Link>
                  </li>
                  <li className='offcanvas__sub_menu_li'>
                    <Link to='/wishlist' className='offcanvas__sub_menu_item'>
                      My Wishlist
                    </Link>
                  </li>
                  <li className='offcanvas__sub_menu_li'>
                    <Link to='/login' className='offcanvas__sub_menu_item'>
                      Login
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='offcanvas__menu_li'>
                <Link className='offcanvas__menu_item' to='/about-us'>
                  About Us
                </Link>
              </li>
              <li className='offcanvas__menu_li'>
                <Link className='offcanvas__menu_item' to='/blogs'>
                  Blog
                </Link>
              </li>
              <li className='offcanvas__menu_li'>
                <Link className='offcanvas__menu_item' to='/contact-us'>
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className='offcanvas__account--items'>
              {isLogin ? (
                <>
                  <Link
                    className='offcanvas__account--items__btn d-flex align-items-center'
                    to={'#'}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatch(logout());
                    }}
                  >
                    <span className='offcanvas__account--items__icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20.51'
                        height='19.443'
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
                    </span>
                    <span className='offcanvas__account--items__label'>Logout</span>
                  </Link>
                </>
              ) : (
                <Link
                  className='offcanvas__account--items__btn d-flex align-items-center'
                  to='/login'
                >
                  <span className='offcanvas__account--items__icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20.51'
                      height='19.443'
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
                  </span>
                  <span className='offcanvas__account--items__label'>Login / Register</span>
                </Link>
              )}
            </div>
            <CurrencyDropdown />
          </nav>
        </div>
      </div>
      {/* End Offcanvas header menu */}
    </>
  );
};

export default MobileOffCanvasHeader;
