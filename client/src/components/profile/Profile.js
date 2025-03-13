import React from 'react'
import { Outlet } from 'react-router-dom';
import '../../style/Profile.css';
import { NavLink } from 'react-router-dom';


const Profile = () => {
  return (<>
    <div className='profile-container'>
      <div style={{ textAlign: "center" }}>
        <h1> Your Account</h1>
      </div>
      <div className="your-orders">

        <div className="orders-logo">
          <i className="fa-solid fa-cart-flatbed-suitcase fa-2xl" style={{ color: "#020424" }}></i>
        </div>
        <NavLink to='/profile/yourOrders' className="orders-nav">

          <div >
            <h2>Your Orders</h2>
          </div>
        </NavLink>

      </div>
      <div className="address">
        <div className="address-logo">
          <i className="fa-regular fa-address-book fa-2xl" style={{ color: "#020424" }}></i>
        </div>
        <NavLink to='/profile/address' className="address-nav">

          <div >
            <h2>Address</h2>

          </div>
        </NavLink>

      </div>
      <div className="cred">
        <div className="cred-logo">
          <i className="fa-solid fa-user-lock fa-2xl" style={{ color: "#020424" }}></i>
        </div>
        <NavLink to='/profile/login&security' className="cred-nav">
          <div >
            <h2>Login & Security</h2>
          </div>
        </NavLink>

      </div>
    </div>

  </>
  )
}

export default Profile