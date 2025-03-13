import React, { useState } from 'react'
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import '../../style/NavTabs.css' ;
import { useSelector } from 'react-redux';
const NavTabs = () => {

  const cartLength = useSelector((state) =>{

    return state.CartProduct.CartProducts ;
  })
  return (
    <div className='nav-tabs'>
      <div className="sec-nav">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink className="nav-link nav-b" aria-current="page" to='/buy'><i class="fa-solid fa-cart-shopping" style={{color: "#030c1c"}}></i>
            </NavLink>
            <div className='cart-orders-tag'>
           { cartLength  }
            </div>
          </li>
          <li className="nav-item">
            <NavLink to='/sell' className="nav-link nav-b">SELL</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/compare' className="nav-link nav-b">COMPARE</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/products' className="nav-link nav-b">PRODUCTS</NavLink>
          </li>
        </ul>
    
      <hr></hr><br></br>
          <Outlet/>
      </div>
    </div>
  )
}

export default NavTabs