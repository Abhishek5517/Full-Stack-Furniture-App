import React from 'react';
import '../../style/NavBar.css';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../store/slices/LoginDataSlice';
const NavBar = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="nav-content">

      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand d-flex" style={{alignItems: "center"}} href="#">
            <div style={{width:'3em'}}> <img className='company-logo' src='./logo.jpg' alt='...'/></div>
            <div className="comp-name">
       
              Zenith Furnitures
            </div>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse end" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to='/' className="nav-link space">Home</Link>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link space"  onClick={()=>{
                  // props.setToken('');
                  localStorage.setItem('token' , '') ;
                  dispatch(removeToken());

                }}>Logout
                </button>

              </li>
              <li className="nav-item">
                <NavLink to='/profile' className="nav-link space"><i class="fa-solid fa-user fa-lg" style={{ color: "#f7f7f8" }}></i>
                </NavLink>

              </li>
            </ul>
           
          </div>
        </div>
      
      </nav>
     


    </div>
  )
}



export default NavBar; 