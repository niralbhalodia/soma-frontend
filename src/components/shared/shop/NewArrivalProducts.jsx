import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { postData } from '../../../utils/apiCall';
import GetCurrency from '../currency/GetCurrency';

const NewArrivalProducts = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  const readReviewStar = {
    size: 20,
    edit: false,
    isHalf: true,
  };

  useEffect(() => {
    async function fetchMyAPINewArrivals() {
      const res = await postData('/products/topRated');
      setNewArrivals(res.data);
    }

    fetchMyAPINewArrivals();
  }, []);
  return (
    <>
      <div className='single__widget widget__bg'>
        <h2 className='widget__title h3'>Top Rated Product</h2>
        <div className='product__grid--inner'>
          {newArrivals?.length > 0 &&
            newArrivals.slice(0, 3).map((product, index) => (
              <div
                className='product__items product__items--grid d-flex align-items-center'
                key={index}
              >
                <div className='product__items--grid__thumbnail position__relative'>
                  <a className='product__items--link' href={`/product?id=${product?.id}`}>
                    <img
                      className='shop_product__items--img product__primary--img'
                      src={product?.image}
                      alt='product-img'
                    />
                  </a>
                </div>
                <div className='product__items--grid__content'>
                  <h3 className='product__items--content__title h4'>
                    <a href={`/product?id=${product?.id}`}>
                      {product?.name?.length > 30
                        ? product?.name.slice(0, 25) + '...'
                        : product?.name}
                    </a>
                  </h3>
                  <div className='product__items--price'>
                    <span className='current__price'>
                      <GetCurrency price={product?.price} />
                    </span>
                    {product?.old_price > 0 && product?.price!=product?.old_price && (
                      <>
                        <span className='price__divided' />
                        <span className='old__price'>
                          <GetCurrency price={product.old_price} />
                        </span>
                      </>
                    )}
                  </div>
                  <ReactStars {...readReviewStar} value={product?.avgRating || 0} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default NewArrivalProducts;
