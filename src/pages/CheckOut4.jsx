import React from 'react';
import Layout from '../components/Layout';

const CheckOut4 = () => {
  return (
    <Layout>
      <main className="main__content_wrapper">
        {/* Start breadcrumb section */}
        <section className="breadcrumb__section breadcrumb__bg">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content text-center">
                  <h1 className="breadcrumb__content--title text-white mb-25">Account</h1>
                  <ul className="breadcrumb__content--menu d-flex justify-content-center">
                    <li className="breadcrumb__content--menu__items">
                      <a className="text-white" href="index.html">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb__content--menu__items">
                      <span className="text-white">Account</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* my account section start */}
        <section className="my__account--section section--padding">
          <div className="container">
            <div className="my__account--section__inner">
              <div className="row">
                <div className="col-lg-9">
                  <div className="account__wrapper account__wrapper--style4 border-radius-10">
                    <div className="account__content">
                      <h2 className="account__content--title h3 mb-20">Orders History</h2>
                      <div className="account__table--area">
                        <table className="account__table">
                          <thead className="account__table--header">
                            <tr className="account__table--header__child">
                              <th className="account__table--header__child--items">Order</th>
                              <th className="account__table--header__child--items">Date</th>
                              <th className="account__table--header__child--items">
                                Payment Status
                              </th>
                              <th className="account__table--header__child--items">
                                Fulfillment Status
                              </th>
                              <th className="account__table--header__child--items">Total</th>
                            </tr>
                          </thead>
                          <tbody className="account__table--body mobile__none">
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">#2014</td>
                              <td className="account__table--body__child--items">
                                February 06, 2022
                              </td>
                              <td className="account__table--body__child--items">Paid</td>
                              <td className="account__table--body__child--items">Unfulfilled</td>
                              <td className="account__table--body__child--items">₹40.00 USD</td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">#2024</td>
                              <td className="account__table--body__child--items">
                                February 06, 2022
                              </td>
                              <td className="account__table--body__child--items">Paid</td>
                              <td className="account__table--body__child--items">Fulfilled</td>
                              <td className="account__table--body__child--items">₹44.00 USD</td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">#2164</td>
                              <td className="account__table--body__child--items">
                                February 06, 2022
                              </td>
                              <td className="account__table--body__child--items">Paid</td>
                              <td className="account__table--body__child--items">Unfulfilled</td>
                              <td className="account__table--body__child--items">₹36.00 USD</td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">#2345</td>
                              <td className="account__table--body__child--items">
                                February 06, 2022
                              </td>
                              <td className="account__table--body__child--items">Paid</td>
                              <td className="account__table--body__child--items">Unfulfilled</td>
                              <td className="account__table--body__child--items">₹87.00 USD</td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">#1244</td>
                              <td className="account__table--body__child--items">
                                February 06, 2022
                              </td>
                              <td className="account__table--body__child--items">Paid</td>
                              <td className="account__table--body__child--items">Fulfilled</td>
                              <td className="account__table--body__child--items">₹66.00 USD</td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">#3455</td>
                              <td className="account__table--body__child--items">
                                February 06, 2022
                              </td>
                              <td className="account__table--body__child--items">Paid</td>
                              <td className="account__table--body__child--items">Fulfilled</td>
                              <td className="account__table--body__child--items">₹55.00 USD</td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">#4566</td>
                              <td className="account__table--body__child--items">
                                February 06, 2022
                              </td>
                              <td className="account__table--body__child--items">Paid</td>
                              <td className="account__table--body__child--items">Unfulfilled</td>
                              <td className="account__table--body__child--items">₹87.00 USD</td>
                            </tr>
                          </tbody>
                          <tbody className="account__table--body mobile__block">
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">
                                <strong>Order</strong>
                                <span>#2014</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Date</strong>
                                <span>February 06, 2022</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Payment Status</strong>
                                <span>Paid</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Fulfillment Status</strong>
                                <span>Unfulfilled</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Total</strong>
                                <span>₹40.00 USD</span>
                              </td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">
                                <strong>Order</strong>
                                <span>#2014</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Date</strong>
                                <span>February 06, 2022</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Payment Status</strong>
                                <span>Paid</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Fulfillment Status</strong>
                                <span>Unfulfilled</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Total</strong>
                                <span>₹40.00 USD</span>
                              </td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">
                                <strong>Order</strong>
                                <span>#2014</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Date</strong>
                                <span>February 06, 2022</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Payment Status</strong>
                                <span>Paid</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Fulfillment Status</strong>
                                <span>Unfulfilled</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Total</strong>
                                <span>₹40.00 USD</span>
                              </td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">
                                <strong>Order</strong>
                                <span>#2014</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Date</strong>
                                <span>February 06, 2022</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Payment Status</strong>
                                <span>Paid</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Fulfillment Status</strong>
                                <span>Unfulfilled</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Total</strong>
                                <span>₹40.00 USD</span>
                              </td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">
                                <strong>Order</strong>
                                <span>#2014</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Date</strong>
                                <span>February 06, 2022</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Payment Status</strong>
                                <span>Paid</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Fulfillment Status</strong>
                                <span>Unfulfilled</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Total</strong>
                                <span>₹40.00 USD</span>
                              </td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">
                                <strong>Order</strong>
                                <span>#2014</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Date</strong>
                                <span>February 06, 2022</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Payment Status</strong>
                                <span>Paid</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Fulfillment Status</strong>
                                <span>Unfulfilled</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Total</strong>
                                <span>₹40.00 USD</span>
                              </td>
                            </tr>
                            <tr className="account__table--body__child">
                              <td className="account__table--body__child--items">
                                <strong>Order</strong>
                                <span>#2014</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Date</strong>
                                <span>February 06, 2022</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Payment Status</strong>
                                <span>Paid</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Fulfillment Status</strong>
                                <span>Unfulfilled</span>
                              </td>
                              <td className="account__table--body__child--items">
                                <strong>Total</strong>
                                <span>₹40.00 USD</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="account__details">
                    <h4 className="account__details--title">Account details</h4>
                    <p className="account__details--desc">
                      Admin <br /> Dhaka <br /> Dhaka 12119 <br /> Bangladesh
                    </p>
                    <a className="account__details--link" href="my-account-2.html">
                      View Addresses (1)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* my account section end */}
        {/* Start shipping section */}
        <section className="shipping__section2 shipping__style3 section--padding pt-0">
          <div className="container">
            <div className="shipping__section2--inner shipping__style3--inner d-flex justify-content-between">
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping1.png" alt />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">Shipping</h2>
                  <p className="shipping__items2--content__desc">From handpicked sellers</p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping2.png" alt />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">Payment</h2>
                  <p className="shipping__items2--content__desc">From handpicked sellers</p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping3.png" alt />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">Return</h2>
                  <p className="shipping__items2--content__desc">From handpicked sellers</p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping4.png" alt />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">Support</h2>
                  <p className="shipping__items2--content__desc">From handpicked sellers</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End shipping section */}
      </main>
    </Layout>
  );
};

export default CheckOut4;
