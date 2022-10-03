import React, { useEffect, useState } from 'react';
import { postData } from '../../../utils/apiCall';
import ProductModal from '../../shared/product/productModal';
import ProductCard from '../../shared/product/productCard';

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [product, setProduct] = useState();
  useEffect(() => {
    async function fetchMyAPIDealOfTheDay() {
      const res = await postData('/products/bestSellerProducts');
      setProducts(res.data);
    }

    fetchMyAPIDealOfTheDay();
  }, []);

  return (
    <section className='product__section section--padding pt-0'>
      <div className='container-fluid'>
        <div className='section__heading text-center mb-35'>
          <h2 className='section__heading--maintitle'>Our Bestseller</h2>
        </div>
        <div className='tab_content'>
          <div id='Summer' className='tab_pane active show'>
            <div className='product__section--inner'>
              <div className='row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n30'>
                {products.length > 0 &&
                  products.map((product) => (
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

export default BestSeller;
