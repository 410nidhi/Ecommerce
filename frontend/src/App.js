import "./App.css";
import Header from "./component/layout/header/Header";
import Footer from "./component/layout/footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import WebFont from "webfontloader";
import Home from "./component/home/Home.js";
import ProductDetails from "./component/product/ProductDetails";
import Products from "./component/product/Products";
import LoginSignUp from "./component/user/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/user/Profile";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/OrderSuccess";
import MyOrders from "./component/order/MyOrders";
import OrderDetails from "./component/order/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UserList from "./component/admin/UserList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import NotFound from "./component/layout/notFoundPage/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapiKey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact="true" path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route exact="true" path="/product/:id" element={<ProductDetails />} />
        <Route exact="true" path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact="true" path="/login" element={<LoginSignUp />} />
        <Route exact="true" path="/account" element={<Profile />} />
        <Route exact="true" path="/me/update" element={<UpdateProfile />} />
        <Route
          exact="true"
          path="/password/update"
          element={<UpdatePassword />}
        />
        <Route
          exact="true"
          path="/password/forgot"
          element={<ForgotPassword />}
        />
        <Route
          exact="true"
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact="true" path="/cart" element={<Cart />} />
        <Route exact="true" path="/login/shipping" element={<Shipping />} />
        <Route exact="true" path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact="true" path="/success" element={<OrderSuccess />} />
        <Route exact="true" path="/orders" element={<MyOrders />} />
        <Route exact="true" path="/order/:id" element={<OrderDetails />} />

        <Route exact="true" path="/admin/dashboard" element={<Dashboard />} />
        <Route exact="true" path="/admin/products" element={<ProductList />} />
        <Route exact="true" path="/admin/product" element={<NewProduct />} />
        <Route
          exact="true"
          path="/admin/product/:id"
          element={<UpdateProduct />}
        />
        <Route exact="true" path="/admin/orders" element={<OrderList />} />
        <Route
          exact="true"
          path="/admin/order/:id"
          element={<ProcessOrder />}
        />
        <Route exact="true" path="/admin/users" element={<UserList />} />
        <Route exact="true" path="/admin/user/:id" element={<UpdateUser />} />
        <Route
          exact="true"
          path="/admin/reviews"
          element={<ProductReviews />}
        />

        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
