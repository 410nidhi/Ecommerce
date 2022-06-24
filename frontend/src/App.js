import "./App.css";
import Header from "./component/layout/header/Header";
import Footer from "./component/layout/footer/Footer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import WebFont from "webfontloader";
import Home from "./component/home/Home.js"

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
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;