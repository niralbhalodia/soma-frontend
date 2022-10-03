import React from 'react';
import { useSelector } from 'react-redux';

const GetCurrency = ({ price = 0 }) => {
  const data = useSelector((state) => state.currency.selectedCurrency);
  return (
    <>
      {data?.symbol || '₹'}
      {data?.indian_price ? Number(price / data?.indian_price).toFixed(2) : price}
    </>
  );
};

export default GetCurrency;
