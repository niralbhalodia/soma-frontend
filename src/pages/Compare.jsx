import React from 'react';
import Layout from '../components/Layout';

const Compare = () => {
  return (
    <Layout>
      <main className='main__content_wrapper'>
        {/* Start breadcrumb section */}
        <section className='breadcrumb__section breadcrumb__bg'>
          <div className='container'>
            <div className='row row-cols-1'>
              <div className='col'>
                <div className='breadcrumb__content text-center'>
                  <h1 className='breadcrumb__content--title text-white mb-25'>
                    Compare
                  </h1>
                  <ul className='breadcrumb__content--menu d-flex justify-content-center'>
                    <li className='breadcrumb__content--menu__items'>
                      <a className='text-white' href='index.html'>
                        Home
                      </a>
                    </li>
                    <li className='breadcrumb__content--menu__items'>
                      <span className='text-white'>Compare</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start Compare section */}
        <section className='compare__section section--padding'>
          <div className='container'>
            <div className='row row-cols-1'>
              <div className='col'>
                <div className='section__heading text-center mb-40'>
                  <h2 className='section__heading--maintitle h3'>
                    COMPARE PRODUCT PAGE STYLE
                  </h2>
                </div>
                <div className='compare__section--inner table-responsive'>
                  <table className='compare__table'>
                    <thead className='compare__table--header'>
                      <tr className='compare__table--items'>
                        <td className='compare__table--items__child text-center'>
                          <button type='button' className='compare__remove'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24.105'
                              height='24.732'
                              viewBox='0 0 512 512'
                            >
                              <path
                                fill='currentColor'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={32}
                                d='M368 368L144 144M368 144L144 368'
                              />
                            </svg>
                          </button>
                          <h3 className='compare__product--title h4'>
                            Cotton Dress
                          </h3>
                          <img
                            className='compare__product--thumb'
                            src='assets/images/product/product1.png'
                            alt='compare-image'
                          />
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <button type='button' className='compare__remove'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24.105'
                              height='24.732'
                              viewBox='0 0 512 512'
                            >
                              <path
                                fill='currentColor'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={32}
                                d='M368 368L144 144M368 144L144 368'
                              />
                            </svg>
                          </button>
                          <h3 className='compare__product--title h4'>
                            Edna Dress
                          </h3>
                          <img
                            className='compare__product--thumb'
                            src='assets/images/product/product2.png'
                            alt='compare-image'
                          />
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <button type='button' className='compare__remove'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24.105'
                              height='24.732'
                              viewBox='0 0 512 512'
                            >
                              <path
                                fill='currentColor'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={32}
                                d='M368 368L144 144M368 144L144 368'
                              />
                            </svg>
                          </button>
                          <h3 className='compare__product--title h4'>
                            Edna Dress
                          </h3>
                          <img
                            className='compare__product--thumb'
                            src='assets/images/product/product3.png'
                            alt='compare-image'
                          />
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <button type='button' className='compare__remove'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24.105'
                              height='24.732'
                              viewBox='0 0 512 512'
                            >
                              <path
                                fill='currentColor'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={32}
                                d='M368 368L144 144M368 144L144 368'
                              />
                            </svg>
                          </button>
                          <h3 className='compare__product--title h4'>
                            Edna Dress
                          </h3>
                          <img
                            className='compare__product--thumb'
                            src='assets/images/product/product4.png'
                            alt='compare-image'
                          />
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <button type='button' className='compare__remove'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24.105'
                              height='24.732'
                              viewBox='0 0 512 512'
                            >
                              <path
                                fill='currentColor'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={32}
                                d='M368 368L144 144M368 144L144 368'
                              />
                            </svg>
                          </button>
                          <h3 className='compare__product--title h4'>
                            Edna Dress
                          </h3>
                          <img
                            className='compare__product--thumb'
                            src='assets/images/product/product5.png'
                            alt='compare-image'
                          />
                        </td>
                      </tr>
                    </thead>
                    <tbody className='compare__table--body'>
                      <tr className='compare__table--items'>
                        <td className='compare__table--items__child text-center'>
                          <span className='compare__product--price'>
                            $89,00
                          </span>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <span className='compare__product--price'>
                            $89,00
                          </span>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <span className='compare__product--price'>
                            $89,00
                          </span>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <span className='compare__product--price'>
                            $89,00
                          </span>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <span className='compare__product--price'>
                            $89,00
                          </span>
                        </td>
                      </tr>
                      <tr className='compare__table--items'>
                        <th className='compare__table--items__child--header'>
                          Product Description
                        </th>
                        <th className='compare__table--items__child--header'>
                          Product Description
                        </th>
                        <th className='compare__table--items__child--header'>
                          Product Description
                        </th>
                        <th className='compare__table--items__child--header'>
                          Product Description
                        </th>
                        <th className='compare__table--items__child--header'>
                          Product Description
                        </th>
                      </tr>
                      <tr className='compare__table--items'>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__description'>
                            Lorem ipsum dolor sit, amet elit. Iusto excepturi
                            fugiat vitae the are commodi nihil saepe itaque!
                            name Corporis, quaerat layout.
                          </p>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__description'>
                            Lorem ipsum dolor sit, amet elit. Iusto excepturi
                            fugiat vitae the are commodi nihil saepe itaque!
                            name Corporis, quaerat layout.
                          </p>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__description'>
                            Lorem ipsum dolor sit, amet elit. Iusto excepturi
                            fugiat vitae the are commodi nihil saepe itaque!
                            name Corporis, quaerat layout.
                          </p>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__description'>
                            Lorem ipsum dolor sit, amet elit. Iusto excepturi
                            fugiat vitae the are commodi nihil saepe itaque!
                            name Corporis, quaerat layout.
                          </p>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__description'>
                            Lorem ipsum dolor sit, amet elit. Iusto excepturi
                            fugiat vitae the are commodi nihil saepe itaque!
                            name Corporis, quaerat layout.
                          </p>
                        </td>
                      </tr>
                      <tr className='compare__table--items'>
                        <th className='compare__table--items__child--header'>
                          Availability
                        </th>
                        <th className='compare__table--items__child--header'>
                          Availability
                        </th>
                        <th className='compare__table--items__child--header'>
                          Availability
                        </th>
                        <th className='compare__table--items__child--header'>
                          Availability
                        </th>
                        <th className='compare__table--items__child--header'>
                          Availability
                        </th>
                      </tr>
                      <tr className='compare__table--items'>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__instock text__secondary'>
                            In stock
                          </p>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__instock text__secondary'>
                            In stock
                          </p>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__instock text__secondary'>
                            In stock
                          </p>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__instock text__secondary'>
                            In stock
                          </p>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <p className='compare__instock text__secondary'>
                            In stock
                          </p>
                        </td>
                      </tr>
                      <tr className='compare__table--items'>
                        <td className='compare__table--items__child text-center'>
                          <a
                            className='compare__cart--btn primary__btn'
                            href='cart.html'
                          >
                            Add to Cart
                          </a>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <a
                            className='compare__cart--btn primary__btn'
                            href='cart.html'
                          >
                            Add to Cart
                          </a>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <a
                            className='compare__cart--btn primary__btn'
                            href='cart.html'
                          >
                            Add to Cart
                          </a>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <a
                            className='compare__cart--btn primary__btn'
                            href='cart.html'
                          >
                            Add to Cart
                          </a>
                        </td>
                        <td className='compare__table--items__child text-center'>
                          <a
                            className='compare__cart--btn primary__btn'
                            href='cart.html'
                          >
                            Add to Cart
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Compare section */}
        {/* Start shipping section */}
        <section className='shipping__section2 shipping__style3 section--padding pt-0'>
          <div className='container'>
            <div className='shipping__section2--inner shipping__style3--inner d-flex justify-content-between'>
              <div className='shipping__items2 d-flex align-items-center'>
                <div className='shipping__items2--icon'>
                  <img src='assets/images/other/shipping1.png' alt />
                </div>
                <div className='shipping__items2--content'>
                  <h2 className='shipping__items2--content__title h3'>
                    Shipping
                  </h2>
                  <p className='shipping__items2--content__desc'>
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className='shipping__items2 d-flex align-items-center'>
                <div className='shipping__items2--icon'>
                  <img src='assets/images/other/shipping2.png' alt />
                </div>
                <div className='shipping__items2--content'>
                  <h2 className='shipping__items2--content__title h3'>
                    Payment
                  </h2>
                  <p className='shipping__items2--content__desc'>
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className='shipping__items2 d-flex align-items-center'>
                <div className='shipping__items2--icon'>
                  <img src='assets/images/other/shipping3.png' alt />
                </div>
                <div className='shipping__items2--content'>
                  <h2 className='shipping__items2--content__title h3'>
                    Return
                  </h2>
                  <p className='shipping__items2--content__desc'>
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className='shipping__items2 d-flex align-items-center'>
                <div className='shipping__items2--icon'>
                  <img src='assets/images/other/shipping4.png' alt />
                </div>
                <div className='shipping__items2--content'>
                  <h2 className='shipping__items2--content__title h3'>
                    Support
                  </h2>
                  <p className='shipping__items2--content__desc'>
                    From handpicked sellers
                  </p>
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

export default Compare;
