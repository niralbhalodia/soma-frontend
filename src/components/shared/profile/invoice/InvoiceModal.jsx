import React from 'react';
import { Table, Image, Modal } from 'antd';
import { Link } from 'react-router-dom';

const InvoiceModal = (props) => {
  const onCreate = () => {
    props.downloadInvoice(props.invoice);
  };

  const columns = [
    {
      title: 'Image',
      responsive: ['lg'],
      render: (data, record, id) => (
        <span key={id}>
          {record?.product?.image && <Image src={record?.product?.image} width={50} />}
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'product.name',
      key: 'product.name',
      render: (data, record, id) => {
        return (
          <Link to={`/product?id=${record?.product?.id}`}>
            <strong>
              {record?.product?.name || ''}
              <div>
                {record?.product_variations_combination?.product_variations_values?.length > 0 &&
                  record?.product_variations_combination?.product_variations_values.map(
                    ({ attribute, attribute_value: { attribute_value } }) => (
                      <>
                        <div>
                          {attribute?.name || ''}: {attribute_value}
                        </div>
                      </>
                    ),
                  )}
              </div>
            </strong>
          </Link>
        );
      },
    },

    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (data) => (
        <>
          {props.invoice?.currency_symbol || ''}
          {data}
        </>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (data, record, id) => (
        <strong>
          {props.invoice?.currency_symbol || ''}
          {record.qty * record.price}
        </strong>
      ),
    },
  ];
  return (
    <>
      <Modal
        width={700}
        title={`Ordered on ${props?.invoice?.order_date} | Order #${props?.invoice?.order_number}`}
        visible={props.isVisible}
        onOk={props.closeModal}
        onCancel={props.closeModal}
        footer={null}
      >
        <div>
          <div className='order_info'>
            <div className='order_info_left order_info_width'>
              <strong>Shipping Adress:</strong>
              <div>
                <ul>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.shipping_first_name} {props?.invoice?.shipping_last_name}
                    </span>
                  </li>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.shipping_street_address}
                    </span>
                  </li>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.shipping_city} - {props?.invoice?.shipping_postcode}
                    </span>
                  </li>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.shipping_state}
                    </span>
                  </li>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.shipping_country}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='order_info_middel order_info_width'>
              <strong>Billing Adress:</strong>
              <div>
                <ul>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.billing_first_name} {props?.invoice?.billing_last_name}
                    </span>
                  </li>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.billing_street_address}
                    </span>
                  </li>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.billing_city} - {props?.invoice?.billing_postcode}
                    </span>
                  </li>
                  <li>
                    <span class='customer__information--text'>{props?.invoice?.billing_state}</span>
                  </li>
                  <li>
                    <span class='customer__information--text'>
                      {props?.invoice?.billing_country}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='order_info_right order_info_width'>
              <strong>Payment Information :</strong>
              <div>Payment Type: {props?.invoice?.payment_type}</div>
              <div>Payment Status : {props?.invoice?.payment_status}</div>
              {props?.invoice?.order_note && <div><strong>Order note :</strong> <p>{props.invoice.order_note}</p></div>}
            </div>
          </div>
          <Table
            columns={columns}
            size='small'
            dataSource={props.invoice?.order_items}
            pagination={false}
          />
          <div className='order_total'>
            <strong>
              Total : {props.invoice?.currency_symbol || ''}
              {props.invoice?.total}
            </strong>{' '}
          </div>
        </div>
        <div>
          <button
            type='button'
            style={{ fontSize: '18px', marginTop: '20px' }}
            onClick={onCreate}
            className='center primary__btn border-radius-5'
          >
            Download
          </button>
        </div>
      </Modal>
    </>
  );
};

export default InvoiceModal;
