import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import { loginSchema } from '../utils/yupModal';
import { postData } from '../utils/apiCall';
import { login } from '../redux/action/auth';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPassword from '../components/shared/forgotPassword/ForgotPassword';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Login = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const [redirectCheckOut, setRedirectCheckOut] = useState(false);
  const handleSubmit = async (values) => {
    await handleLogin(values, 'email');
  };

  const responseGoogle = async (response) => {
    const { googleId } = response;
    const { email, name } = response?.profileObj;
    if (googleId && email)
      await handleLogin(
        {
          email,
          social_id: googleId,
          name,
        },
        'google',
      );
  };

  const responseFacebook = async (response) => {
    console.log(response);
    // await handleLogin(
    //   {
    //     email: response?.profileObj?.email || '',
    //     social_id: response.googleId,
    //     name: response?.profileObj?.name || '',
    //   },
    //   'facebook',
    // );
  };

  const handleLogin = async (values, login_type) => {
    let { email, password, social_id, name } = values;
    const params = new URLSearchParams();
    params.append('email', email);
    if (login_type === 'email') params.append('password', password);
    else {
      params.append('login_type', login_type);
      params.append('social_id', social_id);
      params.append('name', name);
    }
    const res = await postData('/user/login', params);
    if (res?.success === 1) {
      dispatch(
        login({
          token: res.data.accesstoken,
          ...res.data,
        }),
      );
      if (redirectCheckOut) navigate('/checkout');
      else navigate('/');
    }
  };

  const formik = useFormik({
    initialValues: loginSchema.initialValue,
    validationSchema: loginSchema.schema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    if (state?.fromCheckOut) setRedirectCheckOut(true);
  }, [state]);

  useEffect(() => {
    if (isLogin && !redirectCheckOut) navigate('/');
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
                  <span className='text-red'>Login</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start login section  */}
        <div className='login__section section--padding'>
          <div className='container'>
            <form onSubmit={formik.handleSubmit}>
              <div className='login__section--inner'>
                <div className='row row-cols-md-2 row-cols-1'>
                  <div className='col mx-auto'>
                    <div className='account__login'>
                      <div className='account__login--header mb-25'>
                        <h2 className='account__login--header__title h3 mb-10'>Login</h2>
                        <p className='account__login--header__desc'>
                          Login if you are a returning customer.
                        </p>
                      </div>
                      <div className='account__login--inner'>
                        <div className='login--input-group'>
                          <input
                            name='email'
                            className='account__login--input'
                            placeholder='Email Address'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                          />
                          {formik.errors.email && (
                            <span className='form-error'>{formik.errors.email}</span>
                          )}
                        </div>
                        <div className='login--input-group'>
                          <input
                            name='password'
                            className='account__login--input'
                            placeholder='Password'
                            type='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                          />
                          {formik.errors.password && (
                            <span className='form-error'>{formik.errors.password}</span>
                          )}
                        </div>
                        <div className='account__login--remember__forgot mb-15 d-flex justify-content-between align-items-center'>
                          <div className='account__login--remember position__relative'>
                            <input
                              className='checkout__checkbox--input'
                              id='check1'
                              type='checkbox'
                            />
                            <span className='checkout__checkbox--checkmark' />
                            <label
                              className='checkout__checkbox--label login__remember--label'
                              htmlFor='check1'
                            >
                              Remember me
                            </label>
                          </div>
                          <button
                            className='account__login--forgot'
                            type='button'
                            onClick={(e) => {
                              e.preventDefault();
                              setVisible(true);
                            }}
                          >
                            Forgot Your Password?
                          </button>
                        </div>
                        <button className='account__login--btn primary__btn' type='submit'>
                          Login
                        </button>
                        <div className='account__login--divide'>
                          <span className='account__login--divide__text'>OR</span>
                        </div>
                        <div className='account__social d-flex justify-content-center mb-15'>
                          {/* <a
                            className='account__social--link facebook'
                            target='_blank'
                            href='https://www.facebook.com/'
                          >
                            Facebook
                          </a> */}
                          <FacebookLogin
                            appId='385894503497245'
                            autoLoad={false}
                            fields='name,email,picture'
                            onClick={(res) => {
                              console.log(res);
                            }}
                            callback={responseFacebook}
                            render={(props) => {
                              return (
                                <Link
                                  className='account__social--link facebook'
                                  onClick={props.onClick}
                                  to='#'
                                >
                                  Facebook
                                </Link>
                              );
                            }}
                            cssClass='account__social--link facebook'
                          />

                          <GoogleLogin
                            clientId='648987776135-isumo5b82vhhm7n2cm14lbcl1sijtgmc.apps.googleusercontent.com'
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            isSignedIn={false}
                            render={(props) => {
                              return (
                                <Link
                                  className='account__social--link google'
                                  target='_blank'
                                  onClick={props.onClick}
                                  disabled={props.disabled}
                                  to='#'
                                >
                                  Google
                                </Link>
                              );
                            }}
                          />

                          {/* <a
                            className='account__social--link google'
                            target='_blank'
                            href='https://www.google.com/'
                          >
                            Google
                          </a> */}
                        </div>
                        <p className='account__login--signup__text'>
                          Don't Have an Account? <Link to={'/signup'}>Sign up now</Link>
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
      <ForgotPassword isVisible={isVisible} setVisible={setVisible} />
    </Layout>
  );
};

export default Login;
