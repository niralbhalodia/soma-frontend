import React from 'react';
import { Link } from 'react-router-dom';

const ShopByCategories = ({ categories }) => {
  return (
    <>
      <section className='banner__section banner__style2 section--padding color-scheme-2'>
        <div className='section__heading text-center mb-35'>
          <h2 className='section__heading--maintitle style2'>Shop by Categories</h2>
        </div>
        <div className='container-fluid'>
          <div className='row mb--n28'>
            <div className='col-lg-4 col-md-order mb-28'>
              <Link to={`/shop?catId=${categories[0]?.id}`}>
                <div className='banner__items position__relative'>
                  <div className='banner__items--thumbnail'>
                    <img
                      className='banner__items--thumbnail__img'
                      src={categories[0]?.image}
                      alt='banner-img'
                    />
                  </div>
                  <div className='banner__items--content banner_items_title_bkg style2'>
                    <div className='banner__items--thumbnail'>
                      <h3 className='banner__items--content__title style2'>
                        {categories[0]?.name.toUpperCase() || ''}
                      </h3>
                    </div>
                    <Link to={`/shop?catId=${categories[0]?.id}`}>
                      <span className='banner__items--content__link style2'>Shop Now</span>
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
            <div className='col-lg-8'>
              <div className='banner__style2--top__sidebar d-flex'>
                <Link to={`/shop?catId=${categories[1]?.id}`}>
                  <div className='banner__items position__relative mr-30 mb-28'>
                    <div className='banner__items--thumbnail'>
                      <img
                        className='banner__items--thumbnail__img banner__img--max__height'
                        src={categories[1]?.image}
                        alt='banner-img'
                      />
                    </div>
                    <div className='banner__items--content banner_items_title_bkg style2'>
                      <div className='banner__items--thumbnail'>
                        <h3 className='banner__items--content__title style2'>
                          {categories[1]?.name.toUpperCase() || ''}
                        </h3>
                      </div>
                      <span className='banner__items--content__link style2'>SHOP NOW</span>
                    </div>
                  </div>
                </Link>
                <div className='banner__items position__relative mb-28'>
                  <Link
                    className='banner__items--thumbnail'
                    to={`/shop?catId=${categories[2]?.id}`}
                  >
                    <img
                      className='banner__items--thumbnail__img'
                      src={categories[2]?.image}
                      alt='banner-img'
                    />
                    <div className='banner__items--content banner_items_title_bkg style2'>
                      <h3 className='banner__items--content__title style2'>
                        {categories[2]?.name.toUpperCase() || ''}
                      </h3>
                      <span className='banner__items--content__link style2'>SHOP NOW</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className='row row-cols-sm-2 row-cols-1'>
                <div className='col mb-28'>
                  <Link to={`/shop?catId=${categories[3]?.id}`}>
                    <div className='banner__items position__relative'>
                      <div className='banner__items--thumbnail'>
                        <img
                          className='banner__items--thumbnail__img banner__img--max__height'
                          src={categories[3]?.image}
                          alt='banner-img'
                        />
                      </div>
                      <div className='banner__items--content banner_items_title_bkg style2'>
                        <div className='banner__items--thumbnail'>
                          <h3 className='banner__items--content__title style2'>
                            {categories[3]?.name.toUpperCase() || ''}
                          </h3>
                        </div>
                        <span className='banner__items--content__link style2'>SHOP NOW</span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col mb-28'>
                  <Link to={`/shop?catId=${categories[4]?.id}`}>
                    <div className='banner__items position__relative'>
                      <div className='banner__items--thumbnail'>
                        <img
                          className='banner__items--thumbnail__img banner__img--max__height'
                          src={categories[4]?.image}
                          alt='banner-img'
                        />
                      </div>
                      <div className='banner__items--content banner_items_title_bkg style2 right'>
                        <div className='banner__items--thumbnail'>
                          <h3 className='banner__items--content__title style2'>
                            {categories[4]?.name.toUpperCase() || ''}
                          </h3>
                        </div>
                        <span className='banner__items--content__link style2'>SHOP NOW</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopByCategories;
