import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Slider from 'react-slick';
import { fetchData } from '../../../utils/apiCall';

const InstagramSection = ({ instagramKey }) => {
  const customeSlider = React.createRef();

  const [instagramData, setinstagramData] = useState([]);

  async function getInstaToken() {
    // const res = await postData('/settings/getInstagramKey');
    if (instagramKey !== '') {
      await fetchAPIInstagramData(
        `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,timestamp,permalink&access_token=${instagramKey}`,
      );
    }
  }
  async function fetchAPIInstagramData(url) {
    try {
      const res = await fetchData(url);
      if (res?.data) setinstagramData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getInstaToken();
  }, [instagramKey]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 5,
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

  return (
    <>
      <Helmet>
        <script src='https://cdn2.woxo.tech/a.js#6245771b131190002fd2e0f2' async data-usrc></script>
      </Helmet>
      {/* Start instagram section */}
      <div className='blog__section section--padding pt-0'>
        <div className='container-fluid'>
          <div className='section__heading text-center mb-40'>
            <h2 className='section__heading--maintitle'>#SOMABLOCKPRINTS ON INSTAGRAM</h2>
          </div>
          {/* <div loading='lazy' data-mc-src='50b67969-2e48-447b-861a-8f16ad10f036#instagram' /> */}
          <div className='custom-dot-slider instagram-slider custom-insta-slider'>
            <Slider {...settings} ref={customeSlider}>
              {instagramData
                .filter((item) => item?.media_type === 'IMAGE')
                .map((item, index) => (
                  <div
                    className='insta-slide-img-paernt'
                    key={index}
                    style={{
                      margin: '10px',
                      height: '200px',
                    }}
                  >
                    <a target='_blank' href={item?.permalink}>
                      <img
                        className='insta-slide-img'
                        style={{ width: '280px', height: '280px' }}
                        src={item?.media_url}
                        alt=''
                      />
                    </a>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* end instagram section */}
    </>
  );
};

export default InstagramSection;
