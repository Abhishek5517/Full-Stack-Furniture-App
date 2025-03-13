import React, { useState, useEffect } from 'react'
import '../../style/CompareCard.css';
import {removeFromCompareList} from '../../store/slices/CompareProductSlice.js';
import { useDispatch } from 'react-redux';
import makePayment from '../payment/makePayment.js'
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
const CompareCard = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [toggleBuy, setToggleBuy] = useState(false);
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    if( variant === 'warning'){
       enqueueSnackbar('please ensure every field is valid and filled', {variant});
    }else{

      enqueueSnackbar(`${props.productName} is removed successfully!`, { variant });
    }
  };
  const dispatch = useDispatch() ;
  const [compareCardData, setCompareCardData] = useState(props);
  useEffect(() => {
    setCompareCardData(props);
  }, [props])
  return (
    <div className="compare-card">
      <span className="close-card-compare" 
       onClick={() =>{
        dispatch(removeFromCompareList({id:props.id}));
       }}
      >{<Button onClick={ handleClickVariant('success')}><i className="fa-solid fa-xmark" style={{ color: "#e2e8f3" }}></i></Button>}</span>
      <div className="compare-card-name">
        <h3> <span>{props.productName}</span></h3>
      </div>
      <div className="compare-card-image">
        <img className="compare-image" src={'http://localhost:8080/images/'+props.productImage} alt="..." />
      </div>
      <div className="comparesion-table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Field</th>
              <th scope="col">value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              <td>₹<span>{props.productPrice}</span></td>
            </tr>
            <tr>
              <td>dimension</td>
              <td><span>{props.productDimension}</span></td>
            </tr>
            <tr>
              <td>status</td>
              <td><span>{props.badge}</span></td>
            </tr>
            <tr>
              <td>Description</td>
              <td className="compare-card-desc">
              <div className='comp-card-desc'>{props.productDescription}
              </div></td>
            </tr>

          </tbody>
        </table>
        <div className="buy-button-wrapper">
          <button onClick={() => {
                            setToggleBuy(!toggleBuy);
                        }} className="button-buy" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            Buy
                        </button>
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

export default CompareCard;