import Layout from '../components/Layout';
import Slider from '../components/Slider';
import OurClients from '../components/sections/home/OurClients';
import BlogSection from '../components/sections/home/BlogSection';
import Categories from '../components/sections/home/Categories';
import InstagramSection from '../components/sections/home/InstagramSection';
import NewProductSection from '../components/sections/home/NewProductSection';
import { Link } from 'react-router-dom';
import time from '../utils/time';
import BestSeller from '../components/sections/home/BestSellersSection';
import { useEffect } from 'react';
import { useState } from 'react';
import { postData } from '../utils/apiCall';
import moment from 'moment';

const Home = () => {
  const [instagramKey, setInstagramKey] = useState('');
  const [homePageData, setHomePageData] = useState({});

  async function getHomePageData() {
    const res = await postData('/settings/getInstagramKey');
    if (res?.data) {
      setInstagramKey(res?.data?.instagram_key);
      setHomePageData({
        ...res?.data,
        dealEnd: moment(res?.data?.deal_time_days).format('ll') + ' 00:00:00',
      });
      console.log(res.data);
    }
  }

  useEffect(() => {
    getHomePageData();
  }, []);

  return (
    <Layout>
      <main className='main__content_wrapper'>
        <Slider />
        {/* Start banner section */}
        <Categories />
        <NewProductSection />
        {/* End banner section */}
        {/* Start product section */}
        {/* <DealOfTheDay />
        <NewArrivals />
        <MobileAccessories />
        <PersonalCare />
        <Gadgets /> */}
        {/* End product section */}
        {/* Start deals banner section */}
        <section className='deals__banner--section section--padding pt-0'>
          <div className='container-fluid'>
            <div
              className='deals__banner--inner banner__bg'
              style={{ background: `url(${homePageData?.deal_image})` }}
            >
              <div className='row row-cols-1 align-items-center'>
                <div className='col'>
                  <div className='deals__banner--content position__relative'>
                    <span className='deals__banner--content__subtitle text__secondary'>
                      {homePageData?.deal_discount_text}
                    </span>
                    <h2 className='deals__banner--content__maintitle'>
                      {homePageData?.deal_title}
                    </h2>
                    <p className='deals__banner--content__desc'>{homePageData?.deal_description}</p>

                    <div
                      className='deals__banner--countdown d-flex'
                      data-countdown={homePageData?.dealEnd}
                    >
                      <div className='countdown__item'>
                        <span className='countdown__number'>
                          {time(homePageData?.dealEnd).days}
                        </span>
                        <p className='countdown__text'>days</p>
                      </div>
                      <div className='countdown__item'>
                        <span className='countdown__number'>
                          {time(homePageData?.dealEnd).hours}
                        </span>
                        <p className='countdown__text'>hrs</p>
                      </div>
                      <div className='countdown__item'>
                        <span className='countdown__number'>
                          {time(homePageData?.dealEnd).minutes}
                        </span>
                        <p className='countdown__text'>mins</p>
                      </div>
                      <div className='countdown__item'>
                        <span className='countdown__number'>
                          {time(homePageData?.dealEnd).seconds}
                        </span>
                        <p className='countdown__text'>secs</p>
                      </div>
                    </div>

                    <a className='primary__btn' href={homePageData?.deal_link}>
                      Show Collection
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
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BestSeller />
        {/* End deals banner section */}
        {/* Start banner section */}
        <section className='banner__section section--padding pt-0'>
          <div className='container-fluid'>
            <div className='row row-cols-md-2 row-cols-1 mb--n28'>
              <div className='col mb-28'>
                <div className='banner__items position__relative'>
                  <a className='banner__items--thumbnail ' href={homePageData?.section_link}>
                    <img
                      className='banner__items--thumbnail__img banner__img--max__height'
                      src={homePageData?.section_image}
                      alt='banner-img'
                    />
                    <div className='banner__items--content'>
                      <span className='banner__items--content__subtitle d-none d-lg-block'>
                        {homePageData?.section_title}
                      </span>
                      <h2 className='banner__items--content__title h3'>
                        {homePageData?.section_offer}
                      </h2>
                      <span className='banner__items--content__link'>
                        <u>Shop now</u>
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              <div className='col mb-28'>
                <iframe width='100%' height={265} src={homePageData?.section_video} />
              </div>
            </div>
          </div>
        </section>
        {/* End banner section */}
        <OurClients />
        <BlogSection />
      </main>
      <InstagramSection instagramKey={instagramKey} />
    </Layout>
  );
};

export default Home;
