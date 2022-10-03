import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useCurrency from '../../../hooks/useCurrency';
import { setSelectedCurrency } from '../../../redux/action/currency';

const CurrencyDropdown = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currency.allCurrency);
  let { id: selectedCurrencyId } = useCurrency();
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <select
        className='desktop-currency-dropdown'
        onChange={(e) => dispatch(setSelectedCurrency(e.target.value))}
        value={selectedCurrencyId}
        disabled={location.pathname === '/payment'}
      >
        {currencies?.length > 0 &&
          currencies.map((currency) => (
            <option
              key={currency.id}
              value={currency.id}
            >{`${currency.symbol} ${currency.name}`}</option>
          ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
