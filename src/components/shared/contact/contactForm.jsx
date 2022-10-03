import React from 'react';
import { useFormik } from 'formik';
import { contactSchema } from '../../../utils/yupModal';
import toast from 'react-hot-toast';
import { postData } from '../../../utils/apiCall';

const ContactForm = () => {
  const handleSubmit = async (values) => {
    let { first_name, last_name, phone_number, email, message } = values;

    let params = new URLSearchParams();
    params.append('first_name', first_name);
    params.append('last_name', last_name);
    params.append('phone_number', phone_number);
    params.append('email', email);
    params.append('message', message);
    const res = await postData('/user/contactUs', params);
    if (res.success === 1) {
      toast.success(res.message || 'Message sent successfully');
      formik.resetForm();
    }
  };
  const formik = useFormik({
    initialValues: contactSchema.initialValue,
    validationSchema: contactSchema.schema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <>
      <div className='contact__form'>
        <h3 className='contact__form--title mb-40'>Contact Me</h3>
        <form className='contact__form--inner' onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <div className='contact__form--list mb-20'>
                <label className='contact__form--label' htmlFor='input1'>
                  First Name <span className='contact__form--label__star'>*</span>
                </label>
                <input
                  name='first_name'
                  type='text'
                  className='contact__form--input'
                  placeholder='Your First Name'
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                {formik.errors.first_name && (
                  <span className='form-error'>{formik.errors.first_name}</span>
                )}
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='contact__form--list mb-20'>
                <label className='contact__form--label' htmlFor='input2'>
                  Last Name <span className='contact__form--label__star'>*</span>
                </label>
                <input
                  name='last_name'
                  type='text'
                  className='contact__form--input'
                  placeholder='Your Last Name'
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
                {formik.errors.last_name && (
                  <span className='form-error'>{formik.errors.last_name}</span>
                )}
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='contact__form--list mb-20'>
                <label className='contact__form--label' htmlFor='input3'>
                  Phone Number <span className='contact__form--label__star'>*</span>
                </label>
                <input
                  name='phone_number'
                  type='text'
                  className='contact__form--input'
                  placeholder='Phone number'
                  onChange={formik.handleChange}
                  value={formik.values.phone_number}
                />
                {formik.errors.phone_number && (
                  <span className='form-error'>{formik.errors.phone_number}</span>
                )}
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='contact__form--list mb-20'>
                <label className='contact__form--label' htmlFor='input4'>
                  Email <span className='contact__form--label__star'>*</span>
                </label>
                <input
                  name='email'
                  type='text'
                  className='contact__form--input'
                  placeholder='Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && <span className='form-error'>{formik.errors.email}</span>}
              </div>
            </div>
            <div className='col-12'>
              <div className='contact__form--list mb-15'>
                <label className='contact__form--label' htmlFor='input5'>
                  Write Your Message <span className='contact__form--label__star'>*</span>
                </label>
                <textarea
                  name='message'
                  className='contact__form--textarea'
                  placeholder='Write Your Message'
                  onChange={formik.handleChange}
                  value={formik.values.message}
                />
                {formik.errors.message && (
                  <span className='form-error'>{formik.errors.message}</span>
                )}
              </div>
            </div>
          </div>
          <button className='contact__form--btn primary__btn' type='submit'>
            Submit Now
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
