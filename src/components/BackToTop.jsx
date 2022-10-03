import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

const BackToTop = () => {
  const checkScrollTop = () => {
    let btn = document.getElementById('scroll__top');
    if (btn) {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.className = 'active';
      } else {
        btn.className = '';
      }
    }
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollTop);
  }
  return (
    <>
      {/* <span id="scroll_top"></span> */}
      <button
        // className="active"
        id='scroll__top'
        title='Go to Top'
        onClick={() => scrollTo('.header__section')}
        // onKeyDown={() => scrollTo('#scroll__top')}
        // aria-hidden="true"
      >
        <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
          <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='48'
            d='M112 244l144-144 144 144M256 120v292'
          ></path>
        </svg>{' '}
      </button>
    </>
  );
};

export default BackToTop;
