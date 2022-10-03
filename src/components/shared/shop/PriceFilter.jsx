import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCurrency from '../../../hooks/useCurrency';

const PriceFilter = ({ pricegt, pricelt, setPricegt, setPricelt, setFilterAttributes, reset }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const [pricegt, setPricegt] = useState('');
  // const [pricelt, setPricelt] = useState('');
  const { symbol } = useCurrency();
  return (
    <>
      <div className='single__widget price__filter widget__bg'>
        <h2 className='widget__title h3'>Filter By Price</h2>
        <form className='price__filter--form' action='#'>
          <div className='price__filter--form__inner mb-15 d-flex align-items-center'>
            <div className='price__filter--group'>
              <label className='price__filter--label' htmlFor='Filter-Price-GTE2'>
                From
              </label>
              <div className='price__filter--input border-radius-5 d-flex align-items-center'>
                <span className='price__filter--currency'>{symbol}</span>
                <label>
                  <input
                    className='price__filter--input__field border-0'
                    name='filter.v.price.gte'
                    value={pricelt}
                    type='number'
                    placeholder={0}
                    min={0}
                    max={50000}
                    onChange={(e) => setPricelt(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className='price__divider'>
              <span>-</span>
            </div>
            <div className='price__filter--group'>
              <label className='price__filter--label' htmlFor='Filter-Price-LTE2'>
                To
              </label>
              <div className='price__filter--input border-radius-5 d-flex align-items-center'>
                <span className='price__filter--currency'>{symbol}</span>
                <label>
                  <input
                    className='price__filter--input__field border-0'
                    name='filter.v.price.lte'
                    value={pricegt}
                    type='number'
                    min={0}
                    placeholder={50000}
                    max={50000}
                    onChange={(e) => setPricegt(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            className='price__filter--btn primary__btn'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setFilterAttributes(true);
            }}
          >
            Filter
          </button>
          <button
            className='price__filter--btn primary__btn'
            type='button'
            style={{ marginLeft: '5px' }}
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default PriceFilter;
