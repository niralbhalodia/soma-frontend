import React, { createRef, useEffect, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { postData } from '../../../../utils/apiCall';
import InvoiceModal from './InvoiceModal';
import PdfFormat from './pdfFormat';
import { useNavigate } from 'react-router-dom';
import Doc from '../../../../utils/DocService';
import { addToCart } from '../../../../redux/action/cart';
import { useDispatch } from 'react-redux';
import GetCurrency from '../../currency/GetCurrency';

const Invoices = () => {
  const dispach = useDispatch();
  const ref = createRef();
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [pdfData, setPdfData] = useState();

  // this trigger is for creating pdf after set data into pdfData state
  // because if we call directly Doc method after set pdfData it will throw an error
  const [pdfTrigger, setPdfTrigger] = useState(false);

  useEffect(() => {
    async function fetchMyAPIOrderHistory() {
      const res = await postData('/orders/orderHistory');
      setOrderHistory(res.data);
    }

    fetchMyAPIOrderHistory();
  }, []);

  useEffect(() => {
    if (pdfTrigger) {
      Doc.createPdf(ref.current);
      setPdfData();
      setPdfTrigger(false);
    }
  }, [pdfTrigger]);

  const downloadInvoice = async (order) => {
    await setPdfData(order);
    setPdfTrigger(true);
  };

  const reOrder = async (order) => {
    console.log(order);
    for (const product of order?.order_items) {
      console.log(product);
      await dispach(
        addToCart({
          ...product.product,
          price: product?.price,
          hasCombination: product.product_variations_combination,
        }),
      );
      navigate('/checkout');
    }
  };

  const handleButtonClick = (e) => {
    console.log('click left button', e);
  };

  const handleMenuClick = ({ key, order }) => {
    switch (key) {
      case '1':
        downloadInvoice(order);
        break;
      case '2':
        reOrder(order);
        break;
      case '3':
        navigate(`/track-order?id=${order.awb_number}`);
        break;

      default:
        break;
    }
  };

  const menu = (order) => {
    return (
      <Menu
        onClick={(e) => handleMenuClick({ ...e, order })}
        items={[
          {
            label: 'Download invoice',
            key: '1',
            icon: <DownloadOutlined />,
          },
          {
            label: 'Reorder',
            key: '2',
            // icon: <UserOutlined />,
          },
          {
            label: 'Track order',
            key: '3',
            // icon: <UserOutlined />,
          },
        ]}
      />
    );
  };

  return (
    <>
      <div className='account__content'>
        <h2 className='account__content--title h3 mb-20'>Orders History</h2>
        <div className='account__table--area'>
          <table className='account__table'>
            <thead className='account__table--header'>
              <tr className='account__table--header__child'>
                <th className='account__table--header__child--items'>Order</th>
                <th className='account__table--header__child--items'>Date</th>
                <th className='account__table--header__child--items'>Payment Status</th>
                <th className='account__table--header__child--items'>Fulfillment Status</th>
                <th className='account__table--header__child--items'>Total</th>
                <th className='account__table--header__child--items'>Action</th>
              </tr>
            </thead>
            <tbody className='account__table--body mobile__none'>
              {orderHistory?.length > 0 &&
                orderHistory.map((order, index) => (
                  <tr
                    className='account__table--body__child cursor_pointer'
                    key={index}
                    onClick={(e) => {
                      setSelectedInvoice(order);
                      setIsModalVisible(true);
                    }}
                  >
                    <td className='account__table--body__child--items cursor_pointer'>
                      #{order?.id}
                    </td>
                    <td className='account__table--body__child--items'>{order?.order_date}</td>
                    <td className='account__table--body__child--items'>{order?.payment_status}</td>
                    <td className='account__table--body__child--items'>{order?.order_status}</td>
                    <td className='account__table--body__child--items'>
                      {order?.currency_symbol || ''}
                      {order?.total || ''}
                    </td>
                    <td
                      className='account__table--body__child--items'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown.Button
                        onClick={handleButtonClick}
                        overlay={() => menu(order)}
                      ></Dropdown.Button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tbody className='account__table--body mobile__block'>
              {orderHistory?.length > 0 &&
                orderHistory.map((order, index) => (
                  <tr
                    key={index}
                    className='account__table--body__child  cursor_pointer'
                    onClick={(e) => {
                      setSelectedInvoice(order);
                      setIsModalVisible(true);
                    }}
                  >
                    <td className='account__table--body__child--items'>
                      <strong>Order</strong>
                      <span>#{order?.id}</span>
                    </td>
                    <td className='account__table--body__child--items'>
                      <strong>Date</strong>
                      <span>{order?.order_date}</span>
                    </td>
                    <td className='account__table--body__child--items'>
                      <strong>Payment Status</strong>
                      <span>{order?.payment_status}</span>
                    </td>
                    <td className='account__table--body__child--items'>
                      <strong>Fulfillment Status</strong>
                      <span>{order?.order_status}</span>
                    </td>
                    <td className='account__table--body__child--items'>
                      <strong>Total</strong>
                      <span>
                        <GetCurrency price={order?.total} />
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Dropdown.Button
                        onClick={handleButtonClick}
                        overlay={() => menu(order)}
                      ></Dropdown.Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <InvoiceModal
        isVisible={isModalVisible}
        setVisible={setIsModalVisible}
        invoice={selectedInvoice}
        downloadInvoice={downloadInvoice}
        closeModal={() => {
          setSelectedInvoice();
          setIsModalVisible(false);
        }}
      />
      <div style={{ position: 'absolute', right: '100%' }}>
        <div ref={ref}>
          <PdfFormat invoice={pdfData} />
        </div>
      </div>
    </>
  );
};

export default Invoices;
