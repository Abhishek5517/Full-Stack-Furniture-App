import React from 'react'
import '../../style/HomeDisplayCard.css'
const HomeDisplayCard = (props) => {

  let homeCardImagePath = './images/Home-card-images/'
  return (
    <div className='home-display-card'>
    <div className='home-dis-card-img'>
    <span class="notify-badge">{props.badge}</span>
         <img className='dis-card-image' src={props.image} alt='...'/>
    </div>
    <div className='card-image-desc'>
    {
        props.description
    }
    <br/>
    </div>
    <div className='card-navigation-page'>
    <h5 className='price-tag'> ₹{ props.price }</h5>
    </div>

    </div>
  )
}

export default HomeDisplayCard ;