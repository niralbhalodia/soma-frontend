import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { postData } from '../utils/apiCall';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchMyAPIBlogs() {
      const params = new URLSearchParams();
      params.append('offSet', 1);
      const res = await postData('/blogs/getBlogs', params);
      setBlogs(res.data);
    }

    fetchMyAPIBlogs();
  }, []);

  const fetchBlogsData = async () => {
    const params = new URLSearchParams();
    params.append('offSet', currentPage);
    const res = await postData('/blogs/getBlogs', params);
    setBlogs([...blogs, ...res.data]);
    if (res.data.length === 0 || res.data.length < 20) {
      setHasMore(false);
    }
    setCurrentPage(currentPage + 1);
  };

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
                  <span className='text-red'>Blog</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start blog section */}
        <section className='blog__section section--padding'>
          <div className='container'>
            <div className='section__heading text-center mb-50'>
              <h2 className='section__heading--maintitle'>From The Blog</h2>
            </div>
            <InfiniteScroll
              dataLength={blogs.length} //This is important field to render the next data
              next={fetchBlogsData}
              style={{ overflow: 'hidden' }}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p style={{ textAlign: 'center', paddingTop: '20px' }}>No more Blogs!</p>}
            >
              <div className='blog__section--inner'>
                <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-sm-u-2 row-cols-1 mb--n30'>
                  {blogs?.length > 0 &&
                    blogs.map((blog, index) => (
                      <div className='col mb-30' key={index}>
                        <div className='blog__items'>
                          <div className='blog__thumbnail'>
                            <Link to={`/blog?id=${blog?.id}`} className='blog__thumbnail--link'>
                              <img
                                className='blog__thumbnail--img'
                                src={blog?.blog_thumb_image}
                                alt='blog-img'
                              />
                            </Link>
                          </div>
                          <div className='blog__content'>
                            <span className='blog__content--meta'>{moment(blog?.created_at).format('MMMM DD, YYYY')}</span>
                            <h3 className='blog__content--title'>
                              <Link to={`/blog?id=${blog?.id}`}>{blog?.title}</Link>
                            </h3>
                            <Link
                              to={`/blog?id=${blog?.id}`}
                              className='blog__content--btn primary__btn'
                            >
                              Read more{' '}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/* <div className='pagination__area bg__gray--color'>
                <nav className='pagination'>
                  <ul className='pagination__wrapper d-flex align-items-center justify-content-center'>
                    <li className='pagination__list'>
                      <a href='blog.html' className='pagination__item--arrow  link '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='22.51'
                          height='20.443'
                          viewBox='0 0 512 512'
                        >
                          <path
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={48}
                            d='M244 400L100 256l144-144M120 256h292'
                          />
                        </svg>
                        <span className='visually-hidden'>pagination arrow</span>
                      </a>
                    </li>
                    <li></li>
                    <li className='pagination__list'>
                      <span className='pagination__item pagination__item--current'>1</span>
                    </li>
                    <li className='pagination__list'>
                      <a href='blog.html' className='pagination__item link'>
                        2
                      </a>
                    </li>
                    <li className='pagination__list'>
                      <a href='blog.html' className='pagination__item link'>
                        3
                      </a>
                    </li>
                    <li className='pagination__list'>
                      <a href='blog.html' className='pagination__item link'>
                        4
                      </a>
                    </li>
                    <li className='pagination__list'>
                      <a href='blog.html' className='pagination__item--arrow  link '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='22.51'
                          height='20.443'
                          viewBox='0 0 512 512'
                        >
                          <path
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={48}
                            d='M268 112l144 144-144 144M392 256H100'
                          />
                        </svg>
                        <span className='visually-hidden'>pagination arrow</span>
                      </a>
                    </li>
                    <li></li>
                  </ul>
                </nav>
              </div> */}
              </div>
            </InfiniteScroll>
          </div>
        </section>
        {/* End blog section */}
      </main>
    </Layout>
  );
};

export default Blog;
