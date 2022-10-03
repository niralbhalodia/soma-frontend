import React, { useEffect, useRef, useState } from 'react';
import { postData } from '../../../utils/apiCall';
import { useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import toast from 'react-hot-toast';
import moment from 'moment';

const ProductReview = ({ product_id }) => {
  const textAreaRef = useRef('textAreaRef');
  const [productReview, setProductReview] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const user = useSelector((state) => state.auth);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [ratingCount, setRatingCount] = useState(null);

  const readReviewStar = {
    size: 30,
    edit: false,
    isHalf: true,
  };

  const inputReviewStar = {
    size: 50,
    a11y: true,
    isHalf: true,
    onChange: (newValue) => {
      setRating(newValue);
      // console.log(`Example 2: new value is ${newValue}`);
    },
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (comment) {
      console.log({
        comment,
        rating,
      });
      const params = new URLSearchParams();
      params.append('product_id', product_id);
      params.append('comment', comment);
      params.append('rating', rating);
      const res = await postData('/products/review', params);
      if (res.success === 1) {
        toast.success('review posted successfuly!');
        getReviews();
      }
    } else {
      toast.remove();
      toast.error('please write comment!');
    }
  };
  const getReviews = async () => {
    const params = new URLSearchParams();
    params.append('product_id', product_id);
    params.append('user_id', user.id);
    const res = await postData('/products/getReviewlist', params);
    setProductReview(res?.data?.reviewData);
    setHasReviewed(res?.data?.UserReview ? true : false);
    setRatingCount(res?.data?.ratingCount);
  };

  useEffect(() => {
    if (product_id) getReviews();
  }, [product_id]);

  return (
    <>
      <div className='product__reviews'>
        <div className='product__reviews--header'>
          <h2 className='product__reviews--header__title h3 mb-20'>Customer Reviews {}</h2>
          {productReview?.length > 0 && (
            <div className='reviews__ratting d-flex align-items-center'>
              <ul className='rating d-flex'>
                <ReactStars {...readReviewStar} value={ratingCount?.totalRatingAvg || 0} />
              </ul>
              <span className='reviews__summary--caption'>
                Based on {ratingCount?.ratingCount || 0} reviews
              </span>
            </div>
          )}
          {user.isLogin && !hasReviewed && (
            <a
              className='actions__newreviews--btn primary__btn'
              href='#'
              onClick={(e) => {
                e.preventDefault();
                textAreaRef.current.focus();
              }}
            >
              Write A Review
            </a>
          )}
        </div>
        <div className='reviews__comment--area'>
          {productReview?.length > 0 &&
            productReview?.map((review, index) => (
              <div className='reviews__comment--list d-flex' key={index}>
                <div className='reviews__comment--thumb'>
                  <img src={review?.user?.image || 'assets/images/other/avatar.png'} alt='comment-thumb' />
                </div>
                <div className='reviews__comment--content'>
                  <div className='reviews__comment--top d-flex justify-content-between'>
                    <div className='reviews__comment--top__left'>
                      <h3 className='reviews__comment--content__title h4'>{review?.user?.name}</h3>
                      <ul className='rating reviews__comment--rating d-flex'>
                        <ReactStars {...readReviewStar} value={review?.rating} />
                      </ul>
                    </div>
                    <span className='reviews__comment--content__date'>
                      {moment(review?.created_at).format('LLLL')}
                    </span>
                  </div>
                  <p className='reviews__comment--content__desc'>{review?.comment}</p>
                </div>
              </div>
            ))}
        </div>
        {user.isLogin && !hasReviewed && (
          <div id='writereview' className='reviews__comment--reply__area'>
            <form action='#'>
              <h3 className='reviews__comment--reply__title mb-15'>Add a review </h3>
              <div className='reviews__ratting d-flex align-items-center mb-20'>
                <ul className='rating d-flex'>
                  <ReactStars {...inputReviewStar} value={rating} />
                </ul>
              </div>
              <div className='row'>
                <div className='col-12 mb-10'>
                  <textarea
                    ref={textAreaRef}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='reviews__comment--reply__textarea'
                    placeholder='Your Comments....'
                    defaultValue={''}
                  />
                </div>
                {/* <div className='col-lg-6 col-md-6 mb-15'>
                <label>
                  <input
                    className='reviews__comment--reply__input'
                    placeholder='Your Name....'
                    type='text'
                  />
                </label>
              </div>
              <div className='col-lg-6 col-md-6 mb-15'>
                <label>
                  <input
                    className='reviews__comment--reply__input'
                    placeholder='Your Email....'
                    type='email'
                  />
                </label>
              </div> */}
              </div>
              <button
                className='reviews__comment--btn text-white primary__btn'
                data-hover='Submit'
                type='submit'
                onClick={submitReview}
              >
                SUBMIT
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReview;
