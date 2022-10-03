import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/action/cart';
import { setWishList } from '../../../redux/action/wishlist';
import GetCurrency from '../currency/GetCurrency';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

const ProductModal = ({ isVisible, setVisible, product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [hasVariants, setHasVariants] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [hasCombination, setHasCombination] = useState(false);

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
      toast.remove();
      toast.error('This product is not available');
    } else toast.remove();
  };

  useEffect(() => {
    if (product?.is_variation_product === 'Yes') setHasVariants(true);
    if (selectedVariants.length === 0)
      // this function will call first time to select default variation
      handleSelectVariation();
  }, [product]);

  useEffect(() => {
    selectedVariants.length > 0 && getVariantCombination(selectedVariants);
  }, [selectedVariants]);

  return (
    <>
      {/* Quickview Wrapper */}
      <div
        className={cx('modal cutom-width', { 'is-visible': isVisible })}
        id='modal1'
        data-animation='slideInUp'
      >
        <div className='modal-dialog quickview__main--wrapper'>
          <header className='modal-header quickview__header'>
            <button
              className='close-modal quickview__close--btn'
              aria-label='close modal'
              onClick={() => setVisible(false)}
            >
              ✕
            </button>
          </header>
          <div
            className='quickview__inner'
            style={{ overflowY: 'auto', overflowX: 'hidden', height: '80vh' }}
          >
            <div className='row row-cols-lg-2 row-cols-md-2'>
              <div className='col'>
                <div className='quickview__product--media product__details--media'>
                  <ImageSlider gallery={product?.gallery} image={product?.image} />
                </div>
              </div>
              <div className='col'>
                <div className='quickview__info'>
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
                                product?.price
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
                          {product?.product_variations_combinations &&
                            hasCombination?.discount_price &&
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
                    <p
                      className='product__details--info__desc mb-30'
                      dangerouslySetInnerHTML={{ __html: product?.short_description }}
                    />
                    <div className='product__variant'>
                      {product?.attributes.length > 0 &&
                        product.attributes.map(({ attribute, attributes: values }) => (
                          <div className='product__variant--list mb-15'>
                            <fieldset className='variant__input--fieldset weight'>
                              <legend className='product__variant--title mb-8'>
                                {attribute.name} :
                              </legend>
                              {values?.length > 0 &&
                                values.map(({ attribute_value_id, attribute_value }, i) => (
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
                                ))}
                            </fieldset>
                          </div>
                        ))}
                      <div className='quickview__variant--list quantity d-flex align-items-center mb-15'>
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
                        <button
                          className={cx('primary__btn quickview__cart--btn', {
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
                      <div className='quickview__variant--list variant__wishlist mb-15'>
                        <a
                          className='variant__wishlist--icon'
                          href='#'
                          title='Add to wishlist'
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(setWishList(product?.id));
                          }}
                        >
                          <svg
                            className='quickview__variant--wishlist__svg'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 512 512'
                          >
                            <path
                              d='M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={32}
                            />
                          </svg>
                          Add to Wishlist
                        </a>
                      </div>
                    </div>
                    <div className='quickview__social d-flex align-items-center mb-15'>
                      <label className='quickview__social--title'>Social Share:</label>
                      <ul className='quickview__social--wrapper mt-0 d-flex'>
                        <li className='quickview__social--list'>
                          <FacebookShareButton
                            url={`${window.location.origin}/product?id=${product?.id}`}
                            className='Demo__some-network__share-button'
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                        </li>
                        <li className='quickview__social--list'>
                          <TwitterShareButton
                            title={product?.name || ''}
                            url={`${window.location.origin}/product?id=${product?.id}`}
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
                            href={`https://www.instagram.com/?url=${window.location.origin}/product?id=${product?.id}`}
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quickview Wrapper End */}
    </>
  );
};

const ImageSlider = ({ gallery, image }) => {
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
    <div className='custom-slider'>
      {gallery?.length > 0 ? (
        <>
          <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
            {gallery?.length > 0 &&
              gallery.map(({ image }) => {
                return (
                  <>
                    <div className='product__media--preview__items'>
                      <img
                        className='product__media--preview__items--img product_modal_slider_image'
                        src={image}
                        alt={image}
                      />
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
              {gallery.map(({ image }) => (
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
            <img className='product__media--preview__items--img' src={image} alt={image} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductModal;
