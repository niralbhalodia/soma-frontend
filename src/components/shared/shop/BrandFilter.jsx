import React from 'react';
import { Link } from 'react-router-dom';

const BrandFilter = ({ brands = [] }) => {
  return (
    <>
      <div className='single__widget widget__bg'>
        <h2 className='widget__title h3'>Brands</h2>
        <ul className='widget__tagcloud'>
          {brands.length > 0 &&
            brands.map((brand, index) => (
              <li className='widget__tagcloud--list' key={index}>
                <Link className='widget__tagcloud--link' to={`/shop?brand_id=${brand?.id}`}>
                  {brand?.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default BrandFilter;
