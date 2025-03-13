import React, { useEffect , useState } from 'react'
import '../../style/Address.css';
import { NavLink } from 'react-router-dom';
const Address = () => {
  const [token , setToken] = useState('') ;
  const [address , setAddress] = useState('');
useEffect(()=>{
      let jwtToken = localStorage.getItem('token') ; 
      fetch('http://localhost:8080/user/address', {
        method : 'GET',
        headers :{
           'Authorization' : jwtToken,
           "auth" : 'abhi123'
        }
       })
       .then(response => response.json())
       .then(data => {
        if( data.userAddress){
          setAddress(data.userAddress);
        }else{
          setAddress('');

        }
       });
},[]);

  return (
    <div className="address-container">
    <div className="user-name">
       <h1>Your Address</h1>
    </div>
    <div className="address">
        <div className="address-value">
          <p id="adress"> { address === '' ? "Your Address Goes here..." : address } </p>
        </div>
        <div  className="edit-address">
          <NavLink to='/profile/address/edit'> <i className="fa-solid fa-file-pen fa-2xl" style={{color: "#020424"}}></i></NavLink> 
        </div>
    </div>
</div>
  )
}

export default Address;