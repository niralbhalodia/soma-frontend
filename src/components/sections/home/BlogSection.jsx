import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { postData } from '../../../utils/apiCall';

const BlogSection = () => {
  const customeSlider = React.createRef();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchMyAPIBlogs() {
      const res = await postData('/blogs/latestBlogs');
      setBlogs(res.data);
    }
    fetchMyAPIBlogs();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
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
  return (
    <>
      {/* Start blog section */}
      <section className='blog__section section--padding pt-0'>
        <div className='container-fluid react-slick-slider'>
          <div className='section__heading text-center mb-40'>
            <h2 className='section__heading--maintitle'>From The Blog</h2>
          </div>

          <Slider {...settings} ref={customeSlider}>
            {blogs?.length > 0 &&
              blogs.map((blog, id) => (
                <div className='swiper-slide' key={id}>
                  <div className='blog__items' style={{ margin: '0 15px' }}>
                    <div className='blog__thumbnail'>
                      <Link to={`/blog?id=${blog?.id}`} className='blog__thumbnail--link'>
                        <img
                          className='blog__thumbnail--img'
                          src={blog.blog_thumb_image}
                          alt='blog-img'
                        />
                      </Link>
                    </div>
                    <div className='blog__content'>
                      <span className='blog__content--meta'>{moment(blog?.created_at).format('MMMM DD, YYYY')}</span>
                      <h3 className='blog__content--title'>
                        <Link to={`/blog?id=${blog?.id}`}>
                          {blog?.title}
                        </Link>
                      </h3>
                      <Link to={`/blog?id=${blog?.id}`} className='blog__content--btn primary__btn'>
                        Read more{' '}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
          <div
            className='slider-prev-button'
            style={{ top: '40%' }}
            onClick={() => gotoPrev()}
          ></div>
          <div
            className='slider-next-button'
            style={{ top: '40%' }}
            onClick={() => gotoNext()}
          ></div>

          <div className='swiper__nav--btn swiper-button-next' />
          <div className='swiper__nav--btn swiper-button-prev' />
        </div>
      </section>
      {/* End blog section */}
    </>
  );
};

export default BlogSection;
