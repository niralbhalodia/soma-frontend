import React from 'react';
import Layout from '../components/Layout';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';

const StoreLocator = () => {
  const renderMarkers = (map, maps) => {
    let locations = [
      [
        '<h2>JAIPUR</h2><br> A 5 - Jamnalal Bajaj Marg,<br> C-Scheme Jaipur Rajasthan 302001 IN<br><br><h4>Phone:</h4> 0141 2372246 / +91 7300085474<br><br><h4>Opening Hours</h4>10:00 AM TO 8:00 PM<br> MONDAY TO SATURDAY<br><br><a class="price__filter--btn primary__btn" href="https://goo.gl/maps/9qAkCCf6RAT2XzYL7" target="_blank">Get Direction</a>',
        26.9087219,
        75.791504,
      ],

      [
        '<h2>DELHI</h2><br> K - 44, Connaught Place, First Floor,<br>Opposite Plaza PVR. New Delhi, 110001 IN<br><br><h4>Phone:</h4>01123412966 / +91 9116037904<br><br><h4>Opening Hours</h4>10:00 AM TO 8:00 PM<br> MONDAY TO SATURDAY<br><br><a class="price__filter--btn primary__btn" href="https://goo.gl/maps/hwMjxMNKNqUSA2bE7" target="_blank">Get Direction</a>',
        28.6351571,
        77.2200723,
      ],

      [
        '<h2>UDAIPUR</h2><br> Beside Hotel Mahendra Prakash,<br>Lake Palace Road Boheda Ki Bari,<br> Udaipur Rajasthan 313001 IN<br><br> <h4>Phone:</h4> 02942420475 / +91 9116669561<br><br><h4>Opening Hours</h4>10:00 AM TO 8:00 PM<br> MONDAY TO SATURDAY<br><br>\
        <a class="price__filter--btn primary__btn" href="https://goo.gl/maps/qfkR283JEwiPGfMf8" target="_blank">Get Direction</a>',
        24.5746093,
        73.6892419,
      ],

      [
        '<h2>HYDERABAD</h2><br> Plot No.217, on the junction of road 16 and 17,<br> Next to Bank of Baroda, Jawahar Colony,<br> Jublee Hills Hyderabad Telangana 500033 IN<br><br> <h4>Phone:</h4> 04023553110 <br><br><h4>Opening Hours</h4>10:00 AM TO 8:00 PM<br> MONDAY TO SATURDAY<br><br><a class="price__filter--btn primary__btn" href="https://goo.gl/maps/y53MiUs9AUb8rxF88" target="_blank">Get Direction</a>',
        17.4293147,
        78.4134733,
      ],

      [
        '<h2>BANGALORE</h2><br> 34/1, Pulikeshi Nagar, Promenade Road,<br> Ulsoor, Bangalore Karnataka 560046 IN<br><br> <h4>Phone:</h4> 08041235573 / +91 7300088097<br> <br><h4>Opening Hours</h4>10:00 AM TO 8:00 PM<br> MONDAY TO SATURDAY<br><br>  <a class="price__filter--btn primary__btn" href="https://goo.gl/maps/9FF1yYiHSB5Jabf19" target="_blank">Get Direction</a>',
        12.9885979,
        77.617393,
      ],
    ];

    var infowindow = new maps.InfoWindow({});
    var marker;

    locations.forEach((location, i) => {
      marker = new maps.Marker({
        position: new maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        title: locations[i][0],
      });
      maps.event.addListener(
        marker,
        'click',
        (function (marker, count) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i),
      );
    });
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
                  <span className='text-red'>Store Locator</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start contact map area */}
        <div className='contact__map--area section--padding pt-50'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-4'>
                <h2 className='widget__title h3'>STORE LIST</h2>
                <div className='single__widget price__filter widget__bg'>
                  <h2 className='widget__title h3'>JAIPUR</h2>
                  <div className='price__filter--form__inner mb-15 d-flex '>
                    <div className>
                      <label>
                        A 5 - Jamnalal Bajaj Marg, C-Scheme, Jaipur, Rajasthan, Zip Code: 302001, IN
                      </label>
                      <br />
                      <label>Phone: 0141 2372246 / +91 7300085474</label>
                    </div>
                  </div>
                  <a
                    className='price__filter--btn primary__btn'
                    href='https://goo.gl/maps/9qAkCCf6RAT2XzYL7'
                    target='_blank'
                  >
                    View Map
                  </a>
                </div>
                <div className='single__widget price__filter widget__bg'>
                  <h2 className='widget__title h3'>DELHI</h2>
                  <div className='price__filter--form__inner mb-15 d-flex '>
                    <div className>
                      <label>
                        K - 44, Connaught Place, First Floor,
                        <br />
                        Opposite Plaza PVR., New Delhi, Delhi, Zip Code: 110001, IN
                      </label>
                      <br />
                      <label>Phone: 01123412966 / +91 9116037904</label>
                    </div>
                  </div>
                  <a
                    className='price__filter--btn primary__btn'
                    href='https://goo.gl/maps/hwMjxMNKNqUSA2bE7'
                    target='_blank'
                  >
                    View Map
                  </a>
                </div>
                <div className='single__widget price__filter widget__bg'>
                  <h2 className='widget__title h3'>UDAIPUR</h2>
                  <div className='price__filter--form__inner mb-15 d-flex '>
                    <div className>
                      <label>
                        Lake Palace Road Boheda Ki Bari,, Udaipur, Rajasthan, Zip Code: 313001, IN
                      </label>
                      <br />
                      <label>Phone: 02942420475 / +91 9116669561</label>
                    </div>
                  </div>
                  <a
                    className='price__filter--btn primary__btn'
                    href='https://goo.gl/maps/qfkR283JEwiPGfMf8'
                    target='_blank'
                  >
                    View Map
                  </a>
                </div>
                <div className='single__widget price__filter widget__bg'>
                  <h2 className='widget__title h3'>HYDERABAD</h2>
                  <div className='price__filter--form__inner mb-15 d-flex '>
                    <div className>
                      <label>
                        Plot No.217, on the junction of road 16 and 17, Next to Bank of Baroda,
                        Jawahar Colony, Jublee Hills, Hyderabad, Telangana, Zip Code: 500033, IN
                      </label>
                      <br />
                      <label>Phone: 04023553110</label>
                    </div>
                  </div>
                  <a
                    className='price__filter--btn primary__btn'
                    href='https://goo.gl/maps/y53MiUs9AUb8rxF88'
                    target='_blank'
                  >
                    View Map
                  </a>
                </div>
                <div className='single__widget price__filter widget__bg'>
                  <h2 className='widget__title h3'>BANGALORE</h2>
                  <div className='price__filter--form__inner mb-15 d-flex '>
                    <div className>
                      <label>
                        34/1, Pulikeshi Nagar, Promenade Road, Ulsoor,, Bangalore, Karnataka, Zip
                        Code: 560046, IN
                      </label>
                      <br />
                      <label>Phone: 08041235573 / +91 7300088097</label>
                    </div>
                  </div>
                  <a
                    className='price__filter--btn primary__btn'
                    href='https://goo.gl/maps/9FF1yYiHSB5Jabf19'
                    target='_blank'
                  >
                    View Map
                  </a>
                </div>
              </div>
              <div className='col-lg-8'>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyCMnqc6uuuOvucvQuGBr_imswgCOBk038g' }}
                  defaultCenter={{
                    lat: 20.5937,
                    lng: 78.9629,
                  }}
                  defaultZoom={5.5}
                  onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                ></GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
        {/* End contact map area */}
      </main>
    </Layout>
  );
};

export default StoreLocator;
