import cx from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PageMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  const showMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  let pages = [
    { name: 'About Us', link: '/about-us' },
    { name: 'Contact Us', link: '/contact-us' },
    { name: 'My Cart', link: '/cart' },
    { name: 'My Wishlist', link: '/wishlist' },
    { name: 'Login', link: '/login' },
  ];

  const hideSomeTime = () => {
    setMenuVisible(false);
    setHideMenu(true);
    setTimeout(() => {
      setHideMenu(false);
    }, 500);
  };
  return (
    <>
      <li className='header__menu--items'>
        <Link
          className='header__menu--link text-white'
          to='#'
          onMouseOver={showMenu}
          onMouseOut={closeMenu}
        >
          Pages
        </Link>
        <ul
          className={cx('header__sub--menu', {
            'show-mega-menu': menuVisible,
            hidden: hideMenu,
          })}
          onMouseOver={showMenu}
          onMouseOut={closeMenu}
        >
          {pages.map(({ name, link }, i) => (
            <li key={i} className='header__sub--menu__items'>
              <Link to={link} className='header__sub--menu__link' onClick={hideSomeTime}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
};

export default PageMenu;
