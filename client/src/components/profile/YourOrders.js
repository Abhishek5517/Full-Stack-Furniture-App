import React ,{useState, useEffect} from 'react'
import '../../style/YourOrders.css';
import UserOrder from './UserOrder';
import NoDataComp from '../NoDataError/NoDataComp';
const YourOrders = () => {
 
    const [orderData , setOrderData] = useState([]) ;
    const [userEmail , setUserEmail ] = useState(localStorage.getItem('jwtSubBot')) ;
    useEffect(() =>{
        fetch("http://localhost:8080/orders" ,{
            headers:{
                "useremail" : userEmail, 
               "auth" : 'abhi123'
            }
        })
        .then(response => response.json())
        .then(data => {
            setOrderData(data);
        });
    
}, []);
 if( orderData.length ){
    return ( <>
        {
           orderData.map((data , index) =>{
              {/* console.log(data); */}
              data.orderDate = new Date(data.orderDate).toLocaleDateString() ;
              {/* data.orderDate =  data.orderDate.getFullYear()+'-'+(data.orderDate.getMonth()+1)+'-'+data.orderDate.getDate(); */}
              return   <UserOrder key = {index} id={index} {...data}/>
           })
        }
        
      </>)  
 }
 else{
   return (
    <>
    <NoDataComp/>
</>
   )
  
 
 }
  
  
}

export default YourOrders;