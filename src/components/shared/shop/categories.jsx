import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryFilter = () => {
  const [isSubCategoriesVisible, setIsSubCategoriesVisible] = useState(null);
  const [isSubSubCategoriesVisible, setIsSubSubCategoriesVisible] = useState(null);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.menu);

  return (
    <>
      <div className='single__widget widget__bg'>
        <h2 className='widget__title h3'>Categories</h2>
        <ul className='widget__categories--menu'>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <div style={{ display: 'block' }} key={index}>
                <li
                  className='widget__categories--menu__list '
                  // onClick={() => {
                  //   isSubCategoriesVisible === index
                  //     ? setIsSubCategoriesVisible(null)
                  //     : setIsSubCategoriesVisible(index);
                  // }}
                >
                  <label
                    className='widget__categories--menu__label d-flex align-items-center'
                    onClick={() => {
                      if (category?.subCategory?.length === 0) {
                        navigate(`/shop?catId=${category.id}`);
                      } else {
                        isSubCategoriesVisible === index
                          ? setIsSubCategoriesVisible(null)
                          : setIsSubCategoriesVisible(index);
                      }
                    }}
                  >
                    <img
                      style={{ minHeight: '30px' }}
                      className='widget__categories--menu__img'
                      src={category?.image}
                      alt='categories-img'
                    />
                    <span className='widget__categories--menu__text'>{category?.name}</span>
                    <svg
                      style={{
                        visibility: category?.subCategory?.length > 0 ? 'visible' : 'hidden',
                      }}
                      className='widget__categories--menu__arrowdown--icon'
                      xmlns='http://www.w3.org/2000/svg'
                      width='12.355'
                      height='8.394'
                    >
                      <path
                        d='M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z'
                        transform='translate(-6 -8.59)'
                        fill='currentColor'
                      ></path>
                    </svg>
                  </label>
                  <ul
                    className='widget__categories--sub__menu'
                    style={{
                      boxSizing: 'border-box',
                      display:
                        isSubCategoriesVisible === index && category?.subCategory?.length > 0
                          ? 'block'
                          : 'none',
                    }}
                  >
                    <li className='widget__categories--sub__menu--list'>
                      <Link
                        to={`/shop?catId=${category?.id}`}
                        className='widget__categories--sub__menu--link d-flex align-items-center'
                      >
                        {/* <img
                        className='widget__categories--sub__menu--img'
                        src={category?.image}
                        alt='categories-img'
                      /> */}
                        <span
                          className='widget__categories--sub__menu--text'
                          style={{ paddingLeft: '40px' }}
                        >
                          All
                        </span>
                      </Link>
                    </li>
                    {category?.subCategory?.length > 0 &&
                      category?.subCategory.slice(0, 4).map((subCategory, subindex) => (
                        <li className='widget__categories--sub__menu--list' key={subindex}>
                          <label
                            to='#'
                            className='widget__categories--sub__menu--link d-flex align-items-center'
                            href='shop.html'
                            style={{ position: 'relative', cursor: 'pointer' }}
                            onClick={() => {
                              if (subCategory?.children?.length === 0) {
                                navigate(
                                  `/shop?catId=${category?.id}&sub_catId=${subCategory?.id}`,
                                );
                              } else {
                                isSubSubCategoriesVisible === subindex
                                  ? setIsSubSubCategoriesVisible(null)
                                  : setIsSubSubCategoriesVisible(subindex);
                              }
                            }}
                          >
                            <span
                              className='widget__categories--sub__menu--text'
                              style={{ paddingLeft: '40px' }}
                            >
                              {subCategory?.name}
                            </span>
                            <svg
                              style={{
                                visibility:
                                  subCategory?.children?.length > 0 ? 'visible' : 'hidden',
                              }}
                              className='widget__categories--menu__arrowdown--icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='12.355'
                              height='8.394'
                            >
                              <path
                                d='M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z'
                                transform='translate(-6 -8.59)'
                                fill='currentColor'
                              ></path>
                            </svg>
                          </label>
                          <ul
                            className='widget__categories--sub__menu'
                            style={{
                              boxSizing: 'border-box',
                              display:
                                isSubSubCategoriesVisible === subindex &&
                                subCategory?.children?.length > 0
                                  ? 'block'
                                  : 'none',
                            }}
                          >
                            <li className='widget__categories--sub__menu--list'>
                              <Link
                                to={`/shop?catId=${category?.id}&sub_catId=${subCategory?.id}`}
                                className='widget__categories--sub__menu--link d-flex align-items-center'
                              >
                                <span
                                  className='widget__categories--sub__menu--text'
                                  style={{ paddingLeft: '40px' }}
                                >
                                  All
                                </span>
                              </Link>
                            </li>
                            {subCategory?.children?.length > 0 &&
                              subCategory?.children.map((children, childindex) => (
                                <li
                                  className='widget__categories--sub__menu--list'
                                  key={childindex}
                                >
                                  <Link
                                    to={`/shop?catId=${category?.id}&sub_catId=${subCategory?.id}&sub_subcategory_id=${children?.id}`}
                                    className='widget__categories--sub__menu--link d-flex align-items-center'
                                  >
                                    <span
                                      className='widget__categories--sub__menu--text'
                                      style={{ paddingLeft: '40px' }}
                                    >
                                      {children?.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                      ))}
                  </ul>
                </li>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryFilter;
