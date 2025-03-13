import React from 'react'
import '../../style/YourOrders.css';
import { useEffect, useState } from 'react';
const UserOrder = (props) => {
const [DeliveryDate , setDeliveryDate] = useState('');
const calculateTime = (OrderDate) => {
    let date = new Date(OrderDate);
let date1 = date.getTime() + (7*24*60*60*1000) ;
date1 = new Date(date1);
date1 = date1.toLocaleString();
let date2 = date1.split(',')[0];
return date2 ;
} 
console.log(props);
useEffect(()=>{
    setDeliveryDate(calculateTime(props.orderDate)) ;
},[props])
  return (
    <div class='order-card'>
    <div class="order-header">
        <div class="order-name">
            <h1>
               {props.productName}
            </h1>
        </div>
        <div class="order-id">
            <h3>
                Order Id : <span>{'#order'+props.orderId}</span>
            </h3>
            <h5>
                Order Status : <span>{props.orderStatus}</span>
            </h5>
        </div>
    </div>
    <div class="order-delivery-date">
        <div class="order-date">
            <h2>Ordered Date : {props.orderDate}</h2>
            <span>Delivery within : {DeliveryDate}</span>
        </div>
     
    </div>
    <div class="order-descrption">
       <div class="order-image">
           <img src={'http://localhost:8080/images/'+props.productImage} alt="..."/>
       </div>
       <div class="order-image-desc">
           <ul class="order-image-desc-list">
            <li>
            <h3>  <span>{props.productName}</span></h3>
              
            </li>
            <li>
            <h3>  <span>{props.productType}</span></h3>
               
            </li>
            <li className='order-description'>
            <h3> <span>{ props.productDescription}</span></h3>
              
            </li>
            <li className='order-price'>
            <hr></hr><br></br>
            <h2>Price : <span>₹{props.productPrice}</span></h2>
            </li>
           </ul>
       </div>
    </div>
    <div class="order-footer">
       <button class="btn btn-danger">Cancel Order</button>
    </div>


    
</div>
  )
}

export default UserOrder