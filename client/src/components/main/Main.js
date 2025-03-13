import React from 'react'
import Header from './Header.js';
import Footer from './Footer.js';
import Content from './Content.js';
import { useNavigate ,useLocation } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
    <Header/>
    {
       location.pathname != '/' ?    <div className="backNavigation" onClick={()=> navigate(-1)}><i class="fa-solid fa-chevron-left fa-xl fa-beat" style={{color: "white"}}></i></div>:null 
    }

    <Content/>
 
 
    <Footer/>
    </div>
  )
}

export default Main ;

