import React, { useState } from 'react'
import HomeCardData from '../../data/HomeCardData.json';
import Carousel from './Carousel.js';
import HomeDisplayCard from './HomeDisplayCard.js';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../store/slices/CartProductSlice';


const HomeContent = () => {
   const dispatch = useDispatch();
   const [buyProducts, setbuyProducts] = useState([]);
  return (
  <>
     <Carousel />
     <div className='home-card-wrapper'>
             
             { HomeCardData.map((data, index) => {
                     return (<div > 
                     <HomeDisplayCard id={index} {...data} /></div>)       
                 })}
 
         </div>
  </>
  )
}

export default HomeContent