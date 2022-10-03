import React from 'react';
import { Link } from 'react-router-dom';

const PdfFormat = ({ invoice }) => {
  let srNo = 0;

  return (
    <>
      <div className='invoice_download'>
        <div className='invoice_download_header'>
          <h1>Soma Block Prints Pvt. Ltd.</h1>
          <p>Some House, 2-B, Girnar Extn.,</p>
          <p>Near singh bhoomi, Khatipura</p>
          <p>Jaipur - 302012, &#123; Rajsthan &#125;</p>
          <p>Phone No. 0141-235112; Email : office@somashop.com</p>
          <p>GSTIN : 08AACCS4392Q1ZM</p>
        </div>
        <div className='invoice_download_TAX'>
          <h1>TAX INVOICE</h1>
          <div className='invoice_download_TAX_content'>
            <div>
              <tr>
                <td>Reverse Charge</td>
                <td></td>
              </tr>
              <tr>
                <td>State</td>
                <td></td>
              </tr>
              <tr>
                <td>State Code</td>
                <td style={{ fontSize: '9px' }}>ORDER NO-2022001661 PAYMENT MODE - CCAVENUE</td>
              </tr>
              <tr>
                <td>Invoice No</td>
                <td>
                  <strong>RJONL22230001</strong>
                </td>
              </tr>
              <tr>
                <td>Invoice Date</td>
                <td>
                  <strong>01/04/2022</strong>
                </td>
              </tr>
            </div>
            <div>
              <tr>
                <td>
                  <strong>Transporter Mode</strong>{' '}
                </td>
                <td>
                  <strong>Courrier </strong>Vehicle no.
                </td>
              </tr>
              <tr>
                <td>Name of Carriers </td>
                <td> BLUE DART</td>
              </tr>
              <tr>
                <td>Date and Time of issue of invoice</td>
                <td>01/04/2022</td>
              </tr>
              <tr>
                <td>Date and Time of removal of Goods</td>
                <td>
                  <strong></strong>
                </td>
              </tr>
              <tr>
                <td>Place of Supply</td>
                <td>
                  <strong>Jaipur</strong>
                </td>
              </tr>
            </div>
            <div>
              <p>
                <strong>DETAILS OF RECEIVER / BILL TO</strong> GSTIN :
              </p>
              <div>
                <tr>
                  <td>Name </td>
                  <td> Ms. Seetha Dhruva</td>
                </tr>
                <tr>
                  <td>Adress</td>
                  <td>
                    New no 52, old No. 113, CHAMIERS ROAD, NANDANAM, Independent House Chennai ,
                    Tamil Nadu, 600035
                  </td>
                </tr>
                <tr>
                  <td>STATE</td>
                  <td>
                    Tamil Nadu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATE
                    CODE:
                  </td>
                </tr>
              </div>
            </div>
            <div>
              <p>
                <strong>DETAILS OF CONSIGNEE / SHIPPED TO</strong> GSTIN :
              </p>
              <div>
                <tr>
                  <td>Name </td>
                  <td> Ms. Seetha Dhruva</td>
                </tr>
                <tr>
                  <td>Adress</td>
                  <td>
                    New no 52, old No. 113, CHAMIERS ROAD, NANDANAM, Independent House Chennai ,
                    Tamil Nadu, 600035
                  </td>
                </tr>
                <tr>
                  <td>STATE</td>
                  <td>
                    Tamil Nadu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATE
                    CODE :
                  </td>
                </tr>
              </div>
            </div>{' '}
          </div>
        </div>
        <div className='invoice_download_pdf'>
          <table>
            <tr
              style={{
                display: 'grid',
                fontSize: '6pt',
                gridTemplateColumns: '25px 150px 35px 30px 25px repeat(4,30px) repeat(3,60px) 30px',
              }}
            >
              <th>S. No.</th>
              <th>Description and Specification of goods</th>
              <th>HSN/ SAC</th>
              <th>UOM</th>
              <th>Qty.</th>
              <th>Rate</th>
              <th>Gross Value</th>
              <th>Less Discount</th>
              <th>Net Taxable</th>
              <th colSpan={2}>Central GST</th>
              <th colSpan={2}>State/Union GST</th>
              <th colSpan={2}>Integrated GST</th>
              <th>Total</th>
            </tr>
            <tr
              style={{
                display: 'grid',
                fontSize: '6px',
                gridTemplateColumns: '25px 150px 35px 30px 25px repeat(11,30px)',
              }}
            >
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Value</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Amount</th>
              <th></th>
            </tr>
            {invoice?.order_items?.length > 0 &&
              invoice?.order_items.map((item, index) => (
                <tr
                  style={{
                    display: 'grid',
                    fontSize: '4px !important',
                    gridTemplateColumns: '25px 150px 35px 30px 25px repeat(11,30px)',
                  }}
                >
                  <td>{srNo + 1}</td>
                  <td>{item?.product?.name}</td>
                  <td>630492</td>
                  <td>Pieces</td>
                  <td>{item?.qty}</td>
                  <td>{item?.price}</td>
                  <td>{item?.price * item?.qty}</td>
                  <td>0.00</td>
                  <td>{item?.price * item?.qty}</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>{item?.price * item?.qty}</td>
                </tr>
              ))}
            <tr
              style={{
                display: 'grid',
                fontSize: '4px !important',
                gridTemplateColumns: '25px 215px 25px repeat(11,30px)',
              }}
            >
              <td></td>
              <td colSpan={3}>TOTAL</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <div
            style={{
              display: 'grid',
              fontSize: '6px',
              gridTemplateColumns: '25px 100px 50px 35px 30px 25px repeat(3,30px) 90px 90px 60px',
            }}
          >
            <div style={{ gridColumn: '1 / 11', gridRow: '1 / 3' }}>
              Amount in Words: Rs. one hundrade
            </div>
            <div>Shipping and Handling Charges</div>
            <div>142.48</div>
            <div>Total amount before tax</div>
            <div>9999</div>
          </div>

          <div
            style={{
              display: 'grid',
              fontSize: '6px',
              gridTemplateColumns: '25px 100px 50px 35px 30px 25px repeat(3,30px) 90px 90px 60px',
              gridAutoRows: '1fr',
            }}
          >
            <div
              className='border_childs'
              style={{
                gridColumn: '1 / 10',
                gridRow: '1 / 8',
                display: 'grid',
                fontSize: '6px',
                gridTemplateColumns: '25px 100px 50px 35px 30px 25px repeat(3,30px)',
              }}
            >
              <div className='border_none' style={{ gridRow: '1 / 7', gridColumn: '1 / 3' }}></div>

              <div>Shipping Charges</div>
              <div style={{ gridColumn: '4 / 6' }}>CGST</div>
              <div style={{ gridColumn: '6 / 8' }}>SGST</div>
              <div style={{ gridColumn: '8 / 10' }}>IGST</div>

              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>

              <div></div>
              <div style={{ gridColumn: '4 / 6' }}>CGST</div>
              <div style={{ gridColumn: '6 / 8' }}>SGST</div>
              <div style={{ gridColumn: '8 / 10' }}>IGST</div>

              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>

              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>

              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>
              <div>0.00</div>

              <div className='border_none'></div>
              <div>Total</div>
              <div>0.00</div>
              <div></div>
              <div>0.00</div>
              <div></div>
              <div>0.00</div>
              <div></div>
              <div>0.00</div>
            </div>
            <div className='border' style={{ gridColumn: '10 / 11', gridRow: '1 / 5' }}></div>

            <div className='border' style={{ gridColumn: '10 / 11', gridRow: '5 / 16' }}>
              <div style={{ position: 'absolute', bottom: '0' }}>common Seal</div>
            </div>

            <div
              className='border_childs'
              style={{
                gridColumn: '11 / 13',
                gridRow: '1 / 7',
                display: 'grid',
                fontSize: '6px',
                gridTemplateColumns: '90px 60px',
                gridAutoRows: '1fr',
              }}
            >
              <div>Add: CGST Amount</div>
              <div>0.00</div>

              <div>Add: SGST Amount</div>
              <div>0.00</div>

              <div>Add: IGST Amount</div>
              <div>0.00</div>

              <div>Tax Amount : GST </div>
              <div>0.00</div>

              <div>Net Payable Amount</div>
              <div>0.00</div>

              <div></div>
              <div></div>
            </div>

            <div style={{ gridColumn: '2 / 5', gridRow: '13 / 14' }}>Declaration</div>

            <div style={{ gridColumn: '2 / 10', gridRow: '14 / 15' }}>
              *TAX UNDER RCM IS NOT PAYABLE FOR AFORSAID TRANSACTIONS.
            </div>

            <div style={{ gridColumn: '11 / 13', gridRow: '7 / 8' }}>
              Certified that particulars given above are true and correct
            </div>

            <div style={{ gridColumn: '11 / 13', gridRow: '8 / 9' }}>
              For Soma blocks print Pvt. Ltd.
            </div>

            <div style={{ gridColumn: '11 / 13', gridRow: '15 / 16' }}>
              Authorised Signatory
              <div style={{ position: 'absolute', bottom: '0', right: '5px' }}>E. & O.E.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfFormat;
