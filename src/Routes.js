import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import MyAccount from './pages/MyAccount';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';
import Faq from './pages/Faq';
import Blog from './pages/Blog';
import Compare from './pages/Compare';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Error from './pages/Error';
import CheckOut3 from './pages/CheckOut3';
import SignUp from './pages/SignUp';
import RouteScrollTop from './components/layout/RouteScrollTop';
import CheckOut1 from './pages/CheckOut1';
import { useSelector } from 'react-redux';
import CheckOut2 from './pages/CheckOut2';
import StoreLocator from './pages/StoreLocator';
import TermsAndConditions from './pages/TermsAndConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import TrackOrder from './pages/TrackOrder';
import BlogDetails from './pages/BlogDetails';
import PaymentSuccess from './pages/PaymentSuccess';

const AllRoutes = () => {
  return (
    <>
      <RouteScrollTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product' element={<ProductDetails />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/blogs' element={<Blog />} />
        <Route path='/blog' element={<BlogDetails />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='/track-order' element={<TrackOrder />} />

        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/store-locator' element={<StoreLocator />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/shipping-policy' element={<ShippingPolicy />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />

        <Route path='/error' element={<Error />} />
        <Route path='*' element={<Error />} />

        {/* Protected routes */}
        <Route
          path='/profile'
          element={
            <Protected>
              <MyAccount />
            </Protected>
          }
        />
        <Route
          path='/wishlist'
          element={
            <Protected>
              <Wishlist />
            </Protected>
          }
        />
        <Route
          path='/checkout'
          element={
            <Protected>
              <CheckOut1 />
            </Protected>
          }
        />
        <Route
          path='/payment'
          element={
            <Protected>
              <CheckOut2 />
            </Protected>
          }
        />
        <Route
          path='/order-success'
          element={
            <Protected>
              <CheckOut3 />
            </Protected>
          }
        />
        <Route
          path='/payment-success'
          element={
            <Protected>
              <PaymentSuccess />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};
export const Protected = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  if (!isLogin) {
    return <Navigate to='/login' state={{ fromCheckOut: true }} replace />;
  }
  return children;
};

export default AllRoutes;
