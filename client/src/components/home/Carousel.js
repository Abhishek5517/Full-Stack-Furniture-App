import React from 'react'
import {useState} from 'react';
import {SlideToggle} from 'react-smooth-slide-toggle';
const Carousel = () => {
  let caraouselPath = './images/carousel/' ;
  const [toggle , setToggle] = useState(true);
  return (<>


    <SlideToggle
    trigger={<div className='carousel-dropdown'><button onClick={()=> setToggle(!toggle)}> { toggle ? <i class="fa-solid fa-circle-chevron-up fa-beat-fade" style={{color: "#70a3f5"}}></i> 
    : <i class="fa-solid fa-circle-chevron-down fa-beat-fade" style={{color: "#70a3f5"}}></i>}</button></div>} 
    easing="easeOutQuad"
    duration={1200}
    expanded={true}
  >
  
    <div className='carousel-slider'>
         <div id="carousel1" className="carousel slide" data-bs-ride="false">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carousel1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carousel1" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carousel1" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="5000">
      <img src={caraouselPath +'carousel-sofa.jpg'} className="d-block carousel-image" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5></h5>
        <p>Buy Amazing funitures from our site.</p>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={caraouselPath +'carousel-set.jpg'} className="d-block carousel-image" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5></h5>
        <p>Sell your furniture products here.</p>
      </div>
    </div>
    <div className="carousel-item" >
      <img src={caraouselPath +'carousel-dining.jpg'} className="d-block carousel-image" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5></h5>
        <p>You can also talk to the bot to get your things done.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carousel1" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carousel1" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
    <hr/>
    </SlideToggle>
  
    </>
      )
}

export default Carousel;