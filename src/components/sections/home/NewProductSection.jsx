import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ProductCard from '../../shared/product/productCard';
import { postData } from '../../../utils/apiCall';
import ProductModal from '../../shared/product/productModal';

const NewProductSection = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [products, setProducts] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [product, setProduct] = useState();
  useEffect(() => {
    switch (selectedTab) {
      case 1:
        fetchMyAPINewArrivals();
        break;
      case 2:
        fetchMyAPIMobileAccessories();
        break;
      case 3:
        fetchMyAPIPersonalCare();
        break;
      case 4:
        fetchMyAPIGadgets();
        break;

      default:
        setProducts([]);
        break;
    }
  }, [selectedTab]);
  async function fetchMyAPINewArrivals() {
    const res = await postData('/products/newArrivals');
    setProducts(res.data);
  }
  async function fetchMyAPIMobileAccessories() {
    const res = await postData('/products/mobileAccessories');
    setProducts(res.data);
  }
  async function fetchMyAPIPersonalCare() {
    const res = await postData('/products/personalCare');
    setProducts(res.data);
  }
  async function fetchMyAPIGadgets() {
    const res = await postData('/products/gadgets');
    setProducts(res.data);
  }
  return (
    <>
      <section className='product__section section--padding pt-0'>
        <div className='container-fluid'>
          <div className='section__heading text-center mb-35'>
            <h2 className='section__heading--maintitle'>New Products</h2>
          </div>
          <ul className='product__tab--one product__tab--primary__btn d-flex justify-content-center mb-50'>
            <li
              className={cx('product__tab--primary__btn__list', { active: selectedTab === 1 })}
              onClick={() => setSelectedTab(1)}
            >
              New Arrival
            </li>
            <li
              className={cx('product__tab--primary__btn__list', { active: selectedTab === 2 })}
              onClick={() => setSelectedTab(2)}
            >
              Summer Collection
            </li>
            <li
              className={cx('product__tab--primary__btn__list', { active: selectedTab === 3 })}
              onClick={() => setSelectedTab(3)}
            >
              Featured
            </li>
            <li
              className={cx('product__tab--primary__btn__list', { active: selectedTab === 4 })}
              onClick={() => setSelectedTab(4)}
            >
              Trending
            </li>
          </ul>
          <div className='tab_content'>
            <div className={cx('tab_pane active show')}>
              <div className='product__section--inner'>
                <div className='row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n30'>
                  {products?.length > 0 &&
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
    </>
  );
};

export default NewProductSection;
