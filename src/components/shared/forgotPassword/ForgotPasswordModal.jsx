import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { postData } from '../../../utils/apiCall';
import { forgotPasswordSchema, otpSchema, updatePasswordSchema } from '../../../utils/yupModal';
import Modal from '../../common/Modal';

const ForgotPasswordModal = (props) => {
  const [email, setEmail] = useState('');

  // state to check if otp is sent
  const [isOtpSent, setOtpSent] = useState(false);

  // state to check if otp verified
  const [isVerified, setVerified] = useState(false);

  // state to show and hide password
  const [showPass, setShowPass] = useState(false);

  const [userData, setUserData] = useState();

  // function to send otp
  const handleSendOtp = async ({ email }) => {
    let params = new URLSearchParams();
    params.append('email', email);
    const res = await postData('/user/resetPassword', params);
    if (res?.success === 1) {
      toast.success('Otp sent to your email');
      setOtpSent(true);
      setEmail(email);
    }
  };

  // function to verify otp
  const handleVerifyOtp = async ({ otp }) => {
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('resetPasswordCode', otp);
    const res = await postData('/user/verifyResetPasswordCode', params);
    if (res?.success === 1) {
      setVerified(true);
      setUserData(res.data);
    }
  };

  // function to update password
  const handleUpdatePassword = async ({ password }) => {
    const { id, resetPasswordCode } = userData;
    let params = new URLSearchParams();
    params.append('id', id);
    params.append('resetPasswordCode', resetPasswordCode);
    params.append('password', password);
    const res = await postData('/user/updatePassword', params);
    if (res?.success === 1) {
      toast.success(res.message || 'Password updated successfully');
      // closing modal
      props.setVisible(false);
    }
  };

  // with these 3 formik hooks we are handlig forms and validation
  const getOtpFormik = useFormik({
    initialValues: forgotPasswordSchema.initialValue,
    validationSchema: forgotPasswordSchema.schema,
    onSubmit: handleSendOtp,
    validateOnBlur: false,
    validateOnChange: false,
  });
  const verifyOtpFormik = useFormik({
    initialValues: otpSchema.initialValue,
    validationSchema: otpSchema.schema,
    onSubmit: handleVerifyOtp,
    validateOnBlur: false,
    validateOnChange: false,
  });
  const updatePasswordFormik = useFormik({
    initialValues: updatePasswordSchema.initialValue,
    validationSchema: updatePasswordSchema.schema,
    onSubmit: handleUpdatePassword,
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <>
      <Modal title={`Forgot Password`} {...props}>
        <div className='p-50'>
          <div className='checkout__content--input__box--wrapper'>
            <div className='row'>
              {!isVerified ? (
                <>
                  {/* this part of JSX will be shown till otp not verified */}
                  <div className='col-12 mb-12'>
                    <div className='checkout__input--list'>
                      <label>
                        <input
                          name='email'
                          className='checkout__input--field border-radius-5'
                          placeholder='Email'
                          type='text'
                          onChange={getOtpFormik.handleChange}
                          value={getOtpFormik.values.email}
                          disabled={isOtpSent}
                        />
                      </label>
                      {getOtpFormik.errors.email && (
                        <span className='form-error'>{getOtpFormik.errors.email}</span>
                      )}
                    </div>
                  </div>
                  {isOtpSent && (
                    <div className='col-12 mb-12'>
                      <div className='checkout__input--list'>
                        <label>
                          <input
                            name='otp'
                            className='checkout__input--field border-radius-5'
                            placeholder='Enter OTP...'
                            type='text'
                            onChange={verifyOtpFormik.handleChange}
                            value={verifyOtpFormik.values.otp}
                            disabled={!isOtpSent}
                          />
                        </label>
                        {verifyOtpFormik.errors.otp && (
                          <span className='form-error'>{verifyOtpFormik.errors.otp}</span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className='checkout__content--step__footer d-flex justify-content-center align-items-center'>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        if (isOtpSent) {
                          verifyOtpFormik.handleSubmit();
                        } else getOtpFormik.handleSubmit();
                      }}
                      className='continue__shipping--btn primary__btn border-radius-5'
                    >
                      {isOtpSent ? 'Verify Otp' : 'Get OTP'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* After OTP verification, update password block will be rendered */}
                  <div className='col-12 mb-12'>
                    <div className='checkout__input--list'>
                      <label>
                        <input
                          name='password'
                          className='checkout__input--field border-radius-5'
                          placeholder='Password'
                          type={showPass ? 'text' : 'password'}
                          onChange={updatePasswordFormik.handleChange}
                          value={updatePasswordFormik.values.password}
                        />
                      </label>
                      {updatePasswordFormik.errors.password && (
                        <span className='form-error'>{updatePasswordFormik.errors.password}</span>
                      )}
                    </div>
                  </div>
                  <div className='col-12 mb-12'>
                    <div className='checkout__input--list'>
                      <label>
                        <input
                          name='cpassword'
                          className='checkout__input--field border-radius-5'
                          placeholder='Confirm Password'
                          type={showPass ? 'text' : 'password'}
                          onChange={updatePasswordFormik.handleChange}
                          value={updatePasswordFormik.values.cpassword}
                        />
                      </label>
                      {updatePasswordFormik.errors.cpassword && (
                        <span className='form-error'>{updatePasswordFormik.errors.cpassword}</span>
                      )}
                    </div>
                  </div>
                  <div className='col-12 mb-12'>
                    <div className='checkout__input--list'>
                      <input
                        name='cpassword'
                        className='border-radius-5'
                        value={showPass}
                        onChange={(e) => setShowPass(e.target.checked)}
                        type='checkbox'
                        id='show-password'
                      />
                      <label htmlFor='show-password'>
                        &nbsp; {showPass ? 'hide password' : 'show password'}
                      </label>
                    </div>
                  </div>
                  <div className='checkout__content--step__footer d-flex justify-content-center align-items-center'>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        updatePasswordFormik.handleSubmit();
                      }}
                      className='continue__shipping--btn primary__btn border-radius-5'
                    >
                      Update Password
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
