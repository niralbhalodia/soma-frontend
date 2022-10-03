import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Summary from '../components/shared/checkout/Summary';
import { clearCart } from '../redux/action/cart';

const CheckOut3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = useSelector((state) => state?.auth?.email || '');
  const [userData] = useState(state?.userData);
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (!state?.userData) {
      navigate('/profile');
    }
    if (state?.items?.length > 0) {
      setCartProducts(state?.items);
      dispatch(clearCart());
    }
  }, [state]);
  return (
    <Layout>
      <div className='checkout__page--area'>
        <div className='container'>
          <div className='checkout__page--inner d-flex'>
            <div className='main checkout__mian'>
              <Summary
                cartProducts={cartProducts}
                total={userData?.total}
                subTotal={userData?.subTotal}
                step={2}
                forMobile={true}
                isOrder={true}
                userData={userData}
              />
              <main className='main__content_wrapper'>
                <form action='#'>
                  <div className='checkout__content--step section__shipping--address pt-0'>
                    <div className='section__header checkout__header--style3 position__relative mb-25'>
                      <span className='checkout__order--number'>
                        Order #{userData?.order_number}
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
                      <h3 className='order__confirmed--title h4'>Your order is confirmed</h3>
                      <p className='order__confirmed--desc'>
                        You,ll receive a confirmation email with your order number shortly
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
                                  {userData?.contact_info} / {email}
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className='customer__information--step'>
                            <h4 className='customer__information--subtitle h5'>Billing Address</h4>
                            <ul>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.billing_first_name} {userData?.billing_last_name}
                                </span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.billing_street_address}
                                </span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.billing_city} - {userData?.billing_postcode}
                                </span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.billing_state}
                                </span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.billing_country}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className='customer__information--step'>
                            <h4 className='customer__information--subtitle h5'>Shipping Method</h4>
                            <ul>
                              <li>
                                <span className='customer__information--text'>Blue Dart</span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.payment_type === 'Cash' ? 'COD' : 'Prepaid'}
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
                                  {userData?.payment_type}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className='customer__information--step'>
                            <h4 className='customer__information--subtitle h5'>Shipping Address</h4>
                            <ul>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.shipping_first_name} {userData?.shipping_last_name}
                                </span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.shipping_street_address}
                                </span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.shipping_city} - {userData?.shipping_postcode}
                                </span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.shipping_state}
                                </span>
                              </li>
                              <li>
                                <span className='customer__information--text'>
                                  {userData?.shipping_country}
                                </span>
                              </li>
                            </ul>
                          </div>
                          {userData?.order_note && (
                            <div className='customer__information--step'>
                              <h4 className='customer__information--subtitle h5'>Note:</h4>
                              <ul>
                                <li>
                                  <span className='customer__information--text'>
                                    {userData.order_note}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
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
              total={userData?.total}
              subTotal={userData?.subTotal}
              step={2}
              isOrder={true}
              userData={userData}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckOut3;
