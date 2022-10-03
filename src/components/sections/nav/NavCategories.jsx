import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { useSelector } from 'react-redux';

const NavCategories = () => {
  const categories = useSelector((state) => state.menu);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  const showMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const hideSomeTime = () => {
    setMenuVisible(false);
    setHideMenu(true);
    setTimeout(() => {
      setHideMenu(false);
    }, 500);
  };

  return (
    <li className='header__menu--items mega__menu--items'>
      <Link
        className='header__menu--link text-white'
        to='/shop'
        onMouseOver={showMenu}
        onMouseOut={closeMenu}
      >
        Categories
      </Link>
      <ul
        className={cx('header__mega--menu d-flex', {
          'show-mega-menu': menuVisible,
          hidden: hideMenu,
        })}
        onMouseOver={showMenu}
        onMouseOut={closeMenu}
      >
        {categories.length > 0 &&
          categories.map((category, index) => (
            <li className='header__mega--menu__li' key={index}>
              <Link
                className='header__mega--subtitle'
                to={`/shop?catId=${category?.id}`}
                onClick={hideSomeTime}
              >
                {category?.name}
              </Link>
              <ul className='header__mega--sub__menu'>
                {/* <li className='header__mega--sub__menu_li'>
                  <Link
                    className='header__mega--sub__menu--title'
                    to={`/shop?catId=${category?.id}`}
                  >
                    All
                  </Link>
                </li> */}
                {category.subCategory &&
                  category.subCategory.length > 0 &&
                  category.subCategory.slice(0, 5).map((subCat, index) => (
                    <li className='header__mega--sub__menu_li header__menu--items' key={index}>
                      <Link
                        className='header__mega--sub__menu--title'
                        to={`/shop?catId=${category?.id}&sub_catId=${subCat?.id}`}
                        onClick={hideSomeTime}
                      >
                        {subCat?.name}
                        {subCat?.children?.length > 0 && (
                          <ul
                            className={cx('header__mega--menu__sub--menu')}
                            onMouseOver={showMenu}
                            onMouseOut={closeMenu}
                          >
                            {subCat.children.map(({ id, name }) => (
                              <li key={id} className='header__mega--menu__sub--menu__items'>
                                <Link
                                  to={`/shop?catId=${category?.id}&sub_catId=${subCat?.id}&sub_subcategory_id=${id}`}
                                >
                                  {name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default NavCategories;
