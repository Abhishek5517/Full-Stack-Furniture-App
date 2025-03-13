import React from 'react'

const CancelPayment = () => {
  return (
    <div className='payment-Cancelled'>
    <div style={{display:"flex",textAlign:"center",alignItems:"center"}}>
 <div style={{margin:"2em"}}>
 <i class="fa-solid fa-ban fa-2xl" style={{color: "#cd3c3c"}}></i>

 </div>
 <div>

        <h1>Payment Cancelled</h1> 
 </div>

    </div>
    <br></br>
    <div style={{marginLeft:"6em"}}>

         <h2>Sorry payment is not successful for some reason</h2>
    </div>
   </div>
  )
}

export default CancelPayment