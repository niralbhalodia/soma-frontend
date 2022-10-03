import cx from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeSearchBox } from '../../../redux/action/searchBox';

const SearchBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSearchBox = useSelector((state) => state.searchBox);
  const [search, setSearch] = useState('');
  return (
    <>
      <div
        className={cx('predictive__search--box', { active: showSearchBox })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='predictive__search--box__inner'>
          <h2 className='predictive__search--title'>Search Products</h2>
          <form
            className='predictive__search--form'
            action='#'
            onSubmit={(e) => {
              e.preventDefault();
              if (search) {
                navigate(`/shop?search=${search}`);
                dispatch(closeSearchBox());
              }
            }}
          >
            <label>
              <input
                className='predictive__search--input'
                placeholder='Search Here'
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button className='predictive__search--button' aria-label='search button' type='submit'>
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
        <button
          className='predictive__search--close__btn'
          onClick={(e) => {
            e.preventDefault();
            dispatch(closeSearchBox());
          }}
        >
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
    </>
  );
};

export default SearchBox;
