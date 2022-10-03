import React, { useEffect, useState } from 'react';
import { postData } from '../../../utils/apiCall';
import { Link } from 'react-router-dom';
import ProductModal from '../../shared/product/productModal';
import ProductCard from '../../shared/product/productCard';

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [product, setProduct] = useState();

  useEffect(() => {
    async function fetchMyAPINewArrivals() {
      const res = await postData('/products/newArrivals');
      setNewArrivals(res.data);
    }

    fetchMyAPINewArrivals();
  }, []);

  return (
    <section className='product__section section--padding pt-0'>
      <div className='container-fluid'>
        <div className='section__heading text-center mb-35'>
          <h2 className='section__heading--maintitle'>New Arrivals</h2>
        </div>
        <div className='tab_content'>
          <div id='Summer' className='tab_pane active show'>
            <div className='product__section--inner'>
              <div className='row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n30'>
                {newArrivals.length > 0 &&
                  newArrivals
                    .slice(0, 4)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        setVisible={setVisible}
                        setProduct={setProduct}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductModal isVisible={isVisible} setVisible={setVisible} product={product} />
    </section>
  );
};

export default NewArrivals;
