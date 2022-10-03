import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import ImageGalleryModal from '../components/common/ImageGalleryModal';
import NewArrivalCarousel from '../components/common/newArrivalCarousel';
import Layout from '../components/Layout';
import ProductReview from '../components/shared/product/ProductReview';
import SizeChart from '../components/shared/sizeChart/SizeChart';
import { addToCart } from '../redux/action/cart';
import { setWishList } from '../redux/action/wishlist';
import { postData } from '../utils/apiCall';
import ReactImageMagnify from 'react-image-magnify';
import GetCurrency from '../components/shared/currency/GetCurrency';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { Helmet } from 'react-helmet';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const [product, setProduct] = useState();
  const [qty, setQty] = useState(1);
  const [isVisible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [hasVariants, setHasVariants] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [hasCombination, setHasCombination] = useState(false);
  const [pinCode, setPinCode] = useState();
  const [codAvailability, setCodAvailability] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const params = new URLSearchParams();
      params.append('id', id);
      const res = await postData('/products/getProductById', params);
      setProduct(res.data);
    };
    if (id) getProduct();
  }, [id]);

  const handleQty = (val) => {
    if (val) {
      setQty(qty + 1);
    } else if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleSelectVariation = (attrId, valId) => {
    let newVariants = [...selectedVariants];
    if (!attrId && !valId) {
      if (product?.attributes?.length > 0) {
        product.attributes.forEach(({ attribute, attributes: values }) => {
          values?.length > 0 &&
            values.forEach(({ attribute_value_id }, i) => {
              if (i === 0) newVariants.push({ attribute_id: attribute.id, attribute_value_id });
            });
        });
        newVariants.sort((a, b) =>
          a.attribute_value_id > b.attribute_value_id
            ? 1
            : b.attribute_value_id > a.attribute_value_id
            ? -1
            : 0,
        );
        setSelectedVariants(newVariants);
      }
    } else {
      let findId = newVariants.find((variant) => variant.attribute_id === attrId);
      if (findId) {
        let variantIndex = newVariants.indexOf(findId);
        newVariants[variantIndex].attribute_value_id = valId;
        setSelectedVariants(newVariants);
      } else {
        newVariants = [
          ...newVariants,
          {
            attribute_id: attrId,
            attribute_value_id: valId,
          },
        ];
        newVariants.sort((a, b) =>
          a.attribute_value_id > b.attribute_value_id
            ? 1
            : b.attribute_value_id > a.attribute_value_id
            ? -1
            : 0,
        );
        setSelectedVariants(newVariants);
      }
    }
  };

  const checkCodAvailability = async () => {
    const params = new URLSearchParams();
    params.append('pinCode', pinCode);
    const res = await postData('/products/checkCODAvailability', params);
    console.log(res);
    if (res.data?.GetServicesforPincodeResult?.eTailCODAirInbound == 'Yes') {
      setCodAvailability(true);
    } else {
      setCodAvailability(false);
    }
  };

  const getVariantCombination = (variants) => {
    let allCombinations = product && [...product?.product_variations_combinations];
    let newCombinatins = [];
    allCombinations?.forEach((combination) => {
      newCombinatins.push({
        ...combination,
        matchIds: combination.product_variations_values.map(
          ({ attribute_id, attribute_value_id }) => ({
            attribute_id,
            attribute_value_id,
          }),
        ),
      });
    });
    newCombinatins = newCombinatins.find(
      (combination) =>
        JSON.stringify(
          combination.matchIds.sort((a, b) =>
            a.attribute_value_id > b.attribute_value_id
              ? 1
              : b.attribute_value_id > a.attribute_value_id
              ? -1
              : 0,
          ),
        ) === JSON.stringify(variants),
    );
    setHasCombination(newCombinatins);
    if (!newCombinatins) {
      toast.error('This product is not available');
    }
  };

  useEffect(() => {
    if (product?.is_variation_product === 'Yes') setHasVariants(true);
    if (selectedVariants.length === 0)
      // this function will call first time to select default variation
      handleSelectVariation();
    document.getElementsByTagName('meta')[4].setAttribute('content', product?.name || 'Soma');
    document.getElementsByTagName('meta')[5].setAttribute('content', product?.image || '');
  }, [product]);

  useEffect(() => {
    selectedVariants.length > 0 && getVariantCombination(selectedVariants);
  }, [selectedVariants]);

  return (
    <Layout>
      <Helmet>
        <title>{product?.name || 'Soma'}</title>
      </Helmet>
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
                {product?.category?.id && (
                  <li className='breadcrumb__content--menu__items'>
                    <Link className='text-red' to={`/shop?catId=${product.category.id}`}>
                      {product.category.name}
                    </Link>
                  </li>
                )}
                {product?.name && (
                  <li className='breadcrumb__content--menu__items'>
                    <span className='text-red'>{product.name}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start product details section */}
        <section className='product__details--section section--padding'>
          <div className='container'>
            <div className='row row-cols-1 row-cols-lg-2 row-cols-md-2'>
              <div className='col'>
                <div className='product__details--media'>
                  <ImageSlider
                    gallery={product?.gallery}
                    image={product?.image}
                    setCurrentImage={setCurrentImage}
                    setImageModalVisible={setImageModalVisible}
                  />
                </div>
              </div>
              <div className='col'>
                <div className='product__details--info'>
                  <form action='#'>
                    <h2 className='product__details--info__title mb-15'>{product?.name || ''}</h2>
                    <div className='product__details--info__price mb-10'>
                      {product?.is_variation_product === 'No' && (
                        <>
                          <span className='current__price'>
                            <GetCurrency
                              price={
                                hasCombination?.discount_price ||
                                hasCombination?.price ||
                                product?.price ||
                                ''
                              }
                            />
                          </span>
                          {product?.old_price > 0 && product?.price != product?.old_price && (
                            <>
                              <span className='price__divided' />
                              <span className='old__price'>
                                <GetCurrency price={product.old_price} />
                              </span>
                            </>
                          )}
                        </>
                      )}

                      {product?.is_variation_product === 'Yes' && (
                        <>
                          <span className='current__price'>
                            <GetCurrency
                              price={
                                hasCombination?.discount_price ||
                                hasCombination?.price ||
                                product.price
                              }
                            />
                          </span>
                          {hasCombination?.discount_price &&
                            hasCombination?.price != hasCombination?.discount_price && (
                              <>
                                <span className='price__divided' />
                                <span className='old__price'>
                                  <GetCurrency price={hasCombination?.price} />
                                </span>
                              </>
                            )}
                        </>
                      )}
                    </div>
                    <p className='product__details--info__desc mb-15'>
                      <div dangerouslySetInnerHTML={{ __html: product?.short_description || '' }} />
                    </p>
                    <div className='product__variant'>
                      {product?.attributes.length > 0 &&
                        product.attributes.map(({ attribute, attributes: values }) => (
                          <div className='product__variant--list mb-15'>
                            <fieldset className='variant__input--fieldset weight'>
                              <legend className='product__variant--title mb-8'>
                                {attribute.name} :
                              </legend>
                              {values?.length > 0 &&
                                values.map(({ attribute_value_id, attribute_value }, i) => {
                                  return (
                                    <>
                                      <input
                                        id={`${attribute.name}-${attribute_value?.id}`}
                                        name={attribute.id}
                                        type='radio'
                                        onChange={(e) =>
                                          handleSelectVariation(attribute.id, attribute_value_id)
                                        }
                                        defaultChecked={i === 0}
                                      />
                                      <label
                                        className='variant__size--value red'
                                        htmlFor={`${attribute.name}-${attribute_value?.id}`}
                                      >
                                        {attribute_value?.attribute_value}
                                      </label>
                                    </>
                                  );
                                })}
                            </fieldset>
                          </div>
                        ))}
                      {product?.size_chart && (
                        <div className='mb-20'>
                          <a
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              setVisible(true);
                            }}
                          >
                            <span>
                              Size Chart{' '}
                              <img
                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzOCIgaGVpZ2h0PSIxMiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMyODc0RjAiIHN0cm9rZS13aWR0aD0iMS4zIj48cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0zNy4zNS42NUguNjV2MTAuN2gzNi43Vi42NXoiLz48cGF0aCBmaWxsPSIjODc4Nzg3IiBkPSJNNi42NSA4LjY1aDF2Mi43aC0xem00LTNIMTFsLS4zNS0uMzVWNWwtLjE1LjE1LS4xNS0uMTV2LjNsLS4zNS4zNWguMzV2NS43SDEwbC4zNS4zNXYuM2wuMTUtLjE1LjE1LjE1di0uM2wuMzUtLjM1aC0uMzV2LTUuN3ptNSAzSDE2bC0uMzUtLjM1VjhsLS4xNS4xNS0uMTUtLjE1di4zbC0uMzUuMzVoLjM1djIuN0gxNWwuMzUuMzV2LjNsLjE1LS4xNS4xNS4xNXYtLjNsLjM1LS4zNWgtLjM1di0yLjd6bTQtM2gxdjUuN2gtMXptNCAzaDF2Mi43aC0xem05IDBoMXYyLjdoLTF6bS00LTNoMXY1LjdoLTF6Ii8+PC9nPjwvc3ZnPg=='
                                className='VgkY_D'
                              />
                            </span>
                          </a>
                          <SizeChart
                            size_chart={product?.size_chart}
                            size_chart_image={product?.size_chart_image}
                            isVisible={isVisible}
                            setVisible={setVisible}
                          />
                        </div>
                      )}{' '}
                      <div className='product__variant--list quantity d-flex align-items-center mb-20'>
                        <div className='quantity__box'>
                          <button
                            type='button'
                            className={cx('quantity__value quickview__value--quantity decrease', {
                              disabled: qty === 1,
                            })}
                            aria-label='quantity value'
                            value='Decrease Value'
                            onClick={(e) => {
                              e.preventDefault();
                              handleQty();
                            }}
                          >
                            -
                          </button>
                          <label>
                            <input
                              type='number'
                              className='quantity__number quickview__value--number'
                              value={qty}
                              readOnly
                            />
                          </label>
                          <button
                            type='button'
                            className='quantity__value quickview__value--quantity increase'
                            aria-label='quantity value'
                            value='Increase Value'
                            onClick={(e) => {
                              e.preventDefault();
                              handleQty(true);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className='product__variant--list mb-15'>
                        <button
                          className={cx('quickview__cart--btn primary__btn1', {
                            disabled: hasVariants && !hasCombination,
                          })}
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(
                              addToCart(
                                {
                                  ...product,
                                  price:
                                    hasCombination?.discount_price ||
                                    hasCombination?.price ||
                                    product?.price,
                                  hasCombination,
                                },
                                qty,
                              ),
                            );
                            setQty(1);
                            navigate('/checkout');
                          }}
                          disabled={hasVariants && !hasCombination}
                        >
                          Buy it now
                        </button>
                      </div>
                      <div className='product__variant--list mb-15'>
                        <button
                          className={cx('quickview__cart--btn primary__btn1', {
                            disabled: hasVariants && !hasCombination,
                          })}
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(
                              addToCart(
                                {
                                  ...product,
                                  price:
                                    hasCombination?.discount_price ||
                                    hasCombination?.price ||
                                    product?.price,
                                  hasCombination,
                                },
                                qty,
                              ),
                            );
                            setQty(1);
                          }}
                          disabled={hasVariants && !hasCombination}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className='product__variant--list mb-15'>
                        <button
                          className='quickview__cart--btn primary__btn1'
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(setWishList(product?.id));
                          }}
                        >
                          Add To Wishlist
                        </button>
                        {/* </div>

                      <div className="product__variant--list mb-15">
                          <a className="variant__wishlist--icon mb-15" href="wishlist.html" title="Add to wishlist">
                              <svg className="quickview__variant--wishlist__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>                                            Add to Wishlist</a>

                      </div> */}
                        <div className='product__details--info__meta'>
                          <p className='product__details--info__meta--list pt-20'>
                            <strong>Sku:</strong>{' '}
                            <span>{hasCombination?.sku || product?.sku || ''}</span>{' '}
                          </p>
                          <p className='product__details--info__meta--list'>
                            <strong>Category:</strong> <span>{product?.category?.name || ''}</span>{' '}
                          </p>
                        </div>
                      </div>
                      <div className='mb-15 row align-items-center'>
                        <div className='col-lg-8 checkout__input--list'>
                          <label className='product__details--info__meta--list'>
                            <span>Check COD availability</span>
                          </label>
                          <div className='row align-items-center'>
                            <div className='col-8 col-lg-8'>
                              <input
                                name='trackingId'
                                className='checkout__input--field border-radius-5'
                                placeholder='Enter Pincode...'
                                type='text'
                                onChange={(e) => setPinCode(e.target.value)}
                              />
                            </div>
                            <div className='col-4 col-lg-4 p-0'>
                              <button
                                type='button'
                                onClick={checkCodAvailability}
                                className='center primary__btn border-radius-5'
                              >
                                Check
                              </button>
                            </div>
                          </div>
                          {codAvailability != null && (
                            <p style={{ color: codAvailability ? 'green' : 'red' }}>
                              {codAvailability ? 'COD is Available' : 'Cod is Not Available'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='quickview__social d-flex align-items-center mb-15'>
                        <label className='quickview__social--title'>Social Share:</label>
                        <ul className='quickview__social--wrapper mt-0 d-flex'>
                          <li className='quickview__social--list'>
                            <FacebookShareButton
                              url={window.location.href}
                              className='Demo__some-network__share-button'
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>
                          </li>
                          <li className='quickview__social--list'>
                            <TwitterShareButton
                              title={product?.name || ''}
                              url={window.location.href}
                              hashtags={[product?.name, product?.category?.name]}
                            >
                              <TwitterIcon size={32} round />
                            </TwitterShareButton>
                          </li>
                          <li className='quickview__social--list'>
                            <a
                              className='quickview__social--icon'
                              target='_blank'
                              rel='noreferrer'
                              href={`https://www.instagram.com/?url=${window.location.href}`}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16.497'
                                height='16.492'
                                viewBox='0 0 19.497 19.492'
                              >
                                <path
                                  data-name='Icon awesome-instagram'
                                  d='M9.747,6.24a5,5,0,1,0,5,5A4.99,4.99,0,0,0,9.747,6.24Zm0,8.247A3.249,3.249,0,1,1,13,11.238a3.255,3.255,0,0,1-3.249,3.249Zm6.368-8.451A1.166,1.166,0,1,1,14.949,4.87,1.163,1.163,0,0,1,16.115,6.036Zm3.31,1.183A5.769,5.769,0,0,0,17.85,3.135,5.807,5.807,0,0,0,13.766,1.56c-1.609-.091-6.433-.091-8.042,0A5.8,5.8,0,0,0,1.64,3.13,5.788,5.788,0,0,0,.065,7.215c-.091,1.609-.091,6.433,0,8.042A5.769,5.769,0,0,0,1.64,19.341a5.814,5.814,0,0,0,4.084,1.575c1.609.091,6.433.091,8.042,0a5.769,5.769,0,0,0,4.084-1.575,5.807,5.807,0,0,0,1.575-4.084c.091-1.609.091-6.429,0-8.038Zm-2.079,9.765a3.289,3.289,0,0,1-1.853,1.853c-1.283.509-4.328.391-5.746.391S5.28,19.341,4,18.837a3.289,3.289,0,0,1-1.853-1.853c-.509-1.283-.391-4.328-.391-5.746s-.113-4.467.391-5.746A3.289,3.289,0,0,1,4,3.639c1.283-.509,4.328-.391,5.746-.391s4.467-.113,5.746.391a3.289,3.289,0,0,1,1.853,1.853c.509,1.283.391,4.328.391,5.746S17.855,15.705,17.346,16.984Z'
                                  transform='translate(0.004 -1.492)'
                                  fill='currentColor'
                                />
                              </svg>
                              <span className='visually-hidden'>Instagram</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className='guarantee__safe--checkout'>
                        <h5 className='guarantee__safe--checkout__title'>
                          Guaranteed Safe Checkout
                        </h5>
                        <img
                          className='guarantee__safe--checkout__img'
                          src='assets/images/other/safe-checkout.png'
                          alt='Payment'
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End product details section */}
        {/* Start product details tab section */}
        <section className='product__details--tab__section section--padding'>
          <div className='container'>
            <div className='row row-cols-1'>
              <div className='col'>
                <ul className='product__details--tab d-flex mb-30'>
                  <li
                    className={cx('product__details--tab__list', { active: currentTab === 1 })}
                    data-toggle='tab'
                    data-target='#description'
                    onClick={() => setCurrentTab(1)}
                  >
                    Description
                  </li>
                  {/* <li
                    className={cx('product__details--tab__list', { active: currentTab === 2 })}
                    data-toggle='tab'
                    data-target='#additionalInfo'
                    onClick={() => setCurrentTab(2)}
                  >
                    Additional Information
                  </li> */}
                  <li
                    className={cx('product__details--tab__list', { active: currentTab === 3 })}
                    data-toggle='tab'
                    data-target='#reviews'
                    onClick={() => setCurrentTab(3)}
                  >
                    Product Reviews
                  </li>
                </ul>
                <div className='product__details--tab__inner border-radius-10'>
                  <div className='tab_content'>
                    <div
                      id='description'
                      className={cx('tab_pane', { 'active show': currentTab === 1 })}
                    >
                      <div className='product__tab--content'>
                        <div className='product__tab--content__step mb-30'>
                          <h2 className='product__tab--content__title h4 mb-10'>{product?.name}</h2>
                          <p className='product__tab--content__desc'>
                            <div dangerouslySetInnerHTML={{ __html: product?.description || '' }} />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      id='additionalInfo'
                      className={cx('tab_pane', { 'active show': currentTab === 2 })}
                    >
                      <div className='product__tab--content'>
                        <div className='product__tab--content__step mb-30'>
                          {product?.weight ? (
                            <div className='mb-20'>
                              <span>
                                <strong>Dimensions</strong>
                              </span>
                              {product?.weight && (
                                <p className='mb-5'>Weight : {product?.weight} gm</p>
                              )}
                              {product?.length && (
                                <p className='mb-5'>Length : {product?.length} cm</p>
                              )}
                              {product?.width && (
                                <p className='mb-5'>Width : {product?.width} cm</p>
                              )}
                              {product?.height && (
                                <p className='mb-5'>Height : {product?.height} cm</p>
                              )}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      id='reviews'
                      className={cx('tab_pane', { 'active show': currentTab === 3 })}
                    >
                      <ProductReview product_id={id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NewArrivalCarousel title='You may also like' />
        </section>
        {/* End product details tab section */}
      </main>
      <ImageGalleryModal
        currentImage={currentImage}
        gallery={product?.gallery}
        isVisible={isImageModalVisible}
        setVisible={setImageModalVisible}
      />
    </Layout>
  );
};

const ImageSlider = ({ gallery, image, setCurrentImage, setImageModalVisible }) => {
  const customeSlider = React.createRef();

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const gotoNext = () => {
    nav2.slickNext();
  };

  const gotoPrev = () => {
    nav2.slickPrev();
  };

  const settings = {
    // customPaging: function (i) {
    //   return (
    //     <div className='product__media--nav__items'>
    //       <img
    //         className='product__media--nav__items--img product_detail_nav_image'
    //         src={gallery[i]?.image}
    //         alt='product-nav-img'
    //       />
    //     </div>
    //   );
    // },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  // const gotoNext = () => {
  //   customeSlider.current.slickNext();
  // };

  // const gotoPrev = () => {
  //   customeSlider.current.slickPrev();
  // };
  return (
    <section>
      <div className='custom-slider' style={{ position: 'relative' }}>
        <div
          id='portal'
          className='portal'
          style={{ position: 'absolute', top: '0', left: '100%' }}
        />

        {gallery?.length > 0 ? (
          <>
            <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
              {gallery.map(({ image }) => {
                return (
                  <>
                    <div
                      className='product__media--preview__items'
                      onClick={() => {
                        setCurrentImage(image);
                        setImageModalVisible(true);
                      }}
                    >
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: 'Wristwatch by Versace',
                            isFluidWidth: true,
                            src: `${image}`,
                            // srcSet: src.srcSet,
                            sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                          },
                          largeImage: {
                            src: `${image}`,
                            width: 1440,
                            height: 1800,
                          },
                          lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                          enlargedImagePortalId: 'portal',
                          enlargedImageContainerDimensions: {
                            width: '220%',
                            height: '100%',
                          },
                          // isHintEnabled: true,
                          // shouldHideHintAfterFirstActivation: true,
                          // enlargedImageContainerDimensions: {
                          //   width: '100%',
                          //   height: '100%',
                          // },
                          // enlargedImagePosition: 'beside',
                        }}
                      />
                      <div className='product__media--view__icon'></div>
                      <div className='product__media--view__icon'>
                        <a
                          className='product__media--view__icon--link glightbox cursor_poiner'
                          data-gallery='product-media-preview'
                        >
                          <svg
                            class='product__media--view__icon--svg'
                            xmlns='http://www.w3.org/2000/svg'
                            width='22.51'
                            height='22.443'
                            viewBox='0 0 512 512'
                          >
                            <path
                              d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
                              fill='none'
                              stroke='currentColor'
                              stroke-miterlimit='10'
                              stroke-width='32'
                            ></path>
                            <path
                              fill='none'
                              stroke='currentColor'
                              stroke-linecap='round'
                              stroke-miterlimit='10'
                              stroke-width='32'
                              d='M338.29 338.29L448 448'
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </>
                );
              })}
            </Slider>
            <div className='product-gallery product__media--nav react-slick-slider'>
              <Slider
                asNavFor={nav1}
                ref={(slider2) => setNav2(slider2)}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                infinite={gallery?.length > 3}
              >
                {gallery?.length > 1 &&
                  gallery.map(({ image }) => (
                    <div className='product__media--nav__items'>
                      <img
                        className='product__media--nav__items--img product_detail_nav_image'
                        src={image}
                        alt='product-nav-img'
                      />
                    </div>
                  ))}
              </Slider>
              <div
                className='slider-prev-button'
                style={{ top: '40%', visibility: gallery?.length > 3 ? 'visible' : 'hidden' }}
                onClick={() => gotoPrev()}
              ></div>
              <div
                className='slider-next-button'
                style={{ top: '40%', visibility: gallery?.length > 3 ? 'visible' : 'hidden' }}
                onClick={() => gotoNext()}
              ></div>
            </div>
          </>
        ) : (
          <>
            <div className='product__media--preview__items'>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Wristwatch by Versace',
                    isFluidWidth: true,
                    src: `${image}`,
                    // srcSet: src.srcSet,
                    // sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                  },
                  largeImage: {
                    src: `${image}`,
                    width: 1440,
                    height: 1800,
                  },
                  lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                  enlargedImagePortalId: 'portal',
                  enlargedImageContainerDimensions: {
                    width: '220%',
                    height: '100%',
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
