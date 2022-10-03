import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { postData } from '../../../utils/apiCall';

const NewsLetter = ({ isContentVisible, setIsContentVisible }) => {
  const [email, setEmail] = useState('');
  const subScribe = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('email', email);
    const res = await postData('/user/subscribe', params);
    setEmail('');
    if (res?.success === 1) toast.success(res.message || 'Subscribed Successfully');
    else toast.error(res.message || 'You have already subscribe!');
  };

  return (
    <>
      <div className={isContentVisible === 5 ? 'footer__widget active' : 'footer__widget'}>
        <h2
          className='footer__widget--title text-ofwhite h3'
          onClick={() => {
            if (isContentVisible === 5) setIsContentVisible(null);
            else setIsContentVisible(5);
          }}
        >
          Newsletter
          <button className='footer__widget--button' aria-label='footer widget button'>
            <svg
              className='footer__widget--title__arrowdown--icon'
              xmlns='http://www.w3.org/2000/svg'
              width='12.355'
              height='8.394'
              viewBox='0 0 10.355 6.394'
            >
              <path
                d='M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z'
                transform='translate(-6 -8.59)'
                fill='currentColor'
              />
            </svg>
          </button>
        </h2>
        <div className={isContentVisible === 5 ? '' : 'footer__widget--inner'}>
          <p className='footer__widget--desc text-ofwhite m-0'>
            Fill their seed open meat. Sea you <br /> great Saw image stl
          </p>
          <div className='newsletter__subscribe'>
            <form className='newsletter__subscribe--form' onSubmit={subScribe}>
              <label>
                <input
                  className='newsletter__subscribe--input'
                  placeholder='Email Address'
                  required='required'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button className='newsletter__subscribe--button' type='submit'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
