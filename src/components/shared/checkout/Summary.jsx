import React from 'react';
import { Link } from 'react-router-dom';
import GetCurrency from '../currency/GetCurrency';

const Summary = ({
  cartProducts,
  total,
  subTotal,
  forMobile = false,
  step = 1,
  isOrder = false,
  userData,
}) => {
  return (
    <>
      {forMobile ? (
        <header className='main__header checkout__mian--header mb-30'>
          <details className='order__summary--mobile__version'>
            <summary className='order__summary--toggle border-radius-5'>
              <span className='order__summary--toggle__inner'>
                <span className='order__summary--toggle__icon'>
                  <svg width={20} height={19} xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z'
                      fill='currentColor'
                    />
                  </svg>
                </span>
                <span className='order__summary--toggle__text show'>
                  <span>Show order summary</span>
                  <svg
                    width={11}
                    height={6}
                    xmlns='http://www.w3.org/2000/svg'
                    className='order-summary-toggle__dropdown'
                    fill='currentColor'
                  >
                    <path d='M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z' />
                  </svg>
                </span>
                <span className='order__summary--final__price'>
                  {isOrder ? (
                    `${userData?.currency_symbol || ''}${total}`
                  ) : (
                    <GetCurrency price={total} />
                  )}
                </span>
              </span>
            </summary>
            <div className='order__summary--section'>
              <div className='cart__table checkout__product--table'>
                <table className='summary__table'>
                  <tbody className='summary__table--body'>
                    {cartProducts?.length > 0 &&
                      cartProducts.map((product, index) => (
                        <tr className=' summary__table--items' key={index}>
                          <td className=' summary__table--list'>
                            <div className='product__image two  d-flex align-items-center'>
                              <div className='product__thumbnail border-radius-5'>
                                <Link to={`/product?id=${product?.id}`}>
                                  <img
                                    className='border-radius-5'
                                    src={product?.image}
                                    alt='cart-product'
                                  />
                                </Link>
                                <span className='product__thumbnail--quantity'>
                                  {product?.numberOfItems}
                                </span>
                              </div>
                              <div className='product__description'>
                                <h3 className='product__description--name h4'>
                                  <Link to={`/product?id=${product?.id}`}>
                                    {product?.name}
                                    <div>
                                      {product?.hasCombination?.product_variations_values?.length >
                                        0 &&
                                        product.hasCombination.product_variations_values.map(
                                          (
                                            { attribute, attribute_value: { attribute_value } },
                                            index,
                                          ) => (
                                            <div key={index}>
                                              <div>
                                                {attribute.name}: {attribute_value}
                                              </div>
                                            </div>
                                          ),
                                        )}
                                    </div>
                                  </Link>
                                </h3>
                                <span className='product__description--variant'>COLOR: Blue</span>
                              </div>
                            </div>
                          </td>
                          <td className=' summary__table--list'>
                            <span className='cart__price'>
                              {isOrder ? (
                                `${userData?.currency_symbol || ''}${product?.price || ''}`
                              ) : (
                                <GetCurrency price={product?.price} />
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {step === 1 && (
                <div className='checkout__discount--code'>
                  <form className='d-flex' action='#'>
                    <label>
                      <input
                        className='checkout__discount--code__input--field border-radius-5'
                        placeholder='Gift card or discount code'
                        type='text'
                      />
                    </label>
                    <button
                      className='checkout__discount--code__btn primary__btn border-radius-5'
                      type='submit'
                    >
                      Apply
                    </button>
                  </form>
                </div>
              )}
              <div className='checkout__total'>
                <table className='checkout__total--table'>
                  <tbody className='checkout__total--body'>
                    <tr className='checkout__total--items'>
                      <td className='checkout__total--title text-left'>Subtotal </td>
                      <td className='checkout__total--amount text-right'>
                        {isOrder ? (
                          `${userData?.currency_symbol || ''}${total}`
                        ) : (
                          <GetCurrency price={subTotal || total} />
                        )}
                      </td>
                    </tr>
                    <tr className='checkout__total--items'>
                      <td className='checkout__total--title text-left'>Shipping</td>
                      <td className='checkout__total--calculated__text text-right'>
                        {step === 1
                          ? 'Calculated at next step'
                          : `${userData?.currency_symbol || ''}0`}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className='checkout__total--footer'>
                    <tr className='checkout__total--footer__items'>
                      <td className='checkout__total--footer__title checkout__total--footer__list text-left'>
                        Total{' '}
                      </td>
                      <td className='checkout__total--footer__amount checkout__total--footer__list text-right'>
                        {isOrder ? (
                          `${userData?.currency_symbol || ''}${total}`
                        ) : (
                          <GetCurrency price={total} />
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </details>
        </header>
      ) : (
        <aside className='checkout__sidebar sidebar'>
          <div className='cart__table checkout__product--table'>
            <table className='cart__table--inner'>
              <tbody className='cart__table--body'>
                {cartProducts?.length > 0 &&
                  cartProducts.map((product, index) => {
                    return (
                      <tr className='cart__table--body__items' key={index}>
                        <td className='cart__table--body__list'>
                          <div className='product__image two d-flex align-items-center'>
                            <div className='product__thumbnail border-radius-5'>
                              <Link to={`/product?id=${product?.id}`}>
                                <img
                                  className='border-radius-5'
                                  src={product?.image}
                                  alt='cart-product'
                                />
                              </Link>
                              <span className='product__thumbnail--quantity'>
                                {product?.numberOfItems}
                              </span>
                            </div>
                            <div className='product__description'>
                              <h3 className='product__description--name h4'>
                                <Link to={`/product?id=${product?.id}`}>
                                  {product?.name}
                                  <div>
                                    {product?.hasCombination?.product_variations_values?.length >
                                      0 &&
                                      product.hasCombination.product_variations_values.map(
                                        (
                                          { attribute, attribute_value: { attribute_value } },
                                          index,
                                        ) => (
                                          <div key={index}>
                                            <div>
                                              {attribute.name}: {attribute_value}
                                            </div>
                                          </div>
                                        ),
                                      )}
                                  </div>
                                </Link>
                              </h3>
                            </div>
                          </div>
                        </td>
                        <td className='cart__table--body__list'>
                          <span className='cart__price'>
                            {isOrder ? (
                              `${userData?.currency_symbol || ''}${product?.price || ''}`
                            ) : (
                              <GetCurrency price={product?.price} />
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {step === 1 && (
            <div className='checkout__discount--code'>
              <form className='d-flex' action='#'>
                <label>
                  <input
                    className='checkout__discount--code__input--field border-radius-5'
                    placeholder='Gift card or discount code'
                    type='text'
                  />
                </label>
                <button
                  className='checkout__discount--code__btn primary__btn border-radius-5'
                  type='submit'
                >
                  Apply
                </button>
              </form>
            </div>
          )}

          <div className='checkout__total'>
            <table className='checkout__total--table'>
              <tbody className='checkout__total--body'>
                <tr className='checkout__total--items'>
                  <td className='checkout__total--title text-left'>Subtotal</td>
                  <td className='checkout__total--amount text-right'>
                    {isOrder ? (
                      `${userData?.currency_symbol || ''}${total}`
                    ) : (
                      <GetCurrency price={subTotal || total} />
                    )}
                  </td>
                </tr>
                <tr className='checkout__total--items'>
                  <td className='checkout__total--title text-left'>Shipping</td>
                  <td className='checkout__total--calculated__text text-right'>
                    {step === 1 ? 'Calculated at next step' : `${userData?.currency_symbol || ''}0`}
                  </td>
                </tr>
              </tbody>
              <tfoot className='checkout__total--footer'>
                <tr className='checkout__total--footer__items'>
                  <td className='checkout__total--footer__title checkout__total--footer__list text-left'>
                    Total
                  </td>
                  <td className='checkout__total--footer__amount checkout__total--footer__list text-right'>
                    {isOrder ? (
                      `${userData?.currency_symbol || ''}${total}`
                    ) : (
                      <GetCurrency price={total} />
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </aside>
      )}
    </>
  );
};

export default Summary;
