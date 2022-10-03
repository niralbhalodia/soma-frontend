import cx from 'classnames';
import React from 'react';

const Modal = ({ isVisible = true, setVisible, children, title }) => {
  return (
    <>
      <div className={cx('modal cutom-width', { 'is-visible': isVisible })}>
        <div className='modal-dialog quickview__main--wrapper d-flex justify-content-center'>
          <header className='modal-header quickview__header border-bottom'>
            <span className='modal_title'>{title}</span>
            <button
              className='close-modal quickview__close--btn'
              aria-label='close modal'
              onClick={(e) => {
                e.preventDefault();
                setVisible(false);
              }}
            >
              ✕
            </button>
          </header>
          <div className='modal_content' style={{ overflow: 'auto' }}>
            <div className='quickview__inner'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
