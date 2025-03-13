import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../style/BuyDetails.css';
import makePayment from '../payment/makePayment.js' ;
const BuyDetails = (props) => {

    const suppliersData = useSelector((state) => {
        return state.SupplierData.supplierDetails[props.id];
    })
    const [triggered , setTrigger] = useState(true) ;
  
    useEffect(()=>{
        props.setToggleBuy(!props.see) ;
        setTrigger(!triggered) ;
    },[suppliersData]);
  
  

    




    return (
        <>
            {suppliersData && 
                (<>
                  
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
                        <div className='buying-confirmation' >
                           <button  type='button' onClick={() => makePayment(props)} > confirm buying this products</button>
                        </div>
                    </div>
                </>
                )
            }

        </>
    )
}

export default BuyDetails