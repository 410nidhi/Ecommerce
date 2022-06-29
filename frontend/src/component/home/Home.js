import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Product from "./Product"
import MetaData from '../layout/MetaData'
import {getProduct} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"

// Temporarily creating an object product
const product = {
  name:"T-shirt",
  images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  price:"24545",
  _id:"ndbfkh"
}

const Home = () => {
  const dispatch = useDispatch()
  const {loading, error, products, productCount} = useSelector(
    (state)=> state.products
  )

  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch, getProduct])

  return (
    // <Fragment></Fragment> = <></>
    <Fragment>
      <MetaData title="ECOMMERCE" />
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
        <div className="container" id="container">
          {products && products.map((product) => 
            <Product product = {product}/>
          )}
        </div>
    </Fragment>
  )
}

export default Home