import React, { useEffect ,useState } from 'react'
import '../../style/CompareProduct.css';
import CompareCard from './CompareCard';
import { useSelector } from 'react-redux';
import NoDataComp from '../NoDataError/NoDataComp.js';
const CompareProduct = () => {

  const [key , setKey] = useState(0) ;
  let compareProductData = useSelector((state) =>{
    return state.CompareProduct.compareList ; 
  }) ;
  const [comparingData , setComparingData] = useState(compareProductData);

  useEffect(()=>{
     setKey(key+1);
  },[comparingData,compareProductData]);

  if( compareProductData.length ){
    return (<>

      <div  className='Compare-product-container'>
          {
            compareProductData.map((data,index) =>{
                  return <CompareCard key={index} id={index} {...data}/>;
              })
          }
      </div>

    </>
    )
  }
  else{
    return (<NoDataComp message={"Nothing to compare"}/>) ;
  }
 
}

export default CompareProduct