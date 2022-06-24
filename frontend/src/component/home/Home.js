import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"

const Home = () => {
  return (
    // <Fragment> = <>
    <Fragment>
        <div className= "banner">
            <p>Welcome to ECOMMERCE</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse/> 
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container"></div>
    </Fragment>
  )
}

export default Home