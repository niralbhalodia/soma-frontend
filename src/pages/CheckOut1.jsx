import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { totalPrice } from '../utils/cart';
import { checkoutPageSchema } from '../utils/yupModal';
import { useFormik } from 'formik';
import Summary from '../components/shared/checkout/Summary';
import { postData } from '../utils/apiCall';
import { setSelectedCurrency } from '../redux/action/currency';

const CheckOut1 = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { state: shippingData } = useLocation();
  const userData = useSelector((state) => state.auth);
  const cartProducts = useSelector((state) => state.cart.products);
  const [total, setTotal] = useState(totalPrice(cartProducts));
  const [saveAddress, setSaveAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const handleSubmit = async (values) => {
    navigate('/payment', {
      state: {
        ...values,
        note: shippingData?.note,
        is_shipping_save: saveAddress,
        selectedAddress,
        countries,
        states,
      },
    });
  };

  const formik = useFormik({
    initialValues: checkoutPageSchema.initialValue,
    validationSchema: checkoutPageSchema.schema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });
  const getAddresses = async () => {
    const res = await postData('/address/getAddress');
    if (res.success === 1) {
      if (res?.data?.length > 0) {
        setAddresses(res.data);
      }
    }
  };
  const getCountries = async () => {
    const res = await postData('/country/getCountry');
    if (res.success === 1) setCountries(res.data);
  };
  const getStates = async (value) => {
    const findId = countries.find((country) => country.name === value);
    let params = new URLSearchParams();
    params.append('country_id', findId?.id);
    const res = await postData('/state/getStateByCountry', params);
    if (res?.success === 1) {
      setStates(res.data);
      // formik.setFieldValue('shipping_state', '');
    }
  };

  const setDefaultAddress = () => {
    if (addresses?.length > 0) {
      let defaultAddress = addresses?.find(({ is_default }) => is_default === 'Yes');
      updateAddress(defaultAddress);
      setSelectedAddress(defaultAddress || addresses[0]);
    }
  };

  const updateAddress = (defaultAddress) => {
    if (defaultAddress?.id) {
      formik.setFieldValue('shipping_first_name', defaultAddress?.first_name);
      formik.setFieldValue('shipping_last_name', defaultAddress?.last_name);
      formik.setFieldValue('contact_info', userData.mobile);
      formik.setFieldValue('shipping_company', defaultAddress?.company);
      formik.setFieldValue('shipping_apartment', defaultAddress?.apartment);
      formik.setFieldValue('shipping_street_address', defaultAddress?.street_address);
      formik.setFieldValue('shipping_state', defaultAddress?.state);
      formik.setFieldValue('shipping_country', defaultAddress?.country);
      dispatch(setSelectedCurrency(defaultAddress?.country === 'India' ? 1 : 2))
      getStates(defaultAddress?.country);
      formik.setFieldValue('shipping_state', defaultAddress?.state);
      formik.setFieldValue('shipping_city', defaultAddress?.city);
      formik.setFieldValue('shipping_postcode', defaultAddress?.postcode);
    }
  };

  const handleAddress = (id) => {
    let defaultAddress = addresses.find((address) => address.id === Number(id));
    updateAddress(defaultAddress);
    setSelectedAddress(defaultAddress);
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      setTotal(totalPrice(cartProducts));
    } else navigate('/cart');
  }, [cartProducts]);

  useEffect(() => {
    if (userData) {
      userData.email && formik.setFieldValue('shipping_email', userData.email);
      if (userData.mobile) {
        formik.setFieldValue('shipping_contact', userData.mobile);
        formik.setFieldValue('contact_info', userData.mobile);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (shippingData?.selectedAddress) {
      {
        /*
          if there is shipping selected address data from next page
          then it will set selected address but if getAddress() api data getting and 
          meanwhile we are setting selected address then it won't be selected in dropdown.
          that is why I have added addresses into dependency array at bottom.
        */
      }
      setSelectedAddress(shippingData?.selectedAddress);
      handleAddress(shippingData?.selectedAddress?.id);
    } else {
      // Setting default address for first time
      setDefaultAddress();
    }

    // Pre filling fields if user returning from billing/payment page

    if (shippingData?.shipping_first_name)
      formik.setFieldValue('shipping_first_name', shippingData?.shipping_first_name);
    if (shippingData?.shipping_last_name)
      formik.setFieldValue('shipping_last_name', shippingData?.shipping_last_name);
    if (shippingData?.contact_info)
      formik.setFieldValue('contact_info', shippingData?.contact_info);
    if (shippingData?.shipping_company)
      formik.setFieldValue('shipping_company', shippingData?.shipping_company);
    if (shippingData?.shipping_apartment)
      formik.setFieldValue('shipping_apartment', shippingData?.shipping_apartment);
    if (shippingData?.shipping_street_address)
      formik.setFieldValue('shipping_street_address', shippingData?.shipping_street_address);
    if (shippingData?.shipping_country) {
      formik.setFieldValue('shipping_country', shippingData.shipping_country);
      getStates(shippingData.shipping_country);
    }
    if (shippingData?.shipping_state)
      formik.setFieldValue('shipping_state', shippingData?.shipping_state);
    if (shippingData?.shipping_city)
      formik.setFieldValue('shipping_city', shippingData?.shipping_city);
    if (shippingData?.shipping_postcode)
      formik.setFieldValue('shipping_postcode', shippingData?.shipping_postcode);
    if (shippingData?.is_shipping_save) setSaveAddress(true);
  }, [shippingData, addresses]);

  const getAllData = async () => {
    await getCountries();
    getAddresses();
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Layout>
      <div className='checkout__page--area'>
        <div className='container'>
          <div className='checkout__page--inner d-flex'>
            <div className='main checkout__mian'>
              <Summary cartProducts={cartProducts} total={total} forMobile={true} />
              <main className='main__content_wrapper'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='checkout__content--step section__contact--information'>
                    <div className='section__header checkout__section--header d-flex align-items-center justify-content-between mb-25'>
                      <h2 className='section__header--title h3'>Contact information</h2>
                      {/* <p className='layout__flex--item'>
                        Already have an account?
                        <a className='layout__flex--item__link' href='login.html'>
                          Log in
                        </a>
                      </p> */}
                    </div>
                    <div className='customer__information'>
                      <div className='checkout__email--phone mb-12'>
                        <label>
                          <input
                            name='shipping_contact'
                            className='checkout__input--field border-radius-5'
                            placeholder='Contact number'
                            type='text'
                            disabled
                            value={formik.values.shipping_contact}
                          />
                        </label>
                      </div>
                      <div className='checkout__email--phone mb-12'>
                        <label>
                          <input
                            name='shipping_email'
                            className='checkout__input--field border-radius-5'
                            placeholder='Email'
                            type='text'
                            disabled
                            value={formik.values.shipping_email}
                          />
                        </label>
                      </div>
                      {/* <div className='checkout__checkbox'>
                        <input className='checkout__checkbox--input' id='check1' type='checkbox' />
                        <span className='checkout__checkbox--checkmark' />
                        <label className='checkout__checkbox--label' htmlFor='check1'>
                          Email me with news and offers
                        </label>
                      </div> */}
                    </div>
                  </div>
                  <div className='checkout__content--step section__shipping--address'>
                    <div className='section__header mb-25'>
                      <h3 className='section__header--title'>Shipping address</h3>
                    </div>
                    <div className='section__shipping--address__content'>
                      <div className='row'>
                        {addresses && addresses.length > 0 && (
                          <div className='mb-12'>
                            <div className='checkout__input--list'>
                              <div className='checkout__input--list checkout__input--select select'>
                                <label className='checkout__select--label' htmlFor='country'>
                                  Select address
                                </label>
                                <select
                                  name='address'
                                  className='checkout__input--select__field border-radius-5'
                                  onChange={(e) => {
                                    let { value } = e.target;
                                    if (value !== 'other') handleAddress(value);
                                    else {
                                      formik.resetForm();
                                      setSelectedAddress();
                                      if (userData) {
                                        formik.setFieldValue('contact_info', '');
                                        userData.email &&
                                          formik.setFieldValue('shipping_email', userData.email);
                                        userData.mobile &&
                                          formik.setFieldValue('shipping_contact', userData.mobile);
                                      }
                                    }
                                  }}
                                  value={selectedAddress?.id || 'other'}
                                >
                                  {addresses?.map(
                                    ({
                                      id,
                                      first_name,
                                      last_name,
                                      street_address,
                                      state,
                                      city,
                                      postcode,
                                    }) => (
                                      <option
                                        key={id}
                                        value={id}
                                      >{`${first_name} ${last_name}, ${street_address}, ${city}, ${state} - ${postcode}`}</option>
                                    ),
                                  )}
                                  <option value={'other'}>Other address</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
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
                                <span className='form-error'>{formik.errors.contact_info}</span>
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
                                <span className='form-error'>{formik.errors.shipping_city}</span>
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
                                  if(e.target.value === 'India') {
                                    dispatch(setSelectedCurrency(1))
                                  } else {
                                    dispatch(setSelectedCurrency(2))
                                  }
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
                                <span className='form-error'>{formik.errors.shipping_country}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-6 mb-12'>
                          <div className='checkout__input--list'>
                            <div className='checkout__input--list checkout__input--select select'>
                              <label className='checkout__select--label' htmlFor='state'>
                                States
                              </label>
                              <select
                                name='shipping_state'
                                id='state'
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
                                <span className='form-error'>{formik.errors.shipping_state}</span>
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
                      <div className='checkout__checkbox'>
                        <input
                          className='checkout__checkbox--input'
                          id='check2'
                          type='checkbox'
                          checked={saveAddress}
                          onChange={(e) => setSaveAddress(e.target.checked)}
                        />
                        <span className='checkout__checkbox--checkmark' />
                        <label className='checkout__checkbox--label' htmlFor='check2'>
                          Save this information for next time
                        </label>
                      </div>

                      {/* <div className='checkout__checkbox'>
                        <input className='checkout__checkbox--input' id='check2' type='checkbox' />
                        <span className='checkout__checkbox--checkmark' />
                        <label className='checkout__checkbox--label' htmlFor='check2'>
                          Save this information for next time
                        </label>
                      </div> */}
                    </div>
                  </div>

                  <div className='checkout__content--step__footer d-flex align-items-center'>
                    {/* <Link className='continue__shipping--btn primary__btn border-radius-5' to='#'>
                      Pay ₹{total}
                    </Link> */}
                    <button
                      className='continue__shipping--btn primary__btn border-radius-5'
                      type='submit'
                    >
                      Continous to payment
                    </button>

                    <Link className='previous__link--content' to='/cart'>
                      Return to cart
                    </Link>
                  </div>
                </form>
              </main>
            </div>
            <Summary cartProducts={cartProducts} total={total} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckOut1;
