import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { totalPrice } from '../utils/cart';
import { useSelector } from 'react-redux';
import { postData } from '../utils/apiCall';
import useCurrency from '../hooks/useCurrency';
import { useNavigate } from 'react-router-dom';

const PayPal = ({ data, billingData }) => {
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.products);
  const [total, setTotal] = useState(totalPrice(cartProducts));
  const { price: totalCurruncy, indian_price, name: currency, symbol } = useCurrency(total);

  useEffect(() => {
    if (cartProducts.length > 0) {
      setTotal(totalPrice(cartProducts));
    }
  }, [cartProducts]);

  return (
    <div>
      <PayPalButton
        createOrder={(data, actions, err) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'soma product',
                amount: {
                  currency_code: 'USD',
                  value: totalCurruncy,
                },
              },
            ],
          });
        }}
        onApprove={async (successData, actions) => {
          const order = await actions.order.capture();
          console.log('orderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
          const transactionData = actions.order.get();
          console.log('transactionDataaaaaaaaaaaaaaaaaaaaaaa');
          console.log(transactionData);
          console.log('successsssssssssssssssssssssssssssssssData');
          console.log(successData);

          if (order?.status === 'COMPLETED') {
            const params = new URLSearchParams();
            params.append('shipping_first_name', data?.shipping_first_name || '');
            params.append('shipping_last_name', data?.shipping_last_name || '');
            params.append('contact_info', data?.shipping_contact || '');
            params.append('shipping_company', data?.shipping_company || '');
            params.append('shipping_street_address', data?.shipping_street_address || '');
            params.append('shipping_apartment', data?.shipping_apartment || '');
            params.append('shipping_country', data?.shipping_country || '');
            params.append('shipping_state', data?.shipping_state || '');
            params.append('shipping_city', data?.shipping_city || '');
            params.append('shipping_postcode', data?.shipping_postcode || '');

            params.append('billing_first_name', billingData?.shipping_first_name || '');
            params.append('billing_last_name', billingData?.shipping_last_name || '');
            params.append('billing_company', billingData?.shipping_company || '');
            params.append('billing_street_address', billingData?.shipping_street_address || '');
            params.append('billing_apartment', billingData?.shipping_apartment || '');
            params.append('billing_country', billingData?.shipping_country || '');
            params.append('billing_state', billingData?.shipping_state || '');
            params.append('billing_city', billingData?.shipping_city || '');
            params.append('billing_postcode', billingData?.shipping_postcode || '');

            params.append('order_note', data?.note || '');
            params.append('is_shipping_save', data?.is_shipping_save ? 'Yes' : 'No');
            params.append('sub_total', totalCurruncy);
            params.append('total', totalCurruncy);
            params.append('paypal_id', order?.id);
            params.append('payment_type', 'Paypal');
            params.append('email', data?.shipping_email);
            params.append('currency', currency);
            params.append('currency_symbol', symbol);
            params.append(
              'orderItems',
              JSON.stringify(
                cartProducts.map((product) => ({
                  product_id: product.id,
                  price: Number(product.price / indian_price).toFixed(2),
                  qty: product.numberOfItems,
                  product_variations_combination_id: product.hasCombination?.id,
                })),
              ),
            );
            // const res = await AuthRepository.createOrder(data);
            const res = await postData('/orders/create', params);
            if (res.success === 1) {
              navigate(`/order-success?id=${res.data.order_number}`, {
                state: {
                  userData: res.data,
                  items: cartProducts.map((product) => ({
                    ...product,
                    price: Number(product.price / indian_price).toFixed(2),
                  })),
                },
              });
            }
          }
        }}
        onError={(err) => {
          navigate('/payment-success?success=false')
        }}
      />
    </div>
  );
};

export default PayPal;
