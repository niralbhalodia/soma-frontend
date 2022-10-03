import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  closeCartCanvas,
  decreaseCartItem,
  openCartCanvas,
  removeCartItem,
} from '../../../redux/action/cart';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { totalPrice } from '../../../utils/cart';
import { Empty } from 'antd';
import GetCurrency from '../currency/GetCurrency';

const MiniCart = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.isCanvasOpen);
  const cartProducts = useSelector((state) => state.cart.products);
  const [total, setTotal] = useState(totalPrice(cartProducts) || 0);
  useEffect(() => {
    if (cartProducts.length > 0) {
      setTotal(totalPrice(cartProducts) || 0);
    } else setTotal(0);
  }, [cartProducts]);
  const setShowCart = (data) => {
    if (data && cartProducts?.length > 0) {
      dispatch(openCartCanvas());
    } else {
      dispatch(closeCartCanvas());
    }
  };
  return (
    <>
      {/* Start offCanvas minicart */}
      <div className={cx('offCanvas__minicart', { active: showCart })}>
        <div className='minicart__header' onClick={(e) => e.stopPropagation()}>
          <div className='minicart__header--top d-flex justify-content-between align-items-center'>
            <h2 className='minicart__title h3'> Shopping Cart</h2>
            <button
              className='minicart__close--btn'
              aria-label='minicart close button'
              onClick={() => setShowCart(false)}
            >
              <svg
                className='minicart__close--icon'
                xmlns='http://www.w3.org/2000/svg'
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
          </div>
          {/* <p className='minicart__header--desc'>Clothing and fashion products are limited</p> */}
        </div>
        <div className='minicart__product' onClick={(e) => e.stopPropagation()}>
          {cartProducts?.length > 0 ? (
            cartProducts.map((product) => {
              return (
                <div className='minicart__product--items d-flex' key={product?.id}>
                  <div className='minicart__thumb' onClick={() => setShowCart(false)}>
                    <Link to={`/product?id=${product?.id}`}>
                      <img src={product?.image} alt='prduct-img' />
                    </Link>
                  </div>
                  <div className='minicart__text'>
                    <h3 className='minicart__subtitle h4' onClick={() => setShowCart(false)}>
                      <Link to={`/product?id=${product?.id}`}>
                        {product?.name.length < 30
                          ? product.name
                          : `${product.name.slice(0, 30)}...` || ''}
                        <div>
                          {product?.hasCombination?.product_variations_values?.length > 0 &&
                            product.hasCombination.product_variations_values.map(
                              ({ attribute, attribute_value: { attribute_value } }, id) => (
                                <div key={id}>
                                  <div>
                                    {attribute.name}: {attribute_value}
                                  </div>
                                </div>
                              ),
                            )}
                        </div>
                      </Link>
                    </h3>
                    {/* <span className='color__variant'>
                      <b>Color:</b> Beige
                    </span> */}
                    <div className='minicart__price'>
                      {product?.is_variation_product === 'No' && (
                        <>
                        <span className='current__price'>
                          <GetCurrency price={product.price} />
                        </span>
                        {product?.old_price && product?.price!=product?.old_price && (
                          <>
                            <span className='price__divided' />
                            <span className='old__price'>
                              <GetCurrency price={product.old_price} />
                            </span>
                          </>
                        )}
                        </>
                      )}
                      
                      {product?.is_variation_product === 'Yes' && (
                        <>
                        <span className='current__price'>
                          <GetCurrency price={product?.hasCombination?.discount_price || product?.hasCombination?.price || product.price} />
                        </span>
                        {product?.product_variations_combinations && product?.hasCombination?.discount_price > 0 && product?.hasCombination?.price!=product?.hasCombination?.discount_price && (
                          <>
                            <span className='price__divided' />
                            <span className='old__price'>
                              <GetCurrency price={product?.hasCombination?.price} />
                            </span>
                          </>
                        )}
                        </>
                      )}
                    </div>
                    <div className='minicart__text--footer d-flex align-items-center'>
                      <div className='quantity__box minicart__quantity'>
                        <button
                          type='button'
                          className={cx('quantity__value decrease', {
                            disabled: product?.numberOfItems === 1,
                          })}
                          aria-label='quantity value'
                          value='Decrease Value'
                          onClick={(e) => {
                            e.preventDefault();
                            if (product?.numberOfItems > 1) dispatch(decreaseCartItem(product, 1));
                          }}
                        >
                          -
                        </button>
                        <label>
                          <input
                            type='number'
                            className='quantity__number'
                            value={product?.numberOfItems}
                            readOnly
                            data-counter
                          />
                        </label>
                        <button
                          type='button'
                          className='quantity__value increase'
                          value='Increase Value'
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(addToCart(product, 1));
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className='minicart__product--remove'
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(product?.hasCombination);
                          dispatch(removeCartItem(product?.id, product?.hasCombination?.id));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <Empty description='Your cart is empty' className='mt-50' />
            </>
          )}
        </div>
        <div className='minicart__amount' onClick={(e) => e.stopPropagation()}>
          <div className='minicart__amount_list d-flex justify-content-between'>
            <span>Sub Total:</span>
            <span>
              <b>
                <GetCurrency price={total} />
              </b>
            </span>
          </div>
          <div className='minicart__amount_list d-flex justify-content-between'>
            <span>Total:</span>
            <span>
              <b>
                <GetCurrency price={total} />
              </b>
            </span>
          </div>
        </div>
        {/* <div className='minicart__conditions text-center'>
          <input className='minicart__conditions--input' id='accept' type='checkbox' />
          <label className='minicart__conditions--label' htmlFor='accept'>
            I agree with the{' '}
            <Link className='minicart__conditions--link' to='/privacy-policy'>
              Privacy and Policy
            </Link>
          </label>
        </div> */}
        <div className='minicart__button d-flex justify-content-center'>
          <Link className='primary__btn minicart__button--link' to='/cart'>
            View cart
          </Link>
          {cartProducts?.length > 0 && (
            <Link className='primary__btn minicart__button--link' to='/checkout'>
              Checkout
            </Link>
          )}
        </div>
      </div>
      {/* End offCanvas minicart */}
    </>
  );
};

export default MiniCart;
