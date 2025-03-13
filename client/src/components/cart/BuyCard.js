import React , {useEffect, useState} from 'react' ;
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeFromCart } from '../../store/slices/CartProductSlice';
import makePayment from '../payment/makePayment.js'
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';


const BuyCard = props => {
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant) => () => {
      // variant could be success, error, warning, info, or default
      if( variant === 'warning'){
         enqueueSnackbar('please ensure every field is valid and filled', {variant});
      }else{
  
        enqueueSnackbar(`${props.productName} is removed from the cart successfully!`, { variant });
      }
    };
  

   
const [userEmail , setUserEmail ] = useState(localStorage.getItem('jwtSubBot')) ;
const [toggleBuy, setToggleBuy] = useState(false);


const dispatch = useDispatch();
  return (
    <div className="buy-page-container">
    <div className="buy-image-price">
        <div className="buy-image">
            <img src={'http://localhost:8080/images/'+props.productImage} alt="..." />
        </div>

    </div>
    <div className="buy-product-details">
    <span className="close-buyCart-card" 
       onClick={async ()=>{
        
         await fetch("http://localhost:8080/cart/"+props.id, 
         { 
            method: 'DELETE',
            headers : {
                'useremail' : userEmail,
                "auth" : 'abhi123'
            },
          });
          dispatch(removeFromCart({id:props.id}))
       
       }}
      >{<Button onClick={handleClickVariant('success')}><i className="fa-solid fa-xmark" style={{ color: "#e2e8f3" }}></i></Button>}</span>
        <div className="buy-product-header">
            <h3> {props.productName} </h3>
        </div>
        <div className="buy-product-description">
            <ul className="buy-product-desc">
                <li>
                    Name : <span>{props.productName}</span>
                </li>
                <li>
                    Type : <span>{props.productType}</span>
                </li>
                <li>
                    Category : <span>{props.productType}</span>
                </li>
                <li>
                    Dimension : <span>{props.productDimension} </span>
                </li>
                <li>
                    Description : <span>{props.productDescription}</span>
                </li>
            </ul>
        </div>
        <div className="buy-price-btns">
            
            <div className="buy-price">
                <h4>Price :  ₹ <span>{props.productPrice}</span></h4>
            </div>
            <div className="buy-btns">
                <button onClick={() => {
                            setToggleBuy(!toggleBuy);
                          
                        }} className="btn" type="button"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >
                            Buy
                        </button>
            </div>
        </div>
    </div>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

<>
     
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">Suppliers Details </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div className='supplier-name' style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex"}}>
            <div>

            <i class="fa-solid fa-file-signature" 
            style={{color: "#010b1e",
                     marginRight: "10px" 
            
            }}></i>  

            </div>
            <div>

            
            <h6>Supplier Name :</h6>
            </div>
            
            </div>
            <div>

            <br></br>  {props.supplierName }{console.log(props.supplierName)}
            </div>
            </div>
            <div className='supplier-email' style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex"}}>

          <div>

           <i class="fa-regular fa-envelope"   style={{color: "#010b1e",
                     marginRight: "10px" 
            
            }}></i> 
          </div> 
             <h6>Supplier Email :</h6>
            
            </div>
            <div>

            <br></br>  {props.supplierEmail}
            </div>
            </div>
            <div className='supplier-phone' style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex"}}>
            <div>
            <i class="fa-solid fa-phone" style={{color: "#010b1e",
                     marginRight: "10px" 
            
            }}></i>  </div>
            <div>  <h6>Supplier Phone :</h6> </div>
             </div>
             <div><br></br> {props.supplierPhone}
             </div>
             
             </div>
            <div className='supplier-address' style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex"}}>
            <div>
            <i class="fa-solid fa-location-dot" style={{color: "#010b1e",
                     marginRight: "10px" 
            
            }}></i>
            </div>
            <div>
             <h6>Supplier Address : </h6>
             </div>
             </div>
             <div>
             <br></br> {props.supplierAddress}
             </div>
             
            </div>
            <div className='buying-confirmation'>
               <button className='' onClick={()=>{
                makePayment(props);
               }}> confirm buying this products</button>
            </div>
        </div>
    </>
</div>

</div>
  )
}



export default BuyCard ;