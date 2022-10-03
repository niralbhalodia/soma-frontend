import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import { registerSchema } from '../utils/yupModal';
import { postData } from '../utils/apiCall';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUp = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    let { name, email, mobile, birthdate, password, gender } = values;

    let params = new URLSearchParams();
    params.append('name', name);
    params.append('email', email);
    params.append('mobile', mobile);
    // params.append('birthdate', moment(birthdate).format('YYYY-MM-DD')); //Y-m-d / 1990-01-25
    params.append('password', password);
    // params.append('gender', gender); //Male / Female / Other
    const res = await postData('/user/register', params);
    if (res.success === 1) {
      navigate('/login');
    }
  };
  const formik = useFormik({
    initialValues: registerSchema.initialValue,
    validationSchema: registerSchema.schema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });
  useEffect(() => {
    if (isLogin) navigate('/');
  }, [isLogin]);
  return (
    <Layout>
      <main className='main__content_wrapper'>
        {/* Start breadcrumb section */}
        <section className='breadcrumb__section breadcrumb__bg'>
          <div className='row row-cols-1 ML-20'>
            <div className='col'>
              <ul className='breadcrumb__content--menu d-flex '>
                <li className='breadcrumb__content--menu__items'>
                  <Link className='text-red' to='/'>
                    Home
                  </Link>
                </li>
                <li className='breadcrumb__content--menu__items'>
                  <span className='text-red'>Signup</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start Signup section  */}
        <div className='login__section section--padding'>
          <div className='container'>
            <form onSubmit={formik.handleSubmit}>
              <div className='login__section--inner'>
                <div className='row row-cols-md-2 row-cols-1'>
                  <div className='col mx-auto'>
                    <div className='account__login register'>
                      <div className='account__login--header mb-25'>
                        <h2 className='account__login--header__title h3 mb-10'>
                          Create an Account
                        </h2>
                        <p className='account__login--header__desc'>
                          Register here if you are a new customer
                        </p>
                      </div>
                      <div className='account__login--inner'>
                        <div className='login--input-group'>
                          <input
                            name='name'
                            type='text'
                            className='account__login--input'
                            placeholder='Name'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          {formik.errors.name && (
                            <span className='form-error'>{formik.errors.name}</span>
                          )}
                        </div>
                        <div className='login--input-group'>
                          <input
                            name='email'
                            type='text'
                            className='account__login--input'
                            placeholder='Email Address'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                          />
                          {formik.errors.email && (
                            <span className='form-error'>{formik.errors.email}</span>
                          )}
                        </div>
                        <div className='login--input-group'>
                          <input
                            name='mobile'
                            type='text'
                            className='account__login--input'
                            placeholder='Mobile No.'
                            onChange={formik.handleChange}
                            value={formik.values.mobile}
                          />
                          {formik.errors.mobile && (
                            <span className='form-error'>{formik.errors.mobile}</span>
                          )}
                        </div>
                        {/* <div className='login--input-group'>
                          <input
                            name='birthdate'
                            type='date'
                            className='account__login--input'
                            onChange={formik.handleChange}
                            value={formik.values.birthdate}
                          />
                          {formik.errors.birthdate && (
                            <span className='form-error'>{formik.errors.birthdate}</span>
                          )}
                        </div> */}
                        {/* <div className='login--input-group'>
                          <div className='account__login--radio'>
                            <label>Gender</label>
                            <div>
                              <input
                                id='male'
                                name='gender'
                                type='radio'
                                value={'Male'}
                                checked={formik.values.gender === 'Male'}
                                onChange={() => formik.setFieldValue('gender', 'Male')}
                              />
                              <label htmlFor='male'> Male</label>
                            </div>
                            <div>
                              <input
                                id='female'
                                name='gender'
                                type='radio'
                                value={'Female'}
                                checked={formik.values.gender === 'Female'}
                                onChange={() => formik.setFieldValue('gender', 'Female')}
                              />
                              <label htmlFor='female'> Female</label>
                            </div>
                            <div>
                              <input
                                id='other'
                                name='gender'
                                type='radio'
                                value={'Other'}
                                checked={formik.values.gender === 'Other'}
                                onChange={() => formik.setFieldValue('gender', 'Other')}
                              />
                              <label htmlFor='other'> Other</label>
                            </div>
                          </div>
                          {formik.errors.gender && (
                            <span className='form-error'>{formik.errors.gender}</span>
                          )}
                        </div> */}
                        <div className='login--input-group'>
                          <input
                            name='password'
                            type='password'
                            className='account__login--input'
                            placeholder='Password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                          />
                          {formik.errors.password && (
                            <span className='form-error'>{formik.errors.password}</span>
                          )}
                        </div>
                        <button className='account__login--btn primary__btn mb-10' type='submit'>
                          Submit &amp; Register
                        </button>
                        <div className='account__login--remember position__relative'>
                          <input
                            className='checkout__checkbox--input'
                            id='check2'
                            type='checkbox'
                          />
                          <span className='checkout__checkbox--checkmark' />
                          <label
                            className='checkout__checkbox--label login__remember--label'
                            htmlFor='check2'
                          >
                            I have read and agree to the terms &amp; conditions
                          </label>
                        </div>
                        <p className='account__login--signup__text'>
                          Already Have an Account? <Link to={'/login'}>Login here</Link>
                        </p>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* End login section  */}
      </main>
    </Layout>
  );
};

export default SignUp;
