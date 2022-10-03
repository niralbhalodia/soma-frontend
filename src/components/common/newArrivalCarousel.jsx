import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { postData } from '../../utils/apiCall';
import ProductModal from '../shared/product/productModal';
import ProductCard from '../shared/product/productCard';

const NewArrivalCarousel = ({ title = 'New Products', showItems = 4 }) => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [product, setProduct] = useState();
  const customeSlider = React.createRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: showItems,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const gotoNext = () => {
    customeSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customeSlider.current.slickPrev();
  };

  useEffect(() => {
    async function fetchMyAPINewArrivals() {
      const res = await postData('/products/newArrivals');
      setNewArrivals(res.data);
    }

    fetchMyAPINewArrivals();
  }, []);

  return (
    <>
      <div className='container-fluid react-slick-slider mt-50'>
        <div className='section__heading text-center mb-40'>
          <h2 className='section__heading--maintitle'>{title}</h2>
        </div>
        <div className='slider-padding'>
          <Slider {...settings} ref={customeSlider}>
            {newArrivals.length > 0 &&
              newArrivals.map((product, index) => (
                <div style={{ padding: '0 5px' }} key={index}>
                  <ProductCard
                    key={product.id}
                    product={product}
                    setVisible={setVisible}
                    setProduct={setProduct}
                  />
                </div>
              ))}
          </Slider>
        </div>
        <div className='slider-prev-button' style={{ top: '40%' }} onClick={() => gotoPrev()}></div>
        <div className='slider-next-button' style={{ top: '40%' }} onClick={() => gotoNext()}></div>

        <div className='swiper__nav--btn swiper-button-next' />
        <div className='swiper__nav--btn swiper-button-prev' />
      </div>
      <ProductModal isVisible={isVisible} setVisible={setVisible} product={product} />
    </>
  );
};

export default NewArrivalCarousel;
