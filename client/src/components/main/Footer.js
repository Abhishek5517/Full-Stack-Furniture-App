import React from 'react'
import '../../style/Footer.css';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (<>

<div className="footer">
            <div className="container">     
                <div className="row">                       
                    <div className="col-lg-4 col-sm-4 col-xs-12">
                        <div className="single_footer">
                            <h4>Services</h4>
                            <ul>
                                <li><NavLink to="/products">Buy</NavLink></li>
                                <li><NavLink to="/sell">Sell</NavLink></li>
                                <li><NavLink to="/profile">Manage profile</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className="single_footer single_footer_address">
                            <h4>Page Link</h4>
                            <ul>
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/profile">Profile</NavLink></li>
                                <li><NavLink to="/profile/login&security">Login and Security</NavLink></li>
                                <li><NavLink to="/profile/address">Address</NavLink></li>
                                <li><NavLink to="/products">Products</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    {/* 
                        <div className="single_footer single_footer_address">
                            <h4>Subscribe today</h4>
                            <div className="signup_form">                           
                                <form action="#" className="subscribe">
                                    <input type="text" className="subscribe__input" placeholder="Enter Email Address"/>
                                    <button type="button" className="subscribe__btn"><i className="fas fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                                             
                    </div>  
                        */}
                        <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="social_profile">
                            <ul>
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>   
                        </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-xs-12">
                        <p className="copyright">Copyright © 2023 <a href="#">HUIHUI</a>.</p>
                    </div>                
                </div>              
            </div>
        </div>

  </>
    
  )
}

export default Footer ;