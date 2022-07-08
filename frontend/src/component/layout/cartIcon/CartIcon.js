import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import "./CartIcon.css"

const CartIcon = () => {
  return (
    <div className='cartIconBox'>
        <Link to="/cart"> <ShoppingCartIcon style={{ color: "white" }}/> </Link>
    </div>
  )
}

export default CartIcon