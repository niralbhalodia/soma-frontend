import React from 'react';
import Modal from '../../common/Modal';

const SizeChart = (props) => {
  return (
    <>
      <Modal title={`Size chart`} {...props}>
        <div className='sizechart-content row p-50'>
            {props?.size_chart_image && (
              <div className='blog__thumbnail mb-30'>
                <img
                  className='blog__thumbnail--img border-radius-10'
                  src={props?.size_chart_image}
                  alt='blog-img'
                />
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: props?.size_chart || '' }} />
        </div>
      </Modal>
    </>
  );
};

export default SizeChart;
