import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Address from '../components/shared/profile/address/Address';
import Wishlist from '../components/shared/profile/Wishlist';
import Invoices from '../components/shared/profile/invoice/Invoices';
import MyProfile from '../components/shared/profile/MyProfile';
import { logout } from '../redux/action/auth';

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(1);
  const userName = useSelector((state) => state.auth.name);

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
                  <span className='text-red'>My Account</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* my account section start */}
        <section className='my__account--section section--padding'>
          <div className='container'>
            <p className='account__welcome--text'>Hello, {userName}! welcome to your dashboard!</p>
            <div className='my__account--section__inner border-radius-10 d-flex'>
              <div className='account__left--sidebar'>
                {/* <h2 className='account__content--title h3 mb-20'>My Profile</h2> */}
                <ul className='account__menu'>
                  <li className={cx('account__menu--list', { active: selectedTab === 1 })}>
                    <Link
                      to='#'
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab(1);
                      }}
                    >
                      My profile
                    </Link>
                  </li>
                  <li className={cx('account__menu--list', { active: selectedTab === 2 })}>
                    <Link
                      to='#'
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab(2);
                      }}
                    >
                      Orders
                    </Link>
                  </li>
                  <li className={cx('account__menu--list', { active: selectedTab === 3 })}>
                    <Link
                      to='#'
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab(3);
                      }}
                    >
                      Addresses
                    </Link>
                  </li>
                  <li className='account__menu--list'>
                    <Link
                      to='#'
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab(4);
                      }}
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li className='account__menu--list'>
                    <Link
                      to='#'
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(logout());
                        navigate('/');
                      }}
                    >
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='account__wrapper'>
                {selectedTab === 1 && <MyProfile />}
                {selectedTab === 2 && <Invoices />}
                {selectedTab === 3 && <Address />}
                {selectedTab === 4 && <Wishlist />}
              </div>
            </div>
          </div>
        </section>
        {/* my account section end */}
      </main>
    </Layout>
  );
};

export default MyAccount;
