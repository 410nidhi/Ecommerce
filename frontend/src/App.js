import "./App.css";
import Header from "./component/layout/header/Header";
import Footer from "./component/layout/footer/Footer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import WebFont from "webfontloader";
import Home from "./component/home/Home.js"
import ProductDetails from "./component/product/ProductDetails"
import Products from "./component/product/Products";
import LoginSignUp from "./component/user/LoginSignUp";
import store from "./store"
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/header/UserOptions";
import { useSelector } from "react-redux";

function App() {

  const {isAuthenticated, user} = useSelector(state=> state.user)

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
  },[])

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user}/>}

      <Routes>
        <Route exact="true" path="/" element={<Home/>} />
        <Route exact="true" path="/product/:id" element={<ProductDetails/>} />
        <Route exact="true" path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route exact="true" path="/login" element={<LoginSignUp/>} />
        {/* <Route exact="true" path="/password/forgot" element={<Home/>} /> */}
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;