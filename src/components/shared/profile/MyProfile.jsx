import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { profileSchema } from '../../../utils/yupModal';
import { useDispatch, useSelector } from 'react-redux';
import { postData, postFormData } from '../../../utils/apiCall';
import toast from 'react-hot-toast';
import { login } from '../../../redux/action/auth';
import { Upload, Button, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [fileList, setFileList] = useState([]);
  const [imgError, setImgError] = useState('');

  const handleSubmit = async (values) => {
    if (fileList.length !== 0) {
      setImgError('');
      let image = '';
      if (fileList.length > 0 && !fileList[0]?.url) {
        image = fileList[0].originFileObj;
      }
      let { name, email, mobile, birthdate, gender } = values;

      // let params = new URLSearchParams();
      let bodyFormData = new FormData();

      bodyFormData.append('name', name);
      bodyFormData.append('email', email);
      bodyFormData.append('mobile', mobile);
      bodyFormData.append('birthdate', birthdate); //Y-m-d / 1990-01-25
      bodyFormData.append('gender', gender); //Male / Female / Other
      bodyFormData.append('image', image);

      const res = await postFormData('/user/editProfile', bodyFormData);
      if (res?.success === 1) {
        toast.remove();
        toast.success('Profile updated');
        dispatch(login(res?.data));
      }
      setFileList([]);
      // reset();
    } else {
      setImgError('Please select an image');
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImgError('');
  };

  const formik = useFormik({
    initialValues: profileSchema.initialValue,
    validationSchema: profileSchema.schema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });
  useEffect(() => {
    if (user.isLogin) {
      const { name, email, mobile, birthdate, gender, image } = user;
      formik.setValues({
        name,
        email,
        mobile,
        birthdate,
        gender,
      });
      setFileList([{ url: image }]);
    }
  }, [user]);
  return (
    <>
      <div className='login__section'>
        <form onSubmit={formik.handleSubmit}>
          <div className='login__section--inner'>
            <div className='row'>
              <div className='col mx-auto'>
                <div className='register'>
                  <div className='account__login--header mb-25'>
                    <h2 className='account__login--header__title h3 mb-10'>Update profile</h2>
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
                        disabled
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
                    <div className='login--input-group'>
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
                    </div>
                    <div className='login--input-group'>
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
                    </div>
                    <div className='login--input-group'>
                      <Upload
                        accept={' .png, .jpg, .jpeg'}
                        action={'/api/image'}
                        listType='picture'
                        className='upload-list-inline'
                        maxCount={1}
                        fileList={fileList}
                        onChange={onChange}
                        beforeUpload={async (file) => {
                          return false;
                        }}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                      {imgError && <p className='form-error'>{imgError}</p>}
                    </div>
                    <button className='account__login--btn primary__btn mb-10' type='submit'>
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyProfile;
