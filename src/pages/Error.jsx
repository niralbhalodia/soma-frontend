import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Error = () => {
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
                  <span className='text-red'>404</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start error section */}
        <section className='error__section section--padding'>
          <div className='container'>
            <div className='row row-cols-1'>
              <div className='col'>
                <div className='error__content text-center'>
                  <img
                    className='error__content--img mb-50'
                    src='assets/images/other/404-thumb.png'
                    alt='error-img'
                  />
                  <h2 className='error__content--title'>Opps ! We,ar Not Found This Page </h2>
                  <Link className='error__content--btn primary__btn' to='/'>
                    Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End error section */}
      </main>
    </Layout>
  );
};

export default Error;
