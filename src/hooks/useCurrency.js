import { useSelector } from 'react-redux';

const useCurrency = (price) => {
  const data = useSelector((state) => state.currency.selectedCurrency);
  return {
    id: data?.id || 1,
    name: data?.name || 'INR',
    symbol: data?.symbol || '₹',
    price: data?.indian_price ? Number(price / data.indian_price).toFixed(2) : price,
    indian_price: data?.indian_price || 1,
  };
};

export default useCurrency;
