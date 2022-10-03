import * as Yup from 'yup';

const username = Yup.string()
    .min(3, 'Your username must consist of at least 3 characters ')
    .max(50, 'Your username must consist of at least 3 characters ')
    .required('Please enter a username'),
  password = Yup.string()
    .min(3, 'Your password must be at least 3 characters long')
    .max(50, 'Your password must not be more than 50 characters long')
    .required('Please provide a password'),
  email = Yup.string().email().required('Please provide your email'),
  mobile = Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid',
    )
    .required('Please provide your mobile number'),
  otp = Yup.number('Invalid OTP').required('Please provide your otp'),
  message = Yup.string().required('Please provide your message'),
  tandc = Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  country = Yup.string().required('Please provide your country name'),
  name = Yup.string().required('Please provide your name'),
  fName = Yup.string().required('Please provide your first name'),
  lName = Yup.string().required('Please provide your last name'),
  gender = Yup.string().required('Please select gender'),
  birthdate = Yup.string().required('Please provide your date of birth'),
  cName = Yup.string().required('Please provide your company name'),
  address = Yup.string().required('Please provide your address'),
  city = Yup.string().required('Please provide your city'),
  state = Yup.string().required('Please provide your state'),
  zip = Yup.string().required('Please provide your zip'),
  phone = Yup.number().required('Please provide your phone'),
  defferentAddress = Yup.boolean(),
  country2 = Yup.string().when('defferentAddress', {
    is: true,
    then: Yup.string().required('Please provide your country name'),
  }),
  fName2 = Yup.string().when('defferentAddress', {
    is: true,
    then: Yup.string().required('Please provide your frist name'),
  }),
  lName2 = Yup.string().when('defferentAddress', {
    is: true,
    then: Yup.string().required('Please provide your last name'),
  }),
  cName2 = Yup.string().when('defferentAddress', {
    is: true,
    then: Yup.string().required('Please provide your company name'),
  }),
  address2 = Yup.string().when('defferentAddress', {
    is: true,
    then: Yup.string().required('Please provide your address'),
  }),
  city2 = Yup.string().when('defferentAddress', {
    is: true,
    then: Yup.string().required('Please provide your city'),
  }),
  state2 = Yup.string().when('defferentAddress', {
    is: true,
    then: Yup.string().required('Please provide your seate name'),
  }),
  zip2 = Yup.string().when('defferentAddress', {
    is: true,
    then: Yup.string().required('Please provide your zip code'),
  }),
  phone2 = Yup.number().when('defferentAddress', {
    is: true,
    then: Yup.number().required('Please provide your number'),
  }),
  email2 = Yup.string()
    .email()
    .when('defferentAddress', {
      is: true,
      then: Yup.string().email().required('Please provide your email'),
    }),
  createAccount = Yup.boolean(),
  password2 = Yup.string().when('createAccount', {
    is: true,
    then: Yup.string()
      .min(5, 'Your password must be at least 5 characters long')
      .max(50, 'Your password must be at least 5 characters long')
      .required('Please provide a password'),
  }),
  coupon = Yup.string().required('Please provide your coupon code');

export const loginSchema = {
  schema: Yup.object().shape({
    email,
    password,
  }),
  initialValue: { email: '', password: '' },
};

export const checkoutSchema = {
  schema: Yup.object().shape({
    country,
    fName,
    lName,
    address,
    state,
    country,
    cName,
    email,
    city,
    zip,
    phone,
    country2,
    fName2,
    lName2,
    address2,
    state2,
    country2,
    cName2,
    city2,
    zip2,
    phone2,
    email2,
    defferentAddress,
    createAccount,
    password2,
  }),
  initialValue: {
    country: '',
    fName: '',
    lName: '',
    address: '',
    state: '',
    country: '',
    cName: '',
    city: '',
    zip: '',
    phone: '',
    country2: '',
    fName2: '',
    lName2: '',
    address2: '',
    state2: '',
    country2: '',
    cName2: '',
    city2: '',
    zip2: '',
    phone2: '',
    email: '',
    email2: '',
    defferentAddress: false,
    createAccount: false,
  },
};

export const couponSchema = {
  schema: Yup.object().shape({
    coupon,
  }),
  initialValue: { coupon: '' },
};

export const registerSchema = {
  schema: Yup.object().shape({
    name,
    email,
    mobile,
    // birthdate,
    // gender,
    password,
  }),
  initialValue: {
    name: '',
    email: '',
    mobile: '',
    // birthdate: '',
    // gender: '',
    password: '',
  },
};

export const contactSchema = {
  schema: Yup.object().shape({
    first_name: fName,
    last_name: lName,
    phone_number: mobile,
    email,
    message,
  }),
  initialValue: {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    message: '',
  },
};

export const profileSchema = {
  schema: Yup.object().shape({
    name,
    email,
    mobile,
    // birthdate,
    // gender,
  }),
  initialValue: {
    name: '',
    email: '',
    mobile: '',
    // birthdate: '',
    // gender: '',
  },
};

export const addressShema = {
  schema: Yup.object().shape({
    first_name: fName,
    last_name: lName,
    // company: cName,
    street_address: address,
    apartment: '',
    city,
    country,
    state,
    postcode: zip,
  }),
  initialValue: {
    first_name: '',
    last_name: '',
    company: '',
    street_address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    postcode: '',
    is_default: [],
  },
};

export const forgotPasswordSchema = {
  schema: Yup.object().shape({
    email,
  }),
  initialValue: {
    email: '',
  },
};

export const otpSchema = {
  schema: Yup.object().shape({
    otp,
  }),
  initialValue: {
    otp: '',
  },
};

export const updatePasswordSchema = {
  schema: Yup.object().shape({
    password,
    cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  }),
  initialValue: { password: '', cpassword: '' },
};

export const checkoutPageSchema = {
  schema: Yup.object().shape({
    shipping_first_name: fName,
    shipping_last_name: lName,
    contact_info: mobile,
    // shipping_company: name,
    shipping_street_address: address,
    // shipping_apartment: name,
    shipping_city: city,
    shipping_country: country,
    shipping_state: state,
    shipping_postcode: zip,
  }),

  initialValue: {
    shipping_contact: '',
    shipping_email: '',
    shipping_first_name: '',
    shipping_last_name: '',
    shipping_company: '',
    shipping_street_address: '',
    shipping_apartment: '',
    shipping_state: '',
    shipping_country: '',
    shipping_city: '',
    shipping_postcode: '',
  },
};

export const verifyPasswordSchema = {
  schema: Yup.object().shape({
    password,
    cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  }),
  initialValue: { password: '', cpassword: '' },
};
