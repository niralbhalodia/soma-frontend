import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { postData } from '../../../utils/apiCall';
import ReactStars from 'react-rating-stars-component';

const OurClients = () => {
  const customeSlider = React.createRef();
  const [testimonials, setTestimonials] = useState([]);
  const testimonial = {
    image:
      'http://143.110.190.232/frillfix_api/assets/uploads/testimonials/image-1655829572446.png',
    id: 1,
    name: 'Nike Mardson',
    designation: 'fashion',
    note: 'Loremm ipsum dolor sit amet, consectetur adipisicin elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
    rating: 5,
    status: 'Active',
    created_at: '2022-06-21T16:39:32.000Z',
    updated_at: '2022-06-22T14:06:49.000Z',
  };

  useEffect(() => {
    async function fetchMyAPITestimonials() {
      const res = await postData('/testimonials/getTestimonials');
      setTestimonials(res.data);
    }

    fetchMyAPITestimonials();
  }, []);

  const readReviewStar = {
    size: 30,
    edit: false,
    isHalf: true,
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          slidesToScroll: 2,
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
  return (
    <>
      {/* Start testimonial section */}
      <section className='testimonial__section section--padding pt-0'>
        <div className='container-fluid react-slick-slider custom-dot-slider'>
          <div className='section__heading text-center mb-40'>
            <h2 className='section__heading--maintitle'>Our Clients Say</h2>
          </div>
          <Slider {...settings} ref={customeSlider}>
            {testimonials?.length > 0 &&
              testimonials.map((testimonial, index) => (
                <div className='swiper-slide' key={index}>
                  <div className='testimonial__items text-center'>
                    <div className='testimonial__items--thumbnail'>
                      <img
                        className='testimonial__items--thumbnail__img border-radius-50'
                        src={testimonial?.image}
                        alt='testimonial-img'
                      />
                    </div>
                    <div className='testimonial__items--content'>
                      <h3 className='testimonial__items--title'>{testimonial?.name}</h3>
                      <span className='testimonial__items--subtitle'>
                        {testimonial?.designation}
                      </span>
                      <p className='testimonial__items--desc'>{testimonial?.note}</p>
                      <ul className='rating testimonial__rating d-flex justify-content-center'>
                        <ReactStars {...readReviewStar} value={testimonial?.rating} />
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
          {/* <div className='slider-prev-button' onClick={() => gotoPrev()}></div>
          <div className='slider-next-button' onClick={() => gotoNext()}></div> */}
        </div>
      </section>
      {/* End testimonial section */}
    </>
  );
};

export default OurClients;
