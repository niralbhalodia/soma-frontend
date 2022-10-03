import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import CategoryFilter from '../components/shared/shop/categories';
import { useSelector } from 'react-redux';
import { postData } from '../utils/apiCall';
import moment from 'moment';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from 'react-share';

const BlogDetails = () => {
  const search = useLocation().search;
  const categories = useSelector((state) => state.menu);
  const [blogData, setBlogData] = useState();
  const id = new URLSearchParams(search).get('id');

  useEffect(() => {
    const getProduct = async () => {
      const params = new URLSearchParams();
      params.append('id', id);
      const res = await postData('/blogs/getBlogById', params);
      setBlogData(res.data);
    };
    if (id) getProduct();
  }, [id]);

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
                  <span className='text-red'>{blogData?.title}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start blog details section */}
        <section className='blog__details--section section--padding'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-xxl-9 col-xl-8 col-lg-8'>
                <div className='blog__details--wrapper'>
                  <div className='entry__blog'>
                    <div className='blog__post--header mb-30'>
                      <h2 className='post__header--title mb-15'>{blogData?.title}</h2>
                      <p className='blog__post--meta'>
                        Posted On : {moment(blogData?.created_at).format('MMMM DD, YYYY')} / In :{' '}
                        <a className='blog__post--meta__link' href='blog-details.html'>
                          {blogData?.tags.split(',').join(', ')}
                        </a>
                      </p>
                    </div>
                    <div className='blog__thumbnail mb-30'>
                      <img
                        className='blog__thumbnail--img border-radius-10'
                        src={
                          blogData && blogData.blog_image
                            ? blogData.blog_image
                            : blogData?.blog_thumb_image
                        }
                        alt='blog-img'
                      />
                    </div>
                    <div
                      className='blog__details--content'
                      dangerouslySetInnerHTML={{ __html: blogData?.description }}
                    />
                  </div>
                  <div className='blog__tags--social__media d-flex align-items-center justify-content-between'>
                    {/* <div className='blog__tags--media d-flex align-items-center'>
                      <label className='blog__tags--media__title'>Releted Tags :</label>
                      <ul className='d-flex'>
                        <li className='blog__tags--media__list'>
                          <a className='blog__tags--media__link' href='blog-details.html'>
                            Popular
                          </a>
                        </li>
                        <li className='blog__tags--media__list'>
                          <a className='blog__tags--media__link' href='blog-details.html'>
                            Business
                          </a>
                        </li>
                        <li className='blog__tags--media__list'>
                          <a className='blog__tags--media__link' href='blog-details.html'>
                            desgin
                          </a>
                        </li>
                        <li className='blog__tags--media__list'>
                          <a className='blog__tags--media__link' href='blog-details.html'>
                            Service
                          </a>
                        </li>
                      </ul>
                    </div> */}
                    <div className='blog__social--media d-flex align-items-center'>
                      <label className='blog__social--media__title'>Social Share :</label>
                      <ul className='d-flex'>
                        <li className='blog__social--media__list'>
                          <FacebookShareButton
                            url={window.location.href}
                            className='blog__social--media__link'
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                        </li>
                        <li className='blog__social--media__list'>
                          <TwitterShareButton
                            title={blogData?.title || ''}
                            url={window.location.href}
                            className='blog__social--media__link'
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                        </li>
                        <li className='blog__social--media__list'>
                            <a
                              className='quickview__social--icon'
                              target='_blank'
                              rel='noreferrer'
                              href={`https://www.instagram.com/?url=${window.location.href}`}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16.497'
                                height='16.492'
                                viewBox='0 0 19.497 19.492'
                              >
                                <path
                                  data-name='Icon awesome-instagram'
                                  d='M9.747,6.24a5,5,0,1,0,5,5A4.99,4.99,0,0,0,9.747,6.24Zm0,8.247A3.249,3.249,0,1,1,13,11.238a3.255,3.255,0,0,1-3.249,3.249Zm6.368-8.451A1.166,1.166,0,1,1,14.949,4.87,1.163,1.163,0,0,1,16.115,6.036Zm3.31,1.183A5.769,5.769,0,0,0,17.85,3.135,5.807,5.807,0,0,0,13.766,1.56c-1.609-.091-6.433-.091-8.042,0A5.8,5.8,0,0,0,1.64,3.13,5.788,5.788,0,0,0,.065,7.215c-.091,1.609-.091,6.433,0,8.042A5.769,5.769,0,0,0,1.64,19.341a5.814,5.814,0,0,0,4.084,1.575c1.609.091,6.433.091,8.042,0a5.769,5.769,0,0,0,4.084-1.575,5.807,5.807,0,0,0,1.575-4.084c.091-1.609.091-6.429,0-8.038Zm-2.079,9.765a3.289,3.289,0,0,1-1.853,1.853c-1.283.509-4.328.391-5.746.391S5.28,19.341,4,18.837a3.289,3.289,0,0,1-1.853-1.853c-.509-1.283-.391-4.328-.391-5.746s-.113-4.467.391-5.746A3.289,3.289,0,0,1,4,3.639c1.283-.509,4.328-.391,5.746-.391s4.467-.113,5.746.391a3.289,3.289,0,0,1,1.853,1.853c.509,1.283.391,4.328.391,5.746S17.855,15.705,17.346,16.984Z'
                                  transform='translate(0.004 -1.492)'
                                  fill='currentColor'
                                />
                              </svg>
                              <span className='visually-hidden'>Instagram</span>
                            </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className='related__post--area'>
                    <div className='section__heading text-center mb-30'>
                      <h2 className='section__heading--maintitle'>Related Articles</h2>
                    </div>
                    <div className='row row-cols-md-2 row-cols-sm-2 row-cols-sm-u-2 row-cols-1 mb--n28'>
                      <div className='col mb-28'>
                        <div className='related__post--items'>
                          <div className='related__post--thumb border-radius-10 mb-15'>
                            <a className='display-block' href='blog-details.html'>
                              <img
                                className='related__post--img display-block border-radius-10'
                                src='assets/images/blog/related-post1.png'
                                alt='related-post'
                              />
                            </a>
                          </div>
                          <div className='related__post--text'>
                            <h3 className='related__post--title mb-5'>
                              <a className='related__post--title__link' href='blog-details.html'>
                                Post With Gallery
                              </a>
                            </h3>
                            <span className='related__post--deta'>February 03, 2022</span>
                          </div>
                        </div>
                      </div>
                      <div className='col mb-28'>
                        <div className='related__post--items'>
                          <div className='related__post--thumb border-radius-10 mb-15'>
                            <a className='display-block' href='blog-details.html'>
                              <img
                                className='related__post--img display-block border-radius-10'
                                src='assets/images/blog/related-post2.png'
                                alt='related-post'
                              />
                            </a>
                          </div>
                          <div className='related__post--text'>
                            <h3 className='related__post--title mb-5'>
                              <a className='related__post--title__link' href='blog-details.html'>
                                Post With Vedio
                              </a>
                            </h3>
                            <span className='related__post--deta'>February 03, 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='comment__box'>
                    <div className='reviews__comment--area2 mb-50'>
                      <h2 className='reviews__comment--reply__title mb-25'>Recent Comment</h2>
                      <div className='reviews__comment--inner'>
                        <div className='reviews__comment--list d-flex'>
                          <div className='reviews__comment--thumb'>
                            <img
                              className='display-block'
                              src='assets/images/other/comment-thumb1.png'
                              alt='comment-thumb'
                            />
                          </div>
                          <div className='reviews__comment--content '>
                            <div className='comment__content--topbar d-flex justify-content-between'>
                              <div className='comment__content--topbar__left'>
                                <h4 className='reviews__comment--content__title2'>Jakes on</h4>
                                <span className='reviews__comment--content__date2'>
                                  February 18, 2022
                                </span>
                              </div>
                              <button className='comment__reply--btn primary__btn' type='submit'>
                                Reply
                              </button>
                            </div>
                            <p className='reviews__comment--content__desc'>
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ex
                              repellat officiis neque. Veniam, rem nesciunt. Assumenda distinctio,
                              autem error repellat eveniet ratione dolor facilis accusantium amet
                              pariatur, non eius!
                            </p>
                          </div>
                        </div>
                        <div className='reviews__comment--list margin__left d-flex'>
                          <div className='reviews__comment--thumb'>
                            <img
                              className='display-block'
                              src='assets/images/other/comment-thumb2.png'
                              alt='comment-thumb'
                            />
                          </div>
                          <div className='reviews__comment--content'>
                            <div className='comment__content--topbar d-flex justify-content-between'>
                              <div className='comment__content--topbar__left'>
                                <h4 className='reviews__comment--content__title2'>John Deo</h4>
                                <span className='reviews__comment--content__date2'>
                                  February 18, 2022
                                </span>
                              </div>
                              <button className='comment__reply--btn primary__btn' type='submit'>
                                Reply
                              </button>
                            </div>
                            <p className='reviews__comment--content__desc'>
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ex
                              repellat officiis neque. Veniam, rem nesciunt. Assumenda distinctio,
                              autem error repellat eveniet ratione dolor facilis accusantium amet
                              pariatur, non eius!
                            </p>
                          </div>
                        </div>
                        <div className='reviews__comment--list d-flex'>
                          <div className='reviews__comment--thumb'>
                            <img
                              className='display-block'
                              src='assets/images/other/comment-thumb3.png'
                              alt='comment-thumb'
                            />
                          </div>
                          <div className='reviews__comment--content'>
                            <div className='comment__content--topbar d-flex justify-content-between'>
                              <div className='comment__content--topbar__left'>
                                <h4 className='reviews__comment--content__title2'>Laura Johnson</h4>
                                <span className='reviews__comment--content__date2'>
                                  February 18, 2022
                                </span>
                              </div>
                              <button className='comment__reply--btn primary__btn' type='submit'>
                                Reply
                              </button>
                            </div>
                            <p className='reviews__comment--content__desc'>
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ex
                              repellat officiis neque. Veniam, rem nesciunt. Assumenda distinctio,
                              autem error repellat eveniet ratione dolor facilis accusantium amet
                              pariatur, non eius!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='reviews__comment--reply__area'>
                      <form action='#'>
                        <h2 className='reviews__comment--reply__title mb-20'>Leave A Comment</h2>
                        <div className='row'>
                          <div className='col-lg-4 col-md-6 mb-20'>
                            <label>
                              <input
                                className='reviews__comment--reply__input'
                                placeholder='Your Name....'
                                type='text'
                              />
                            </label>
                          </div>
                          <div className='col-lg-4 col-md-6 mb-20'>
                            <label>
                              <input
                                className='reviews__comment--reply__input'
                                placeholder='Your Email....'
                                type='email'
                              />
                            </label>
                          </div>
                          <div className='col-lg-4 col-md-6 mb-20'>
                            <label>
                              <input
                                className='reviews__comment--reply__input'
                                placeholder='Your Website....'
                                type='text'
                              />
                            </label>
                          </div>
                          <div className='col-12 mb-15'>
                            <textarea
                              className='reviews__comment--reply__textarea'
                              placeholder='Your Comments....'
                              defaultValue={''}
                            />
                          </div>
                        </div>
                        <button
                          className='reviews__comment--btn primary__btn text-white'
                          data-hover='Submit'
                          type='submit'
                        >
                          SUBMIT
                        </button>
                      </form>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className='col-xxl-3 col-xl-4 col-lg-4'>
                <div className='blog__sidebar--widget left widget__area'>
                  <div className='single__widget widget__search widget__bg'>
                    <h2 className='widget__title h3'>Search</h2>
                    <form className='widget__search--form' action='#'>
                      <label>
                        <input
                          className='widget__search--form__input'
                          placeholder='Search...'
                          type='text'
                        />
                      </label>
                      <button
                        className='widget__search--form__btn'
                        aria-label='search button'
                        type='button'
                      >
                        <svg
                          className='product__items--action__btn--svg'
                          xmlns='http://www.w3.org/2000/svg'
                          width='22.51'
                          height='20.443'
                          viewBox='0 0 512 512'
                        >
                          <path
                            d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
                            fill='none'
                            stroke='currentColor'
                            strokeMiterlimit={10}
                            strokeWidth={32}
                          />
                          <path
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeMiterlimit={10}
                            strokeWidth={32}
                            d='M338.29 338.29L448 448'
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                  <CategoryFilter categories={categories} />
                  {/* <div className='single__widget widget__bg'>
                    <h2 className='widget__title h3'>Post Article</h2>
                    <div className='product__grid--inner'>
                      <div className='product__items product__items--grid d-flex align-items-center'>
                        <div className='product__items--grid__thumbnail position__relative'>
                          <a className='product__items--link' href='blog-details.html'>
                            <img
                              className='product__grid--items__img product__primary--img'
                              src='assets/images/product/small-product2.png'
                              alt='product-img'
                            />
                            <img
                              className='product__grid--items__img product__secondary--img'
                              src='assets/images/product/small-product3.png'
                              alt='product-img'
                            />
                          </a>
                        </div>
                        <div className='product__items--grid__content'>
                          <h3 className='product__items--content__title h4'>
                            <a href='blog-details.html'>Women Fish Cut</a>
                          </h3>
                          <span className='meta__deta'>February 03, 2022</span>
                        </div>
                      </div>
                      <div className='product__items product__items--grid d-flex align-items-center'>
                        <div className='product__items--grid__thumbnail position__relative'>
                          <a className='product__items--link' href='blog-details.html'>
                            <img
                              className='product__grid--items__img product__primary--img'
                              src='assets/images/product/small-product1.png'
                              alt='product-img'
                            />
                            <img
                              className='product__grid--items__img product__secondary--img'
                              src='assets/images/product/small-product2.png'
                              alt='product-img'
                            />
                          </a>
                        </div>
                        <div className='product__items--grid__content'>
                          <h3 className='product__items--content__title h4'>
                            <a href='blog-details.html'>Gorgeous Granite is</a>
                          </h3>
                          <span className='meta__deta'>February 03, 2022</span>
                        </div>
                      </div>
                      <div className='product__items product__items--grid d-flex align-items-center'>
                        <div className='product__items--grid__thumbnail position__relative'>
                          <a className='product__items--link' href='blog-details.html'>
                            <img
                              className='product__grid--items__img product__primary--img'
                              src='assets/images/product/small-product5.png'
                              alt='product-img'
                            />
                            <img
                              className='product__grid--items__img product__secondary--img'
                              src='assets/images/product/small-product4.png'
                              alt='product-img'
                            />
                          </a>
                        </div>
                        <div className='product__items--grid__content'>
                          <h3 className='product__items--content__title h4'>
                            <a href='blog-details.html'>Durable A Steel</a>
                          </h3>
                          <span className='meta__deta'>February 03, 2022</span>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End blog details section */}
      </main>
    </Layout>
  );
};

export default BlogDetails;
