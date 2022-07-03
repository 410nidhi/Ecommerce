import "./App.css";
import Header from "./component/layout/header/Header";
import Footer from "./component/layout/footer/Footer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import WebFont from "webfontloader";
import Home from "./component/home/Home.js"
import ProductDetails from "./component/product/ProductDetails"
import Products from "./component/product/Products";

function App() {

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  },[])

  return (
    <Router>
      <Header />

      <Routes>
        <Route exact="true" path="/" element={<Home/>} />
        <Route exact="true" path="/product/:id" element={<ProductDetails/>} />
        <Route exact="true" path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;