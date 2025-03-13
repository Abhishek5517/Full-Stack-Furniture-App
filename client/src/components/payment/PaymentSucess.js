import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import { removeFromCart } from '../../store/slices/CartProductSlice';
import { useDispatch } from 'react-redux';
const PaymentSucess = () => {
  const {productId} = useParams() ;

  const dispatch = useDispatch();
  const [userEmail , setUserEmail ] = useState(localStorage.getItem('jwtSubBot')) ;

  const deleteFromCart =async ()=>{
        
    await fetch("http://localhost:8080/cart/"+productId, 
    { 
       method: 'DELETE',
       headers : {
           'useremail' : userEmail,
           "auth" : 'abhi123'
       },
     });
     dispatch(removeFromCart({id:productId}))
  
  }

  const insertOrder = async () =>{
    await fetch("http://localhost:8080/order", 
    { 
       method: 'POST',
       headers : {
           'useremail' : userEmail,
           "auth" : 'abhi123',
           "Content-Type" : "application/json"
       },
       body : JSON.stringify({productId}),
     });
  }
  useEffect(()=>{
    deleteFromCart();
    insertOrder();
  },[])
  return (
    <div className='payment-successful'>
    <div style={{display:"flex",textAlign:"center",alignItems:"center"}}>
 <div style={{margin:"2em"}}>
 <i class="fa-regular fa-circle-check fa-2xl" style={{color: "#13e72c"}}></i>
 </div>
 <div>

        <h1>Payment Successful</h1> 
 </div>

    </div>
    <br></br>
    <div style={{marginLeft:"6em"}}>

         <h2> Thank you for your payment.</h2>
    </div>
   </div>
  )
}

export default PaymentSucess