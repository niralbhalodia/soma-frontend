import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import OurClients from '../components/sections/home/OurClients';

const AboutUs = () => {
  return (
    <Layout>
      <main className='main__content_wrapper'>
        {/* Start breadcrumb section */}
        <section className='breadcrumb__section breadcrumb__bg'>
          <div className='row row-cols-1 ML-20'>
            <div className='col'>
              <ul className='breadcrumb__content--menu d-flex '>
                <li className='breadcrumb__content--menu__items'>
                  <Link className='text-red' to='/'>
                    Home
                  </Link>
                </li>
                <li className='breadcrumb__content--menu__items'>
                  <span className='text-red'>About Us</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start about section */}
        <section className='about__section section--padding '>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-5'>
                <iframe
                  className='iframe'
                  src='https://www.youtube.com/embed/OwRxpULd7LA'
                ></iframe>
              </div>
              <div className='col-lg-7'>
                <div className='about__content'>
                  <span className='about__content--subtitle text__secondary mb-20 section__heading--maintitle'>
                    {' '}
                    About Soma
                  </span>
                  <h2 className='about__content--maintitle mb-25' />
                  <p className='about__content--desc mb-25'>
                    In the age of massproduced fast fashion, Soma is an outstanding example of what
                    can be achieved when work ethic and skill are applied to an ancient craft. Using
                    the knowledge and techniques that have been passed down through many
                    generations, the art of block printing brings passion and excitement into the
                    21st century. Throughout the year, Soma range of household textiles and fashion
                    evolving and expanding.
                  </p>
                  <p className='about__content--desc mb-25'>
                    {' '}
                    Please check out our website on a regular basis to enjoy new styles in fashion,
                    and fresh designs for your home. .
                  </p>
                  {/* <div className="about__author position__relative d-flex align-items-center">
                      <div className="about__author--left">
                          <h4 className="about__author--name">Bruce Sutton</h4>
                          <span className="about__author--rank">Spa Manager</span>
                      </div>
                      <img className="about__author--signature display-block" src="assets/images/icon/signature.png" alt="signature">
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End about section */}
        {/* Start about section */}
        <section className='about__section section--padding mb-95 pt-0'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8'>
                <div className='about__content'>
                  <span className='about__content--subtitle text__secondary mb-20 section__heading--maintitle'>
                    Block Printing
                  </span>
                  <p className='about__content--desc mb-20'>
                    Block printing is an ancient Indian textile tradition. Cloth with block printing
                    has been found dated back as early as 2000BC. Today this cultural tradition has
                    been kept alive in villages through Rajasthan due to the passionate efforts of
                    companies like Soma. Block printing provides sustainable livelihood to local
                    families and Soma is dedicated to keep this traditional wisdom alive and
                    thriving. The wood-blocks are hand carved in elaborate designs and each colour
                    is printed with a different block to complete the motif. A high degree of skill
                    is required for both the placement of motifs and the application of pressure.
                    Altogether there can be as many as 16 blocks to create a 5-colour design.
                  </p>
                  <p className='about__content--desc mb-25'>
                    A set of blocks can be used to print on average 1500-2000 meters of fabric.
                    Colours used for printing are derived from nontoxic chemical, mineral and
                    vegetable origin. Chemical dyes have replaced vegetable pigments to withstand
                    present day washing and colourfast requirements. Block printed textiles reflect
                    the touch of human hands, sensibility and skill of the craftsmen; and they
                    represent a heritage craft that if we do not respect and protect may be lost
                    forever. Soma joins all those people around the world who are working hard to
                    keep these traditions alive.
                  </p>
                </div>
              </div>
              <div className='col-lg-4 pt-75'>
                <iframe
                  className='iframe'
                  src='https://www.youtube.com/embed/OwRxpULd7LA'
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        {/* End about section */}
        <OurClients />
      </main>
    </Layout>
  );
};

export default AboutUs;
