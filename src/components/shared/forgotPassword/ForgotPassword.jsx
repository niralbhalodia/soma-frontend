import React, { useState } from 'react';
import ForgotPasswordModal from './ForgotPasswordModal';

const ForgotPassword = (props) => {
  return (
    <>
      <ForgotPasswordModal {...props} />
    </>
  );
};

export default ForgotPassword;
