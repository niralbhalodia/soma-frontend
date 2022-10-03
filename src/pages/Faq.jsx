import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Faq = () => {
  return (
    <Layout>
      <main className='main__content_wrapper'>
        {/* Start breadcrumb section */}
        <section className='breadcrumb__section breadcrumb__bg'>
          <div className='container'>
            <div className='row row-cols-1'>
              <div className='col'>
                <div className='breadcrumb__content text-center'>
                  <h1 className='breadcrumb__content--title text-white mb-25'>Frequently</h1>
                  <ul className='breadcrumb__content--menu d-flex justify-content-center'>
                    <li className='breadcrumb__content--menu__items'>
                      <Link className='text-red' to='/'>
                        Home
                      </Link>
                    </li>
                    <li className='breadcrumb__content--menu__items'>
                      <span className='text-white'>Frequently</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* faq page section start */}
        <section className='faq__section section--padding'>
          <div className='container'>
            <div className='faq__section--inner'>
              <div className='face__step one border-bottom' id='accordionExample'>
                <h2 className='face__step--title h3 mb-30'>Shipping Information</h2>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='accordion__container'>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            What Shipping Methods Are Available?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            How Long Will it Take To Get My Package??
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            What payment types can I use?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='accordion__container'>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            Do you ship internationally??
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            How will my parcel be delivered?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            How do I know if something is organic?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='face__step one border-bottom' id='accordionExample2'>
                <h3 className='face__step--title mb-30'>Payment Information</h3>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='accordion__container'>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            What payment types can I use?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            Can I pay by Gift Card?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            can't make a payment
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='accordion__container'>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            Has my payment gone through?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            Tracking my order
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            Haven’t received my order
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='face__step one' id='accordionExample3'>
                <h3 className='face__step--title mb-30'>Orders and Returns</h3>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='accordion__container'>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            How can I return an item?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className=' accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            What Shipping Methods Are Available?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            How can i make refund from your website?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='accordion__container'>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            I am a new user. How should I start?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            What payment methods are accepted?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                      <div className='accordion__items'>
                        <h2 className='accordion__items--title'>
                          <button className='faq__accordion--btn accordion__items--button'>
                            Do you ship internationally?
                            <svg
                              className='accordion__items--button__icon'
                              xmlns='http://www.w3.org/2000/svg'
                              width='20.355'
                              height='13.394'
                              viewBox='0 0 512 512'
                            >
                              <path
                                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </h2>
                        <div className='accordion__items--body'>
                          <p className='accordion__items--body__desc'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                            Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
                            sit amet orci. Aenean dignissim felis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* faq page section end */}
        {/* Start shipping section */}
        <section className='shipping__section2 shipping__style3 section--padding pt-0'>
          <div className='container'>
            <div className='shipping__section2--inner shipping__style3--inner d-flex justify-content-between'>
              <div className='shipping__items2 d-flex align-items-center'>
                <div className='shipping__items2--icon'>
                  <img src='assets/images/other/shipping1.png' alt />
                </div>
                <div className='shipping__items2--content'>
                  <h2 className='shipping__items2--content__title h3'>Shipping</h2>
                  <p className='shipping__items2--content__desc'>From handpicked sellers</p>
                </div>
              </div>
              <div className='shipping__items2 d-flex align-items-center'>
                <div className='shipping__items2--icon'>
                  <img src='assets/images/other/shipping2.png' alt />
                </div>
                <div className='shipping__items2--content'>
                  <h2 className='shipping__items2--content__title h3'>Payment</h2>
                  <p className='shipping__items2--content__desc'>From handpicked sellers</p>
                </div>
              </div>
              <div className='shipping__items2 d-flex align-items-center'>
                <div className='shipping__items2--icon'>
                  <img src='assets/images/other/shipping3.png' alt />
                </div>
                <div className='shipping__items2--content'>
                  <h2 className='shipping__items2--content__title h3'>Return</h2>
                  <p className='shipping__items2--content__desc'>From handpicked sellers</p>
                </div>
              </div>
              <div className='shipping__items2 d-flex align-items-center'>
                <div className='shipping__items2--icon'>
                  <img src='assets/images/other/shipping4.png' alt />
                </div>
                <div className='shipping__items2--content'>
                  <h2 className='shipping__items2--content__title h3'>Support</h2>
                  <p className='shipping__items2--content__desc'>From handpicked sellers</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End shipping section */}
      </main>
    </Layout>
  );
};

export default Faq;
