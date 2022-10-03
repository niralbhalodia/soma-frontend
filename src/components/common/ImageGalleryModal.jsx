import React from 'react';
import Slider from 'react-slick';
import Modal from './Modal';

const ImageGalleryModal = ({ currentImage, gallery, isVisible, setVisible }) => {
  const customeSlider = React.createRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
  };

  const gotoNext = () => {
    customeSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customeSlider.current.slickPrev();
  };

  return (
    // <>
    //   <Modal title={`Product Image`} {...props}>
    //     <Slider {...settings} ref={customeSlider}>
    //       {props?.gallery?.length > 0 &&
    //         props?.gallery.map(({ image }, index) => (
    //           <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={image} alt='' key={index} />
    //         ))}
    //     </Slider>
    //   </Modal>
    // </>
    <div className='image_gallery' style={{ display: isVisible ? 'block' : 'none' }}>
      <Slider {...settings} ref={customeSlider}>
        {gallery?.length > 0 &&
          gallery.map(({ image }, index) => <img src={image} alt='' key={index} />)}
      </Slider>
      <div className='button-right' onClick={gotoNext}>
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          viewBox='0 0 477.175 477.175'
          xmlSpace='preserve'
          fill='#fff'
        >
          {'{'}' '{'}'}
          <g>
            <path d='M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z' />
          </g>
        </svg>
      </div>
      <div className='button-left' onClick={gotoPrev}>
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          viewBox='0 0 477.175 477.175'
          xmlSpace='preserve'
          fill='#fff'
        >
          <g>
            <path d='M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z' />
          </g>
        </svg>
      </div>
      <div className='button-close' onClick={() => setVisible(false)}>
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          viewBox='0 0 512 512'
          xmlSpace='preserve'
          fill='#fff'
        >
          <g>
            <g>
              <path d='M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z' />
            </g>
          </g>
          <g>
            <g>
              <path d='M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z' />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
