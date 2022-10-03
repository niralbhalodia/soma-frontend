import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Modal from '../../../common/Modal';
import { addressShema } from '../../../../utils/yupModal';
import { postData } from '../../../../utils/apiCall';
import toast from 'react-hot-toast';

const AddressModal = (props) => {
  const [states, setStates] = useState([]);

  const handleSubmit = async (values) => {
    console.log('values', values);
    let {
      first_name,
      last_name,
      street_address,
      apartment,
      city,
      country,
      state,
      postcode,
      is_default,
    } = values;

    let params = new URLSearchParams();
    params.append('first_name', first_name);
    params.append('last_name', last_name);
    params.append('street_address', street_address);
    params.append('apartment', apartment);
    params.append('city', city);
    params.append('country', country);
    params.append('state', state);

    params.append('postcode', postcode);
    params.append('is_default', is_default[0] === 'Yes' ? 'Yes' : 'No');

    if (props?.address?.id) {
      params.append('id', props.address.id);
      console.log('params', params);
      const res = await postData('/address/updateAddress', params);
      if (res?.success === 1) {
        props.closeModal();
        toast.success('Address updated successfully');
      }
    } else {
      const res = await postData('/address/addAddress', params);
      if (res?.success === 1) {
        props.closeModal();
        toast.success('Address added');
      }
    }
  };

  const getStates = async (value, state='') => {
    const findId = props?.countries.find((country) => country.name === value);
    let params = new URLSearchParams();
    params.append('country_id', findId?.id);
    const res = await postData('/state/getStateByCountry', params);
    if (res?.success === 1) {
      setStates(res.data);
      formik.setFieldValue('state', state);
    }
  };

  const formik = useFormik({
    initialValues: addressShema.initialValue,
    validationSchema: addressShema.schema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    formik.resetForm();
  }, [props.isVisible]);

  useEffect(() => {
    if (props.address) {
      let {
        first_name,
        last_name,
        street_address,
        apartment,
        city,
        country,
        state,
        postcode,
        is_default,
      } = props.address;
      is_default = is_default === 'Yes' ? ['Yes'] : [];
      getStates(country, state)
      formik.setValues({
        first_name,
        last_name,
        street_address,
        apartment,
        city,
        country,
        state,
        postcode,
        is_default,
      });
    }
  }, [props.address]);

  return (
    <>
      <Modal title={props?.address?.id ? 'Update Address' : 'Add New Adress'} {...props}>
        <form onSubmit={formik.handleSubmit} className='p-50'>
          <div className='checkout__content--input__box--wrapper'>
            <div className='row'>
              <div className='col-lg-6 mb-12'>
                <div className='checkout__input--list '>
                  <label>First name</label>
                  <input
                    name='first_name'
                    className='checkout__input--field border-radius-5'
                    placeholder='First name'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />
                  {formik.errors.first_name && (
                    <span className='form-error'>{formik.errors.first_name}</span>
                  )}
                </div>
              </div>
              <div className='col-lg-6 mb-12'>
                <div className='checkout__input--list'>
                  <label>Last name</label>
                  <input
                    name='last_name'
                    className='checkout__input--field border-radius-5'
                    placeholder='Last name'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                  />
                  {formik.errors.last_name && (
                    <span className='form-error'>{formik.errors.last_name}</span>
                  )}
                </div>
              </div>
              <div className='col-12 mb-12'>
                <div className='checkout__input--list'>
                  <label>Street address</label>
                  <input
                    name='street_address'
                    className='checkout__input--field border-radius-5'
                    placeholder='Street address'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.street_address}
                  />
                  {formik.errors.street_address && (
                    <span className='form-error'>{formik.errors.street_address}</span>
                  )}
                </div>
              </div>
              <div className='col-12 mb-12'>
                <div className='checkout__input--list'>
                  <label>Apartment (optional)</label>
                  <input
                    name='apartment'
                    className='checkout__input--field border-radius-5'
                    placeholder='Apartment, suite, etc. (optional)'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.apartment}
                  />
                </div>
              </div>
              <div className='col-12 mb-12'>
                <div className='checkout__input--list'>
                  <label>City</label>
                  <input
                    name='city'
                    className='checkout__input--field border-radius-5'
                    placeholder='City'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                  {formik.errors.city && <span className='form-error'>{formik.errors.city}</span>}
                </div>
              </div>
              {/* <div className='col-lg-6 mb-12'>
                <div className='checkout__input--list'>
                  <label>Country</label>
                  <input
                    name='country'
                    className='checkout__input--field border-radius-5'
                    placeholder='Country'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.country}
                  />
                  {formik.errors.country && (
                    <span className='form-error'>{formik.errors.country}</span>
                  )}
                </div>
              </div> */}
              <div className='col-lg-6 mb-12'>
                <div className='checkout__input--list'>
                  <label>Country</label>
                  <select
                    name='country'
                    className='checkout__input--field border-radius-5'
                    placeholder='Country'
                    type='text'
                    onChange={(e) => {
                      getStates(e.target.value);
                      formik.handleChange(e);
                    }}
                    value={formik.values.country}
                  >
                    <option value={''}>Select country</option>
                    {props?.countries?.map((country) => (
                      <option value={country.name}>{country.name}</option>
                    ))}
                  </select>
                  {formik.errors.country && (
                    <span className='form-error'>{formik.errors.country}</span>
                  )}
                </div>
              </div>
              <div className='col-lg-6 mb-12'>
                <div className='checkout__input--list'>
                  <label>State</label>
                  <select
                    name='state'
                    className='checkout__input--field border-radius-5'
                    placeholder='State'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.state}
                  >
                    <option value={''}>Select State</option>
                    {states?.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.country && (
                    <span className='form-error'>{formik.errors.country}</span>
                  )}
                </div>
              </div>
              <div className='col-lg-6 mb-12'>
                <div className='checkout__input--list'>
                  <label>Postal code</label>
                  <input
                    name='postcode'
                    className='checkout__input--field border-radius-5'
                    placeholder='Postal code'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.postcode}
                  />
                  {formik.errors.postcode && (
                    <span className='form-error'>{formik.errors.postcode}</span>
                  )}
                </div>
              </div>
              <div className='col-lg-12 mb-12'>
                <div className='checkout__input--list'>
                  <input
                    name='is_default'
                    id='is_default'
                    className='border-radius-5'
                    placeholder='Postal code'
                    type='checkbox'
                    onChange={formik.handleChange}
                    checked={formik.values.is_default[0] === 'Yes' ? true : false}
                    value={'Yes'}
                  />
                  <label htmlFor='is_default'> &nbsp; Set as default address</label>
                </div>
              </div>
            </div>
          </div>
          <div className='checkout__content--step__footer d-flex justify-content-center align-items-center'>
            <button type='submit' className='continue__shipping--btn primary__btn border-radius-5'>
              {props?.address?.id ? 'Update address' : 'Add address'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddressModal;
