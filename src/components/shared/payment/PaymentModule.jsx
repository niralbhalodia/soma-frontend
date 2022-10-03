import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCurrency from '../../../hooks/useCurrency';
import { postData } from '../../../utils/apiCall';
import { totalPrice } from '../../../utils/cart';

const PaymentModule = ({ data, billingData, createOrder, method, setMethod, isCodAvailable }) => {
  const payuForm = useRef();
  const ccForm = useRef();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.products);
  const [total, setTotal] = useState(totalPrice(cartProducts));
  const { price: totalCurruncy, indian_price, name: currency, symbol } = useCurrency(total);
  useEffect(() => {
    if (cartProducts.length > 0) {
      setTotal(totalPrice(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    setMethod('');
  }, [currency]);
  function handleChangeMethod(e) {
    setMethod(e.target.value); //e.target.value
  }

  const [ccObject, setCcObject] = useState({
    encRequest: '',
    access_code: 'AVRD65DG99AM83DRMA',
  });

  const [payUObject, setPayUObject] = useState({
    key: 'UzxfBmRS',
    txnid: '',
    amount: '',
    productinfo: 'Shopping',
    firstname: '',
    email: '',
    firstname: '',
    surl: 'http://143.110.190.232/payu/response-handler.php',
    furl: 'http://143.110.190.232/payu/response-handler.php',
    hash: '',
    service_provider: 'payu_paisa',
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async () => {
    if (method == 'cod') {
      try {
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
        params.append('payment_type', 'Cash');
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
      } catch (error) {
        console.log(error);
      }
    } else if (method == 'payu') displayPayuMoney();
    else if (method === 'ccavenue') displayCcavenue();
    else displayRazorpay();
  };

  const displayCcavenue = async () => {
    try {
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
      params.append('payment_type', 'CCAvenue');
      params.append('email', data.shipping_email);
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
      if (res?.success === 1 && res.data) {
        let { encryptedOrderData: encRequest = '' } = res?.data;
        setCcObject((prev) => ({ ...prev, encRequest }));
        setTimeout(() => {
          ccForm.current.submit();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const displayPayuMoney = async () => {
    try {
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
      params.append('payment_type', 'Payu');
      params.append('email', data.shipping_email);
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
      if (res?.success === 1 && res.data) {
        let {
          hash,
          order_number,
          total: amount,
          shipping_first_name: firstname,
          contact_info: phone,
        } = res?.data;
        let obj = {
          ...payUObject,
          txnid: `${order_number}`,
          amount,
          firstname,
          email: data.shipping_email,
          phone,
          hash,
          surl: `http://143.110.190.232/payu/response-handler.php?id=${order_number}&success=true`,
          furl: `http://143.110.190.232/payu/response-handler.php?success=false`,
        };
        await setPayUObject(obj);
        setTimeout(() => {
          payuForm.current.submit();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const displayRazorpay = async () => {
    let res;

    try {
      const params = new URLSearchParams();
      params.append('amount', totalCurruncy * 100);
      res = await postData('/orders/orderCreate', params);
      if (!res.data) return;
    } catch (error) {
      console.error(error);
    }
    const { amount, id: order_id, order_number, currency: currencyData } = res.data;

    const options = {
      key: 'rzp_test_JPg2lSvdZkY3Ak', // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currencyData,
      name: 'Soma',
      image: '/',
      //order_id,
      modal: {
        escape: false,
        ondismiss: () => {
          navigate('/payment-success?success=false')
        },
      },
      handler: async function (response) {
        try {
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
          params.append('currency', currency);
          params.append('currency_symbol', symbol);

          params.append('order_note', data?.note || '');
          params.append('is_shipping_save', data?.is_shipping_save ? 'Yes' : 'No');
          params.append('sub_total', totalCurruncy);
          params.append('total', totalCurruncy);
          params.append('payment_type', 'Razorpay');
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
          params.append('order_number', order_number);
          params.append('razorpay_id', response.razorpay_payment_id);
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
        } catch (error) {
          console.error(error);
        }
      },
      prefill: {
        name: data.shipping_name || '',
        email: data.shipping_email || '',
        contact: data.shipping_contact || '',
      },
      theme: {
        color: '#ebdbc8',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    if (createOrder) {
      handleSubmit();
    }
  }, [createOrder]);

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  });
  return (
    <>
      <div className='checkout__content--step section__shipping--address pt-10'>
        <div className='section__header mb-25'>
          <h3 className='section__header--title'>Payment</h3>
          <p className='section__header--desc'>All transactions are secure and encrypted.</p>
        </div>
        <div className='checkout__content--step__inner3 border-radius-5'>
          {/* <div className='checkout__address--content__header d-flex align-items-center justify-content-between'></div> */}
          <div className='checkout__content--input__box--wrapper '>
            {currency === 'INR' && (
              <div className='shipping__contact--box__list'>
                <div className='shipping__radio--input'>
                  <input
                    className='shipping__radio--input__field'
                    id='radiobox4'
                    name='paymentMethod'
                    type='radio'
                    value={'online'}
                    onChange={handleChangeMethod}
                    disabled={currency !== 'INR'}
                  />
                </div>
                <label className='shipping__radio--label' htmlFor='radiobox4'>
                  <span className='shipping__radio--label__primary'>
                    Credit card / Debit Card / UPI{' '}
                    <img src='assets/images/icon/Razorpay.png' alt='RazorPay' />
                  </span>
                </label>
              </div>
            )}
            <div className='shipping__contact--box__list'>
              <div className='shipping__radio--input'>
                <input
                  className='shipping__radio--input__field'
                  id='radiobox5'
                  name='paymentMethod'
                  value={'ccavenue'}
                  onChange={handleChangeMethod}
                  type='radio'
                />
              </div>
              <label className='shipping__radio--label' htmlFor='radiobox5'>
                <span className='shipping__radio--label__primary'>
                  Credit Card / Debit Card{' '}
                  <img className src='assets/images/icon/ccavenue.png' alt='ccavenue' />
                </span>
              </label>
            </div>
            {/* {currency === 'INR' && (
              // <div className='shipping__contact--box__list'>
              //   <div className='shipping__radio--input'>
              //     <input
              //       className='shipping__radio--input__field'
              //       id='radiobox3'
              //       name='paymentMethod'
              //       value={'payu'}
              //       type='radio'
              //       onChange={handleChangeMethod}
              //       disabled={currency !== 'INR'}
              //     />
              //   </div>
              //   <label className='shipping__radio--label' htmlFor='radiobox3'>
              //     <span className='shipping__radio--label__primary'>
              //       PayU Money{' '}
              //       <img className src='assets/images/icon/payu.png' width={50} alt='PayU money' />
              //       <img className src='assets/images/icon/PayPal-Logo.wine.png' alt='PayPal' />
              //     </span>
              //   </label>
              // </div>
            )} */}
            {currency !== 'INR' && (
              <div className='shipping__contact--box__list'>
                <div className='shipping__radio--input'>
                  <input
                    className='shipping__radio--input__field'
                    id='paypalBtn'
                    name='paymentMethod'
                    value={'paypal'}
                    type='radio'
                    onChange={handleChangeMethod}
                    disabled={currency === 'INR'}
                  />
                </div>
                <label className='shipping__radio--label' htmlFor='paypalBtn'>
                  <span className='shipping__radio--label__primary'>
                    PayPal{' '}
                    <img className src='assets/images/icon/PayPal-Logo.wine.png' alt='PayPal' />
                  </span>
                </label>
              </div>
            )}
            {currency === 'INR' && isCodAvailable && (
              <div className='shipping__contact--box__list'>
                <div className='shipping__radio--input'>
                  <input
                    className='shipping__radio--input__field'
                    id='radiobox6'
                    name='paymentMethod'
                    type='radio'
                    value={'cod'}
                    onChange={handleChangeMethod}
                    disabled={currency !== 'INR'}
                  />
                </div>
                <label className='shipping__radio--label' htmlFor='radiobox6'>
                  <span className='shipping__radio--label__primary'>COD (Cash On Delivery) </span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      <form ref={payuForm} action='https://sandboxsecure.payu.in/_payment' method='post'>
        <input type='hidden' name='key' value={payUObject.key} />
        <input type='hidden' name='txnid' value={payUObject.txnid} />
        <input type='hidden' name='productinfo' value={payUObject.productinfo} />
        <input type='hidden' name='amount' value={payUObject.amount} />
        <input type='hidden' name='email' value={payUObject.email} />
        <input type='hidden' name='firstname' value={payUObject.firstname} />
        <input type='hidden' name='surl' value={payUObject.surl} />
        <input type='hidden' name='furl' value={payUObject.furl} />
        <input type='hidden' name='hash' value={payUObject.hash} />
        {/* <input type='submit' value='submit' /> */}
        <input
          type='hidden'
          name='service_provider'
          value={payUObject.service_provider}
          size='64'
        />
      </form>
      <form
        ref={ccForm}
        name='redirect'
        action='https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
        method='post'
      >
        <input type='hidden' name='encRequest' value={ccObject.encRequest} />
        <input type='hidden' name='access_code' value={ccObject.access_code} />
      </form>

      {/* <div style={{ padding: '10px 0', fontSize: '20px' }}>
        <input type={'radio'} onChange={handleChangeMethod} id='cod' name='payment' value={'cod'} />
        <label htmlFor='cod' style={{ margin: '0 15px 0 5px', cursor: 'pointer' }}>
          Cash on delivery
        </label>
        <input
          type={'radio'}
          onChange={handleChangeMethod}
          id='online'
          name='payment'
          value={'online'}
        />
        <label htmlFor='online' style={{ marginLeft: '5px', cursor: 'pointer' }}>
          Pay Online
        </label>
      </div> */}
    </>
  );
};

export default PaymentModule;
