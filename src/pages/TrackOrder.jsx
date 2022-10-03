import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import ContactForm from '../components/shared/contact/contactForm';
import { useParams } from 'react-router-dom';
// import '../assets/css/components/trackOrder.css';
import { postData } from '../utils/apiCall';
import { Timeline } from 'antd';
import { useRef } from 'react';
import '../assets/css/components/track-order.css';

const TrackOrder = () => {
  const idInput = useRef();
  const searchParams = useLocation().search;
  const id = new URLSearchParams(searchParams).get('id');

  const [trackingData, setTrackingData] = useState({});
  const [scanDetails, setScanDetails] = useState({});
  const [trackId, setTrackId] = useState();
  const [orderNumber, setOrderNumber] = useState('');
  let status = '';
  status = scanDetails?.length > 0 && scanDetails[0]?.Scan[0];
  let isShipped = false;
  let isEnRoute = false;
  let isDelivered = false;
  if (status === 'Online shipment booked ') isShipped = scanDetails[0]?.ScanDate[0];
  else if (status === 'SHIPMENT DELIVERED ') isDelivered = scanDetails[0]?.ScanDate[0];
  else isEnRoute = scanDetails[0]?.ScanDate[0];
  let date = '';
  date = scanDetails?.length > 0 && scanDetails[scanDetails.length - 1]?.ScanDate[0];

  async function getOrderTrackingData(trackId) {
    const params = new URLSearchParams();
    params.append('trackingNumber', trackId);
    params.append('awb_number', trackId);
    const res = await postData('/products/orderTracking', params);
    const orderRes = await postData('/orders/getByOrderByAWB', params);
    if (orderRes?.data?.order_number) setOrderNumber(orderRes.data.order_number);
    if (res?.data?.ShipmentData?.Shipment[0]) {
      setTrackingData(res.data.ShipmentData.Shipment[0]);
      setScanDetails(res.data.ShipmentData.Shipment[0].Scans[0].ScanDetail);
    }
  }

  useEffect(() => {
    setOrderNumber('');
    trackId && getOrderTrackingData(trackId);
  }, [trackId]);

  useEffect(() => {
    setTrackId(id);
  }, [id]);

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
                  <span className='text-red'>Track Order</span>
                </li>
                <li className='breadcrumb__content--menu__items'>
                  <span className='text-red'>{trackId}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className='contact__section section--padding'>
          <div className='container'>
            <div className='section__heading text-center mb-40'>
              <h2 className='section__heading--maintitle'>Track your Order</h2>
            </div>
            <div>
              <div className=' d-flex justify-content-center align-items-center track-order-form'>
                {/* After OTP verification, update password block will be rendered */}
                <div className='col-md-6'>
                  <div className='checkout__input--list'>
                    <label>
                      <input
                        name='trackingId'
                        className='checkout__input--field border-radius-5'
                        defaultValue={trackId}
                        placeholder='Enter tracking Id...'
                        type='text'
                        ref={idInput}
                      />
                    </label>
                  </div>
                </div>
                <button
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setTrackId(idInput.current.value);
                  }}
                  className='center primary__btn track_button border-radius-5'
                >
                  Track
                </button>
              </div>
            </div>
          </div>
          {trackId && (
            <div className='track-order'>
              <div>
                <div className='container'>
                  <div className='row hh-grayBox'>
                    <div className='track-order-status-header'>
                      <p style={{ float: 'left', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Order : {orderNumber ? `#${orderNumber}` : '-'}
                      </p>
                      <p style={{ float: 'right' }}>
                        {isDelivered
                          ? `Delivered on ${isDelivered}`
                          : isShipped
                          ? 'Status - Online shipment booked'
                          : `Expected Arrival ${trackingData?.ExpectedDeliveryDate || '-'}`}
                        <br />
                        AWB <strong>{trackId}</strong>{' '}
                      </p>
                    </div>

                    {scanDetails?.length > 0 && (
                      <div className='col-12 col-md-10 pt45' style={{ width: '100%' }}>
                        <div className='row justify-content-between'>
                          <div className='order-tracking completed'>
                            <span className='is-complete' />
                            <div className='order-status'>
                              <img src='assets/images/icon/purchase-order.png' alt='' />
                              <div className='order-status-text'>
                                <p>
                                  Order processed
                                  <br />
                                  <span>{isShipped || date}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`order-tracking ${
                              (isShipped || isEnRoute || isDelivered) && 'completed'
                            }`}
                          >
                            <span className='is-complete' />
                            <div className='order-status'>
                              <img src='assets/images/icon/order-shipped.png' alt='' />
                              <div className='order-status-text'>
                                <p>
                                  Order Shipped
                                  <br />
                                  <span>{isShipped || date}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`order-tracking ${
                              (isEnRoute || isDelivered) && 'completed'
                            }`}
                          >
                            <span className='is-complete' />
                            <div className='order-status'>
                              <img src='assets/images/icon/order-en-route.png' alt='' />
                              <div className='order-status-text'>
                                <p>
                                  Order En Route
                                  <br />
                                  <span>{isEnRoute || ((isEnRoute || isDelivered) && date)}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className={`order-tracking ${isDelivered && 'completed'}`}>
                            <span className='is-complete' />
                            <div className='order-status'>
                              <img src='assets/images/icon/order-delivered.png' alt='' />
                              <div className='order-status-text'>
                                <p>
                                  {isDelivered ? 'Delivered on' : 'Expected Delivery'}
                                  <br />
                                  <span>{isDelivered || trackingData?.ExpectedDeliveryDate}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='timeline-container'>
                <div className='timeline-content hh-grayBox'>
                  <Timeline
                  //pending={`Expected Delivery Date ${trackingData?.ExpectedDeliveryDate}`}
                  >
                    {scanDetails.length > 0 &&
                      scanDetails.map((item, index) => (
                        <Timeline.Item key={index}>
                          <p>{item?.Scan[0]} </p>
                          <p>
                            {item?.ScanDate[0]} {item?.ScanTime[0]}
                          </p>
                          <p>{item?.ScannedLocation[0]}</p>
                        </Timeline.Item>
                      ))}
                  </Timeline>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default TrackOrder;
