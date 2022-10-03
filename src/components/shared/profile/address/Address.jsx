import { Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { postData } from '../../../../utils/apiCall';
import AddressModal from './AddressModal';

const Address = () => {
  const [shippingAddress, setShippingAddress] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [countries, setCountries] = useState([]);
  const getAddress = async () => {
    const res = await postData('/address/getAddress');
    if (res.success === 1) {
      setShippingAddress(res.data);
    }
  };
  const deleteAddress = async (id) => {
    let params = new URLSearchParams();
    params.append('id', id);
    const res = await postData('/address/deleteAddress', params);
    if (res.success === 1) {
      getAddress();
    }
  };
  const getCountries = async () => {
    const res = await postData('/country/getCountry');
    if (res.success === 1) setCountries(res.data);
  };
  useEffect(() => {
    getAddress();
    getCountries();
  }, []);

  return (
    <>
      <div className='account__content'>
        <h3 className='account__content--title mb-20'>Addresses</h3>
        <button
          className='new__address--btn primary__btn mb-25'
          type='button'
          onClick={(e) => setIsModalVisible(true)}
        >
          Add a new address
        </button>
        {shippingAddress?.length > 0 &&
          shippingAddress.map(
            (
              {
                id,
                first_name,
                last_name,
                apartment,
                street_address,
                city,
                state,
                postcode,
                country,
                is_default,
              },
              index,
            ) => {
              return (
                <>
                  <div className='account__details two'>
                    {is_default === 'Yes' && <h4 className='account__details--title'>Default</h4>}
                    <p className='account__details--desc'>
                      {first_name} {last_name} <br /> {apartment} {street_address} <br /> {city}{' '}
                      {state} {postcode} <br /> {country}
                    </p>
                    {/* <a className='account__details--link' href='my-account-2.html'>
                    View Addresses (1)
                  </a> */}
                  </div>
                  <div className='account__details--footer d-flex'>
                    <button
                      className='account__details--footer__btn'
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedAddress({
                          id,
                          first_name,
                          last_name,
                          apartment,
                          street_address,
                          city,
                          state,
                          postcode,
                          country,
                          is_default,
                        });
                        setIsModalVisible(true);
                      }}
                    >
                      Edit
                    </button>
                    <Popconfirm
                      title='Are you sure to delete this address?'
                      onConfirm={() => deleteAddress(id)}
                      okText='Yes'
                      cancelText='No'
                    >
                      <button className='account__details--footer__btn' type='button'>
                        Delete
                      </button>
                    </Popconfirm>
                  </div>
                  <hr className='mt-30' />
                </>
              );
            },
          )}
      </div>

      <AddressModal
        isVisible={isModalVisible}
        setVisible={setIsModalVisible}
        address={selectedAddress}
        closeModal={() => {
          getAddress();
          setSelectedAddress();
          setIsModalVisible(false);
        }}
        countries={countries}
      />
    </>
  );
};

export default Address;
