import React from 'react'
import '../../style/SoldProductCard.css';
const SoldProductCard = () => {
  return (
    <div class="sold-product-card">
        <div class="sold-product-card-header">
            <div class="sold-product-card-name">
                <h2>Sofa </h2>
            </div>
            <div class="sold-product-card-delivery-details">
                <h3>Delivered to :<span> Abhishek</span>
                </h3>
                <h5>Delivered addres: <span>Abhishek addres pop up </span></h5>
            </div>
        </div>
        <div class="sold-product-card-content">
            <div class="sold-product-card-details">
                <div class="sold-product-card-image">
                    <img src="..." alt="..."/>
                </div>
                <div class="sold-product-card-description">
                    <ul class="sold-product-desc">
                        <li>
                            Type : <span>sofa</span>
                        </li>
                        <li>
                            Category : <span>wooden sofa</span>
                        </li>
                        <li>
                            description : <span>this is sofa huihui</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="sold-product-card-pdate">

                <div class="sold-product-card-price">
                    <h4> Price: <span>6000</span></h4>
                </div>
                <div class="sold-product-card-deliver-date">
                    <h4>Delivered date: <span>04/09/2023</span></h4>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SoldProductCard