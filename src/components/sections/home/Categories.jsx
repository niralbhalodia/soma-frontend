import React from 'react';
import ShopByCategories from './ShopByCategories';
import { useSelector } from 'react-redux';

const Categories = () => {
  const categories = useSelector((state) => state.menu);

  return (
    <>
      {/* <section className='banner__section banner__style2 section--padding color-scheme-2'>
      <div className='section__heading text-center mb-35'>
        <h2 className='section__heading--maintitle style2'>Shop by Categories</h2>
      </div>
      <div className='banner__items position__relative mb-28'>
        {categories.length > 0 &&
          categories.map(({ id, image, name }, index) => (
            <Link className='banner__items--thumbnail' to={`/shop?catId=${id}`} key={index}>
              <img className='banner__items--thumbnail__img' src={image} alt='banner-img' />
              <div className=''>
                <h3 className='banner__items--content__title style2'>{name}</h3>
              </div>
            </Link>
          ))}
      </div>
    </section> */}
      <ShopByCategories categories={categories} />
    </>
  );
};

export default Categories;
