import { Empty } from 'antd';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import NewArrivalCarousel from '../components/common/newArrivalCarousel';
import Layout from '../components/Layout';
import GetCurrency from '../components/shared/currency/GetCurrency';
import { addToCart, clearCart, decreaseCartItem, removeCartItem } from '../redux/action/cart';
import { totalPrice } from '../utils/cart';

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const [total, setTotal] = useState(totalPrice(cartProducts) || 0);
  const [note, setNote] = useState('');
  useEffect(() => {
    setTotal(totalPrice(cartProducts) || 0);
  }, [cartProducts]);
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
                  <span className='text-red'>Shopping Cart</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* cart section start */}
        <section className='cart__section section--padding'>
          <div className='container-fluid'>
            <div className='cart__section--inner'>
              <form action='#'>
                <h2 className='cart__title mb-40'>Shopping Cart</h2>
                <div className='row'>
                  <div className='col-lg-8'>
                    <div className='cart__table'>
                      <table className='cart__table--inner'>
                        <thead className='cart__table--header'>
                          <tr className='cart__table--header__items'>
                            <th className='cart__table--header__list'>Product</th>
                            <th className='cart__table--header__list'>Price</th>
                            <th className='cart__table--header__list'>Quantity</th>
                            <th className='cart__table--header__list'>Total</th>
                          </tr>
                        </thead>
                        <tbody className='cart__table--body'>
                          {cartProducts?.length > 0 ? (
                            cartProducts.map((product) => {
                              return (
                                <tr className='cart__table--body__items' key={product?.id}>
                                  <td className='cart__table--body__list'>
                                    <div className='cart__product d-flex align-items-center'>
                                      <button
                                        className='cart__remove--btn'
                                        aria-label='search button'
                                        type='button'
                                        onClick={(e) => {
                                          e.preventDefault();
                                          dispatch(removeCartItem(product?.id));
                                        }}
                                      >
                                        <svg
                                          fill='currentColor'
                                          xmlns='http://www.w3.org/2000/svg'
                                          viewBox='0 0 24 24'
                                          width='16px'
                                          height='16px'
                                        >
                                          <path d='M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z' />
                                        </svg>
                                      </button>
                                      <div className='cart__thumbnail'>
                                        <Link to={`/product?id=${product?.id}`}>
                                          <img
                                            className='border-radius-5'
                                            src={product?.image}
                                            alt='cart-product'
                                          />
                                        </Link>
                                      </div>
                                      <div className='cart__content'>
                                        <h4 className='cart__content--title'>
                                          <Link to={`/product?id=${product?.id}`}>
                                            {product?.name || ''}
                                            <div>
                                              {product?.hasCombination?.product_variations_values
                                                ?.length > 0 &&
                                                product.hasCombination.product_variations_values.map(
                                                  (
                                                    {
                                                      attribute,
                                                      attribute_value: { attribute_value },
                                                    },
                                                    id,
                                                  ) => (
                                                    <div key={id}>
                                                      <div>
                                                        {attribute.name}: {attribute_value}
                                                      </div>
                                                    </div>
                                                  ),
                                                )}
                                            </div>
                                          </Link>
                                        </h4>
                                        {/* <span className='cart__content--variant'>COLOR: Blue</span>
                                        <span className='cart__content--variant'>WEIGHT: 2 Kg</span> */}
                                      </div>
                                    </div>
                                  </td>
                                  <td className='cart__table--body__list'>
                                    <span className='cart__price'>
                                      <GetCurrency price={product?.price} />
                                    </span>
                                  </td>
                                  <td className='cart__table--body__list'>
                                    <div className='quantity__box'>
                                      <button
                                        type='button'
                                        className={cx(
                                          'quantity__value quickview__value--quantity decrease',
                                          {
                                            disabled: product?.numberOfItems === 1,
                                          },
                                        )}
                                        aria-label='quantity value'
                                        value='Decrease Value'
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (product?.numberOfItems > 1)
                                            dispatch(decreaseCartItem(product, 1));
                                        }}
                                      >
                                        -
                                      </button>
                                      <label>
                                        <input
                                          type='number'
                                          className='quantity__number quickview__value--number'
                                          value={product?.numberOfItems}
                                          readOnly
                                          data-counter
                                        />
                                      </label>
                                      <button
                                        type='button'
                                        className='quantity__value quickview__value--quantity increase'
                                        aria-label='quantity value'
                                        value='Increase Value'
                                        onClick={(e) => {
                                          e.preventDefault();
                                          dispatch(addToCart(product, 1));
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className='cart__table--body__list'>
                                    <span className='cart__price end'>₹{product?.cartPrice}</span>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={4}>
                                <center>
                                  <Empty description='' className='mt-50' />
                                  <h3>Your cart is empty</h3>
                                </center>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <div className='continue__shopping d-flex justify-content-between'>
                        <Link className='continue__shopping--link' to='/shop'>
                          Continue shopping
                        </Link>
                        {cartProducts && cartProducts.length > 0 && (
                          <button
                            className='continue__shopping--clear'
                            type='button'
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(clearCart());
                            }}
                          >
                            Clear Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='cart__summary border-radius-10'>
                      <div>
                        {/* <div className='coupon__code mb-30'>
                          <h3 className='coupon__code--title'>Coupon</h3>
                          <p className='coupon__code--desc'>
                            Enter your coupon code if you have one.
                          </p>
                          <div className='coupon__code--field d-flex'>
                            <label>
                              <input
                                className='coupon__code--field__input border-radius-5'
                                placeholder='Coupon code'
                                type='text'
                              />
                            </label>
                            <button className='coupon__code--field__btn primary__btn' type='submit'>
                              Apply Coupon
                            </button>
                          </div>
                        </div> */}
                        <div className='cart__note mb-20'>
                          <h3 className='cart__note--title'>Note</h3>
                          <p className='cart__note--desc'>
                            Add special instructions for your seller...
                          </p>
                          <textarea
                            className='cart__note--textarea border-radius-5'
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className='cart__summary--total mb-20'>
                        <table className='cart__summary--total__table'>
                          <tbody>
                            <tr className='cart__summary--total__list'>
                              <td className='cart__summary--total__title text-left'>SUBTOTAL</td>
                              <td className='cart__summary--amount text-right'>
                                <GetCurrency price={total} />
                              </td>
                            </tr>
                            <tr className='cart__summary--total__list'>
                              <td className='cart__summary--total__title text-left'>GRAND TOTAL</td>
                              <td className='cart__summary--amount text-right'>
                                <GetCurrency price={total} />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='cart__summary--footer'>
                        <p className='cart__summary--footer__desc'>
                          Shipping &amp; taxes calculated at checkout
                        </p>
                        <ul className='d-flex justify-content-between'>
                          {/* <li>
                            <button
                              className='cart__summary--footer__btn primary__btn cart'
                              type='submit'
                            >
                              Update Cart
                            </button>
                          </li> */}
                          {cartProducts && cartProducts.length > 0 && (
                            <li>
                              <Link
                                className='cart__summary--footer__btn primary__btn checkout'
                                to='/checkout'
                                state={{ note }}
                              >
                                Check Out
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <NewArrivalCarousel showItems={5} />
        </section>
        {/* cart section end */}
      </main>
    </Layout>
  );
};

export default Cart;
