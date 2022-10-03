import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { postData } from '../utils/apiCall';

const Carousel = () => {
  // const customeSlider = useRef();
  const customeSlider = React.createRef();
  const [images, setImages] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  const gotoNext = () => {
    customeSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customeSlider.current.slickPrev();
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const res = await postData('/banners/getBanner');
      // console.log(res);
      setImages(res.data);
    }
    fetchMyAPI();
  }, []);

  return (
    <>
      <section className='react-slick-slider'>
        <Slider {...settings} ref={customeSlider}>
          {images?.length > 0 &&
            images.map((banner, index) => (
              <div className='swiper-slide' key={index}>
                <div
                  className='hero__slider--items home1__slider--bg'
                  style={{ backgroundImage: `url(${banner.image})` }}
                >
                  <div className='container-fluid'>
                    <div className='hero__slider--items__inner'>
                      <div className='row row-cols-1'>
                        <div className='col'>
                          <div className='slider__content'>
                            {banner?.name && (
                            <p className='slider__content--desc desc1 mb-15'>
                              <img
                                className='slider__text--shape__icon'
                                src='assets/images/icon/text-shape-icon.png'
                                alt='text-shape-icon'
                              />{' '}
                              {banner?.name || ''}
                            </p>
                            )}
                            <h2 className='slider__content--maintitle h1'>
                            {banner?.title || ''}
                            </h2>
                            <p className='slider__content--desc desc2 d-sm-2-none mb-40'>
                            {banner?.sub_title || ''}
                            </p>
                            {banner?.page_link && banner?.link_name && (
                            <a className='slider__btn primary__btn' href={`${banner?.page_link}`}>
                              {banner?.link_name || ''}
                              <svg
                                className='primary__btn--arrow__icon'
                                xmlns='http://www.w3.org/2000/svg'
                                width='20.2'
                                height='12.2'
                                viewBox='0 0 6.2 6.2'
                              >
                                <path
                                  d='M7.1,4l-.546.546L8.716,6.713H4v.775H8.716L6.554,9.654,7.1,10.2,9.233,8.067,10.2,7.1Z'
                                  transform='translate(-4 -4)'
                                  fill='currentColor'
                                />
                              </svg>
                            </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
        <br />
        <div className='slider-prev-button' onClick={() => gotoPrev()}></div>
        <div className='slider-next-button' onClick={() => gotoNext()}></div>
      </section>
    </>
  );
};

export default Carousel;
