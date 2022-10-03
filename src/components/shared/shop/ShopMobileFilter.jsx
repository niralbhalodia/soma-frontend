import cx from 'classnames';
import React from 'react';
import AttributesFilter from './AttributesFilter';
import BrandFilter from './BrandFilter';
import CategoryFilter from './categories';
import NewArrivalProducts from './NewArrivalProducts';
import PriceFilter from './PriceFilter';
import TypesFilter from './TypesFilter';

const ShopMobileFilter = ({
  brands,
  isVisible,
  closeMobileFilter,
  selectedAttributes,
  setSelectedAttributes,
  selectedTypes,
  setSelectedTypes,
  setFilterAttributes,
  pricelt,
  setPricelt,
  pricegt,
  setPricegt,
  resetPrice,
}) => {
  return (
    <>
      <div
        className={cx('offcanvas__filter--sidebar widget__area', { active: isVisible })}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type='button'
          className='offcanvas__filter--close'
          onClick={(e) => {
            e.preventDefault();
            closeMobileFilter();
          }}
        >
          <svg
            className='minicart__close--icon'
            xmlns='http://www.w3.org/2000/svg'
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
          </svg>{' '}
          <span className='offcanvas__filter--close__text'>Close</span>
        </button>
        <div className='offcanvas__filter--sidebar__inner'>
          <CategoryFilter />
          <PriceFilter
            pricelt={pricelt}
            pricegt={pricegt}
            setPricegt={setPricegt}
            setPricelt={setPricelt}
            setFilterAttributes={setFilterAttributes}
            reset={resetPrice}
          />
          <TypesFilter
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            setFilterAttributes={setFilterAttributes}
          />
          <AttributesFilter
            selectedAttributes={selectedAttributes}
            setSelectedAttributes={setSelectedAttributes}
            setFilterAttributes={setFilterAttributes}
          />
          <NewArrivalProducts />
          {/* <BrandFilter brands={brands} /> */}
          {/* <div className='single__widget widget__bg'>
            <h2 className='widget__title h3'>Dietary Needs</h2>
            <ul className='widget__form--check'>
              <li className='widget__form--check__list'>
                <label className='widget__form--check__label' htmlFor='check6'>
                  Denim shirt
                </label>
                <input className='widget__form--check__input' id='check6' type='checkbox' />
                <span className='widget__form--checkmark' />
              </li>
              <li className='widget__form--check__list'>
                <label className='widget__form--check__label' htmlFor='check7'>
                  Need Winter
                </label>
                <input className='widget__form--check__input' id='check7' type='checkbox' />
                <span className='widget__form--checkmark' />
              </li>
              <li className='widget__form--check__list'>
                <label className='widget__form--check__label' htmlFor='check8'>
                  Fashion Trends
                </label>
                <input className='widget__form--check__input' id='check8' type='checkbox' />
                <span className='widget__form--checkmark' />
              </li>
              <li className='widget__form--check__list'>
                <label className='widget__form--check__label' htmlFor='check9'>
                  Oversize Cotton
                </label>
                <input className='widget__form--check__input' id='check9' type='checkbox' />
                <span className='widget__form--checkmark' />
              </li>
              <li className='widget__form--check__list'>
                <label className='widget__form--check__label' htmlFor='check10'>
                  Baking material
                </label>
                <input className='widget__form--check__input' id='check10' type='checkbox' />
                <span className='widget__form--checkmark' />
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ShopMobileFilter;
