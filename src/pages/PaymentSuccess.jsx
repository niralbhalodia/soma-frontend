import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Summary from '../components/shared/checkout/Summary';
import { clearCart } from '../redux/action/cart';
import { postData } from '../utils/apiCall';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = useLocation().search;

  const orderId = new URLSearchParams(searchParams).get('id');
  const successStatus = new URLSearchParams(searchParams).get('success');
  const [userData, setUserData] = useState();
  const [orderData, setOrderData] = useState();

  //   const { state } = useLocation();
  //   const [userData] = useState(state?.userData);
  const [cartProducts, setCartProducts] = useState([]);
  //   useEffect(() => {
  //     if (!state?.userData) {
  //       navigate('/profile');
  //     }
  //     if (state?.items?.length > 0) {
  //       setCartProducts(state?.items);
  //       dispatch(clearCart());
  //     }
  //   }, [state]);

  useEffect(() => {
    const checkCodAvailability = async () => {
      const params = new URLSearchParams();
      params.append('id', orderId);
      const res = await postData('/orders/getByOrderNumber', params);
      console.log(res);
      setUserData(res?.data?.user);
      setOrderData(res?.data);
      await setCartProducts(
        res?.data?.order_items?.map((value, index, array) => {
          value = {
            ...value,
            numberOfItems: array[index]?.qty,
            image: array[index]?.product?.image,
          };
          return value;
        }),
      );
      if (cartProducts?.length > 0 && successStatus === 'true') {
        dispatch(clearCart());
      }
    };
    checkCodAvailability();
  }, []);
  return (
    <Layout>
      {successStatus == 'true' ? (
        <div className='checkout__page--area'>
          <div className='container'>
            <div className='checkout__page--inner d-flex'>
              <div className='main checkout__mian'>
                <Summary
                  cartProducts={cartProducts}
                  total={orderData?.total}
                  subTotal={orderData?.subTotal}
                  step={2}
                  forMobile={true}
                />
                <main className='main__content_wrapper'>
                  <form action='#'>
                    <div className='checkout__content--step section__shipping--address pt-0'>
                      <div className='section__header checkout__header--style3 position__relative mb-25'>
                        <span className='checkout__order--number'>
                          Order #{orderData?.order_number}
                        </span>
                        <h2 className='section__header--title h3'>Thank you submission</h2>
                        <div className='checkout__submission--icon'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='25.995'
                            height='25.979'
                            viewBox='0 0 512 512'
                          >
                            <path
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={32}
                              d='M416 128L192 384l-96-96'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='order__confirmed--area border-radius-5 mb-15'>
                        <h3 className='order__confirmed--title h4'>
                          {successStatus == 'true'
                            ? 'Payment Sucessfull. Your Order Confirmed'
                            : 'Payment Failed. Try again'}
                        </h3>
                        <p className='order__confirmed--desc'>
                          {successStatus == 'true'
                            ? 'You,ll receive a confirmation email with your order number shortly'
                            : ''}
                        </p>
                      </div>
                      <div className='customer__information--area border-radius-5'>
                        <h3 className='customer__information--title h4'>Customer Information</h3>
                        <div className='customer__information--inner d-flex'>
                          <div className='customer__information--list'>
                            <div className='customer__information--step'>
                              <h4 className='customer__information--subtitle h5'>
                                Contact information
                              </h4>
                              <ul>
                                <li>
                                  <a className='customer__information--text__link' href='#'>
                                    {orderData?.contact_info} / {orderData?.email}
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className='customer__information--step'>
                              <h4 className='customer__information--subtitle h5'>
                                Billing Address
                              </h4>
                              <ul>
                                <li>
                                  <span className='customer__information--text'>
                                    {userData?.name}
                                  </span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.shipping_street_address}
                                  </span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {/* {userData?.billing_city} - {userData?.billing_postcode} */}
                                    {orderData?.shipping_postcode}
                                  </span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.shipping_state}
                                  </span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.shipping_country}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className='customer__information--step'>
                              <h4 className='customer__information--subtitle h5'>
                                Shipping Method
                              </h4>
                              <ul>
                                <li>
                                  <span className='customer__information--text'>Blue Dart</span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {' '}
                                    Prepaid / COD
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className='customer__information--list'>
                            <div className='customer__information--step'>
                              <h4 className='customer__information--subtitle h5'>Payment method</h4>
                              <ul>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.payment_type}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className='customer__information--step'>
                              <h4 className='customer__information--subtitle h5'>
                                Shipping Address
                              </h4>
                              <ul>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.shipping_first_name} {orderData?.shipping_last_name}
                                  </span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.shipping_street_address}
                                  </span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.shipping_city} - {orderData?.shipping_postcode}
                                  </span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.shipping_state}
                                  </span>
                                </li>
                                <li>
                                  <span className='customer__information--text'>
                                    {orderData?.shipping_country}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='checkout__content--step__footer d-flex align-items-center'>
                      <Link
                        className='continue__shipping--btn primary__btn border-radius-5'
                        to='/profile'
                      >
                        My Orders
                      </Link>
                    </div>
                  </form>
                </main>
              </div>
              <Summary
                cartProducts={cartProducts}
                total={orderData?.total}
                subTotal={orderData?.subTotal}
                step={2}
              />
            </div>
          </div>
        </div>
      ) : (
        <section className='error__section section--padding'>
          <div className='container'>
            <div className='row row-cols-1'>
              <div className='col'>
                <div className='error__content text-center'>
                  <h2 className='error__content--title'>Payment Failed. Please try again </h2>
                  <Link className='error__content--btn primary__btn' to='/cart'>
                    Back To Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default PaymentSuccess;
