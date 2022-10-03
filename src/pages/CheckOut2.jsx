import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PaymentModule from '../components/shared/payment/PaymentModule';
import { totalPrice } from '../utils/cart';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import Summary from '../components/shared/checkout/Summary';
import { checkoutPageSchema } from '../utils/yupModal';
import { postData } from '../utils/apiCall';
import PayPal from '../components/PayPal';

const CheckOut2 = () => {
  const { state: shippingData } = useLocation();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.products);
  const [total, setTotal] = useState(totalPrice(cartProducts));
  const [createOrder, setCreateOrder] = useState(false);
  const [method, setMethod] = useState('');
  const [isCodAvailable, setIsCodAvailable] = useState(false);
  const [hasDifferentAddress, setHasDifferentAddress] = useState(false);
  const [billingData, setBillingData] = useState({ ...shippingData });
  const [countries] = useState(shippingData?.countries);
  const [states, setStates] = useState(shippingData?.states);

  const handleSubmit = async (values) => {
    await setBillingData(values);
    // triggering create order api, check Payment module file
    setCreateOrder(true);
  };

  const formik = useFormik({
    initialValues: { ...shippingData },
    validationSchema: checkoutPageSchema.schema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const getStates = async (value) => {
    const findId = countries.find((country) => country.name === value);
    let params = new URLSearchParams();
    params.append('country_id', findId?.id);
    const res = await postData('/state/getStateByCountry', params);
    if (res?.success === 1) {
      setStates(res.data);
      formik.setFieldValue('shipping_state', '');
    }
  };

  const checkCodAvailability = async () => {
    if(shippingData?.shipping_postcode) {
      const params = new URLSearchParams();
      params.append('pinCode', shippingData?.shipping_postcode);
      const res = await postData('/products/checkCODAvailability', params);
      console.log(res);
      if (res.data?.GetServicesforPincodeResult?.eTailCODAirInbound == 'Yes') {
        setIsCodAvailable(true);
      } else {
        setIsCodAvailable(false);
      }
    }
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      setTotal(totalPrice(cartProducts));
    } else navigate('/cart');
  }, [cartProducts]);

  useEffect(() => {
    checkCodAvailability()
  }, []);

  return (
    <Layout>
      <div className='checkout__page--area'>
        <div className='container'>
          <div className='checkout__page--inner d-flex'>
            <div className='main checkout__mian mb-60'>
              <Summary cartProducts={cartProducts} total={total} step={2} forMobile={true} />
              <main className='main__content_wrapper'>
                <form onSubmit={(e) => e.preventDefault()} method='post'>
                  <div className='checkout__content--step checkout__contact--information2 border-radius-5'>
                    <div className='checkout__review d-flex justify-content-between align-items-center'>
                      <div className='checkout__review--inner d-flex align-items-center'>
                        <label className='checkout__review--label'>Contact</label>
                        <span className='checkout__review--content'>
                          {shippingData?.shipping_email || ''} /{' '}
                          {shippingData?.shipping_contact || ''}
                        </span>
                      </div>
                      {/* <div className='checkout__review--link'>
                        <button
                          className='checkout__review--link__text'
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/checkout', { state: shippingData });
                          }}
                        >
                          Change
                        </button>
                      </div> */}
                    </div>
                    <div className='checkout__review d-flex justify-content-between align-items-center'>
                      <div className='checkout__review--inner d-flex align-items-center'>
                        <label className='checkout__review--label'> Ship to</label>
                        <span className='checkout__review--content'>
                          {' '}
                          {shippingData?.shipping_first_name &&
                            `${shippingData.shipping_first_name} ${shippingData.shipping_last_name}, `}{' '}
                          {shippingData?.shipping_company && `${shippingData.shipping_company}, `}{' '}
                          {shippingData?.shipping_street_address &&
                            `${shippingData.shipping_street_address}, `}{' '}
                          {shippingData?.shipping_postcode && `${shippingData.shipping_postcode}, `}{' '}
                          {shippingData?.shipping_state && `${shippingData.shipping_state}, `}{' '}
                          {shippingData?.shipping_country || ''}
                        </span>
                      </div>
                      <div className='checkout__review--link'>
                        <button
                          className='checkout__review--link__text'
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/checkout', { state: shippingData });
                          }}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                    {/* <div className='checkout__review d-flex justify-content-between align-items-center'>
                      <div className='checkout__review--inner d-flex align-items-center'>
                        <label className='checkout__review--label'> Method</label>
                        <span className='checkout__review--content'>
                          {' '}
                          Standard . <strong>₹0.23</strong>
                        </span>
                      </div>
                      <div className='checkout__review--link'>
                        <button
                          className='checkout__review--link__text'
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/checkout', { state: shippingData });
                          }}
                        >
                          Change
                        </button>
                      </div>
                    </div> */}
                  </div>
                  <div>
                    {/* <div className='checkout__content--step section__shipping--address'>
                      <div className='section__header mb-25'>
                        <h3 className='section__header--title'>Payment</h3>
                        <p className='section__header--desc'>
                          All transactions are secure and encrypted.
                        </p>
                      </div>
                      <div className='checkout__content--step__inner3 border-radius-5'>
                        <div className='checkout__address--content__header d-flex align-items-center justify-content-between'>
                          <span className='checkout__address--content__title'>Credit card</span>
                          <span className='heckout__address--content__icon'>
                            <img src='assets/images/icon/credit-card.svg' alt='card' />
                          </span>
                        </div>
                        <div className='checkout__content--input__box--wrapper '>
                          <div className='row'>
                            <div className='col-12 mb-12'>
                              <div className='checkout__input--list position__relative'>
                                <label>
                                  <input
                                    className='checkout__input--field border-radius-5'
                                    placeholder='Card number'
                                    type='text'
                                  />
                                </label>
                                <button className='checkout__input--field__button' type='button'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='15.51'
                                    height='15.443'
                                    viewBox='0 0 512 512'
                                  >
                                    <path
                                      d='M336 208v-95a80 80 0 00-160 0v95'
                                      fill='none'
                                      stroke='currentColor'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={32}
                                    />
                                    <rect
                                      x={96}
                                      y={208}
                                      width={320}
                                      height={272}
                                      rx={48}
                                      ry={48}
                                      fill='none'
                                      stroke='currentColor'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={32}
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className='col-12 mb-12'>
                              <div className='checkout__input--list'>
                                <label>
                                  <input
                                    className='checkout__input--field border-radius-5'
                                    placeholder='Name on card'
                                    type='text'
                                  />
                                </label>
                              </div>
                            </div>
                            <div className='col-lg-6 mb-12'>
                              <div className='checkout__input--list'>
                                <label>
                                  <input
                                    className='checkout__input--field border-radius-5'
                                    placeholder='piration date (MM / YY)'
                                    type='text'
                                  />
                                </label>
                              </div>
                            </div>
                            <div className='col-lg-6 mb-12'>
                              <div className='checkout__input--list position__relative'>
                                <label>
                                  <input
                                    className='checkout__input--field border-radius-5'
                                    placeholder='Security code'
                                    type='text'
                                  />
                                </label>
                                <button className='checkout__input--field__button' type='button'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='18.51'
                                    height='18.443'
                                    viewBox='0 0 512 512'
                                  >
                                    <title>Help Circle</title>
                                    <path
                                      d='M256 80a176 176 0 10176 176A176 176 0 00256 80z'
                                      fill='none'
                                      stroke='currentColor'
                                      strokeMiterlimit={10}
                                      strokeWidth={32}
                                    />
                                    <path
                                      d='M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296'
                                      fill='none'
                                      stroke='currentColor'
                                      strokeLinecap='round'
                                      strokeMiterlimit={10}
                                      strokeWidth={28}
                                    />
                                    <circle cx={250} cy={348} r={20} />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className='checkout__content--step section__shipping--address'>
                      <div className='section__header mb-25'>
                        <h3 className='section__header--title'>Billing address</h3>
                        <p className='section__header--desc'>
                          Select the address that matches your card or payment method.
                        </p>
                      </div>
                      <div className='checkout__content--step__inner3 border-radius-5'>
                        <div className='checkout__address--content__header'>
                          <div className='shipping__contact--box__list'>
                            <div className='shipping__radio--input'>
                              <input
                                className='shipping__radio--input__field'
                                id='radiobox'
                                name='checkmethod'
                                type='radio'
                                defaultChecked={true}
                                onChange={(e) => {
                                  setHasDifferentAddress(false);
                                }}
                              />
                            </div>
                            <label className='shipping__radio--label' htmlFor='radiobox'>
                              <span className='shipping__radio--label__primary'>
                                Same as shipping address
                              </span>
                            </label>
                          </div>
                          <div className='shipping__contact--box__list'>
                            <div className='shipping__radio--input'>
                              <input
                                className='shipping__radio--input__field'
                                id='radiobox2'
                                name='checkmethod'
                                type='radio'
                                onChange={(e) => {
                                  setHasDifferentAddress(true);
                                }}
                              />
                            </div>
                            <label className='shipping__radio--label' htmlFor='radiobox2'>
                              <span className='shipping__radio--label__primary'>
                                Use a different billing address
                              </span>
                            </label>
                          </div>
                        </div>
                        {hasDifferentAddress && (
                          <div className='checkout__content--input__box--wrapper '>
                            <div className='section__shipping--address__content'>
                              <div className='row'>
                                <div className='col-lg-6 mb-12'>
                                  <div className='checkout__input--list '>
                                    <label>
                                      <input
                                        name='shipping_first_name'
                                        className='checkout__input--field border-radius-5'
                                        placeholder='First name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.shipping_first_name}
                                      />
                                      {formik.errors.shipping_first_name && (
                                        <span className='form-error'>
                                          {formik.errors.shipping_first_name}
                                        </span>
                                      )}
                                    </label>
                                  </div>
                                </div>
                                <div className='col-lg-6 mb-12'>
                                  <div className='checkout__input--list'>
                                    <label>
                                      <input
                                        name='shipping_last_name'
                                        className='checkout__input--field border-radius-5'
                                        placeholder='Last name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.shipping_last_name}
                                      />
                                      {formik.errors.shipping_last_name && (
                                        <span className='form-error'>
                                          {formik.errors.shipping_last_name}
                                        </span>
                                      )}
                                    </label>
                                  </div>
                                </div>

                                <div className='col-12 mb-12'>
                                  <div className='checkout__input--list '>
                                    <label>
                                      <input
                                        name='contact_info'
                                        className='checkout__input--field border-radius-5'
                                        placeholder='Mobile No.'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.contact_info}
                                      />
                                      {formik.errors.contact_info && (
                                        <span className='form-error'>
                                          {formik.errors.contact_info}
                                        </span>
                                      )}
                                    </label>
                                  </div>
                                </div>

                                <div className='col-12 mb-12'>
                                  <div className='checkout__input--list '>
                                    <label>
                                      <input
                                        name='shipping_company'
                                        className='checkout__input--field border-radius-5'
                                        placeholder='Company (optional)'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.shipping_company}
                                      />
                                    </label>
                                  </div>
                                </div>

                                <div className='col-12 mb-12'>
                                  <div className='checkout__input--list'>
                                    <label>
                                      <input
                                        name='shipping_street_address'
                                        className='checkout__input--field border-radius-5'
                                        placeholder='Address'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.shipping_street_address}
                                      />
                                      {formik.errors.shipping_street_address && (
                                        <span className='form-error'>
                                          {formik.errors.shipping_street_address}
                                        </span>
                                      )}
                                    </label>
                                  </div>
                                </div>
                                <div className='col-12 mb-12'>
                                  <div className='checkout__input--list '>
                                    <label>
                                      <input
                                        name='shipping_apartment'
                                        className='checkout__input--field border-radius-5'
                                        placeholder='Near by landmark (optional)'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.shipping_apartment}
                                      />
                                    </label>
                                  </div>
                                </div>

                                <div className='col-12 mb-12'>
                                  <div className='checkout__input--list'>
                                    <label>
                                      <input
                                        name='shipping_city'
                                        className='checkout__input--field border-radius-5'
                                        placeholder='City'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.shipping_city}
                                      />
                                      {formik.errors.shipping_city && (
                                        <span className='form-error'>
                                          {formik.errors.shipping_city}
                                        </span>
                                      )}
                                    </label>
                                  </div>
                                </div>

                                <div className='col-lg-6 mb-12'>
                                  <div className='checkout__input--list'>
                                    <div className='checkout__input--list checkout__input--select select'>
                                      <label className='checkout__select--label' htmlFor='country'>
                                        Country/region
                                      </label>
                                      <select
                                        name='shipping_country'
                                        className='checkout__input--select__field border-radius-5'
                                        onChange={(e) => {
                                          getStates(e.target.value);
                                          formik.handleChange(e);
                                        }}
                                        value={formik.values.shipping_country}
                                      >
                                        <option value={''}>Select country</option>
                                        {countries?.map((country) => (
                                          <option key={country.id} value={country.name}>
                                            {country.name}
                                          </option>
                                        ))}
                                      </select>
                                      {formik.errors.shipping_country && (
                                        <span className='form-error'>
                                          {formik.errors.shipping_country}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='col-lg-6 mb-12'>
                                  <div className='checkout__input--list'>
                                    <div className='checkout__input--list checkout__input--select select'>
                                      <label className='checkout__select--label' htmlFor='country'>
                                        States
                                      </label>
                                      <select
                                        name='shipping_state'
                                        className='checkout__input--select__field border-radius-5'
                                        onChange={formik.handleChange}
                                        value={formik.values.shipping_state}
                                      >
                                        <option value={''}>Select State</option>
                                        {states?.map((state) => (
                                          <option key={state.id} value={state.name}>
                                            {state.name}
                                          </option>
                                        ))}
                                      </select>
                                      {formik.errors.shipping_state && (
                                        <span className='form-error'>
                                          {formik.errors.shipping_state}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='col-lg-6 mb-12'>
                                  <div className='checkout__input--list'>
                                    <label>
                                      <input
                                        name='shipping_postcode'
                                        className='checkout__input--field border-radius-5'
                                        placeholder='Postal code'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.shipping_postcode}
                                      />
                                      {formik.errors.shipping_postcode && (
                                        <span className='form-error'>
                                          {formik.errors.shipping_postcode}
                                        </span>
                                      )}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <PaymentModule
                      data={shippingData}
                      billingData={billingData}
                      createOrder={createOrder}
                      method={method}
                      setMethod={setMethod}
                      isCodAvailable={isCodAvailable}
                    />
                  </div>

                  <div className='checkout__content--step__footer d-flex align-items-center'>
                    {method === 'paypal' ? (
                      <PayPal data={shippingData} billingData={billingData} />
                    ) : (
                      <button
                        className={cx('continue__shipping--btn primary__btn border-radius-5', {
                          disabled: !method,
                        })}
                        type='button'
                        onClick={() => {
                          if (method) {
                            // validate billing form only if not same as shipping address
                            if (hasDifferentAddress) {
                              formik.handleSubmit();
                            } else {
                              // triggering create order api, check Payment module file
                              setCreateOrder(true);
                            }
                          } else {
                            toast.remove();
                            toast.error('Please select payment method!');
                          }
                        }}
                      >
                        {method === 'cod' ? 'Place order' : 'Pay now'}
                      </button>
                    )}
                    <Link
                      className='previous__link--content'
                      to='#'
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/checkout', { state: shippingData });
                      }}
                    >
                      Return to shipping
                    </Link>
                  </div>
                </form>
              </main>
            </div>
            <Summary cartProducts={cartProducts} total={total} step={2} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckOut2;
