import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../../../redux/action/cart';
import { removeFromWishList } from '../../../redux/action/wishlist';
import GetCurrency from '../currency/GetCurrency';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishListItems = useSelector((state) => state.wishList);
  useEffect(() => {
    if (wishListItems && !wishListItems.length > 0) {
      toast.error('No items in wishlist');
      navigate('/shop');
    }
  }, [wishListItems]);
  return (
    <div className='account__content'>
      <h3 className='account__content--title mb-20'>Wishlist</h3>
      <div className='cart__table'>
        <table className='cart__table--inner'>
          <thead className='cart__table--header'>
            <tr className='cart__table--header__items'>
              <th className='cart__table--header__list'>Product</th>
              <th className='cart__table--header__list'>Price</th>
              <th className='cart__table--header__list text-center'>STOCK STATUS</th>
              <th className='cart__table--header__list text-right'>ADD TO CART</th>
            </tr>
          </thead>
          <tbody className='cart__table--body'>
            {wishListItems?.length > 0 &&
              wishListItems.map((product) => {
                return (
                  <tr className='cart__table--body__items'>
                    <td className='cart__table--body__list'>
                      <div className='cart__product d-flex align-items-center'>
                        <button
                          className='cart__remove--btn'
                          aria-label='search button'
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeFromWishList(product?.id));
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
                              width={50}
                              className='border-radius-5'
                              src={product?.image}
                              alt='cart-product'
                            />
                          </Link>
                        </div>
                        <div className='cart__content'>
                          <h4 className='cart__content--title'>
                            <Link to={`/product?id=${product?.id}`}>{product?.name || ''}</Link>
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
                    <td className='cart__table--body__list text-center'>
                      <span className='in__stock text__secondary'>
                        {product?.is_in_stock === 'Yes' ? 'in stock' : 'out of stock'}
                      </span>
                    </td>
                    <td className='cart__table--body__list text-right'>
                      <a
                        className='wishlist__cart--btn primary__btn'
                        href='#'
                        onClick={(e) => {
                          e.preventDefault();
                          if (product?.is_variation_product === 'Yes') {
                            toast.remove();
                            toast('Please select variation!');
                            navigate(`/product?id=${product.id}`);
                          } else dispatch(addToCart(product));
                        }}
                      >
                        Add To Cart
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className='continue__shopping d-flex justify-content-between'>
          <Link className='continue__shopping--link' to='/shop'>
            Continue shopping
          </Link>
          <Link className='continue__shopping--clear' to='/shop'>
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
