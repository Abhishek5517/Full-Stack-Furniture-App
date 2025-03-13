import React, { useEffect, useState } from 'react'
import '../../style/ProductCard.css';
import { useDispatch ,useSelector} from 'react-redux';
import { addtoCart } from '../../store/slices/CartProductSlice';
import { addToCompareList } from '../../store/slices/CompareProductSlice';
import { addSupplierDetails } from '../../store/slices/SupplierDetailsSlice';
import Button from '@mui/material/Button';
import makePayment from '../payment/makePayment.js' ;
import { SnackbarProvider, useSnackbar } from 'notistack';
const ProductsCard = (props) => {
    const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant,type) => () => {
    // variant could be success, error, warning, info, or default
    if( type === 'comp'){
       enqueueSnackbar('product added for comparision', {variant});
    }else{

      enqueueSnackbar(`${props.productName} is added to cart successfully!`, { variant });
    }
  };
    const dispatch = useDispatch();
    const [productData, setProductData] = useState();
    const [toggleBuy, setToggleBuy] = useState(false);
   
    const [userEmail , setUserEmail ] = useState(localStorage.getItem('jwtSubBot')) ;
   
    useEffect(() => {
        setProductData({
            "productName": props.productName,
            "productType": props.productType,
            "productDescription": props.productDescription,
            "productImage": props.productImage,
            "badge": "New",
            "productPrice": props.productPrice,
            "productDimension": props.productDimension,
            "supplierName" : props.supplierName,
            "supplierEmail" : props.supplierEmail,
            "supplierPhone" : props.supplierPhone,
            "supplierAddress" : props.supplierAddress
        });
    }, [])
    
    return (<>
        <div className="Product-Card">

            <span className="Compare-card" onClick={() => dispatch(addToCompareList({ data: productData }))}>  {<Button onClick={handleClickVariant('success','comp')}><i className="fa-solid fa-code-compare" style={{color:"white"}}></i></Button>}</span>
            <div className="product-name" style={{marginBottom:"1em;"}}>
            <br></br>
                <h3>{props.productName}</h3>
                
            </div>
            <div className="product-image">

                <img className="product-image-display" src={'http://localhost:8080/images/'+props.productImage} alt="" />
            </div>
            <div className="product-details">

                <div className="product-type">
                    <p>type: <span>{props.productType}</span></p>
                </div>
                <div className="product-category">
                    <p>category: <span>{props.productType}</span></p>
                </div>
                <div className="product-dimension">
                    <p>dimension: <span>{props.productDimension}</span></p>
                </div>
                <div className="product-description">
                    <div>description:</div> <div className="product-desc">{props.productDescription}</div>
                </div>
                <hr />
                <div className="product-price-buttons">

                    <div className="product-price">
                        <p>price: ₹<span>{props.productPrice}</span></p>
                    </div>

                    <div className="product-buttons">

                        <button className="add-to-cart" onClick={() => {

                            dispatch(addtoCart(
                                {
                                    data: productData,
                                    cartData: {
                                        "productId": props.productId,
                                        "supplierId": props.supplierId,
                                        "userEmail" : userEmail
                                    }
                                }));
                        }
                        }

                        >
                 {<Button onClick={handleClickVariant('success','cart')}>Add to Cart</Button>}
                        </button>
                        <button onClick={() => {
                            
                            let supplierPayload = {
                                supplierName: props.supplierName,
                                supplierPhone: props.supplierPhone,
                                supplierEmail: props.supplierEmail,
                                supplierAddress: props.supplierAddress
                            }
                            dispatch(addSupplierDetails({ data: supplierPayload }));
                            setToggleBuy(!toggleBuy);
                            makePayment(props);
                        
                     
                        }} className="buy-button" type="button">
                             Buy
                        </button>
                    </div>
                </div>
            </div>
     {productData && <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight1" aria-labelledby="offcanvasRightLabel1">
     
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel1">Suppliers Details </h5>
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

            <br></br>  {productData.supplierName }
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

            <br></br>  {productData.supplierEmail}
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
             <div><br></br> {productData.supplierPhone}
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
             <br></br> {productData.supplierAddress}
             </div>
             
            </div>
            <div className='buying-confirmation'>
               <button className='' onClick={()=>{
                console.log(productData);
                makePayment(productData);
               }}> confirm buying this products</button>
            </div>
        </div>
    
</div>}
        </div>


    </>
    )
}

export default ProductsCard;