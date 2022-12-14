import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import ProductCard from "./ProductCard"
import MetaData from '../layout/MetaData'
import {clearErrors, getProduct} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"
import Loader from '../layout/loader/Loader'
import {useAlert} from "react-alert"
import Login from '../login/Login'
import Search from '../layout/search/Search'
import CartIcon from '../layout/cartIcon/CartIcon'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const {loading, error, products} = useSelector(
    (state)=> state.products
  )

  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch (clearErrors())
    }
    dispatch(getProduct())
  },[dispatch, error, alert])

  return (
    // <Fragment></Fragment> = <></>
    <Fragment>
      {loading ? (<Loader/>) :
      (
      <Fragment>
      <MetaData title="ECOMMERCE" />
      <Search/>
      <CartIcon/>
        <div className= "banner">
          <Login/>
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
            <ProductCard key={product._id} product = {product}/>
          )}
        </div>
      </Fragment>
      )}
    </Fragment>
  )
}

export default Home