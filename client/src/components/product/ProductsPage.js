import React, { useEffect, useState } from 'react'
import ProductsCard from './ProductsCard';
import '../../style/ProductPage.css';
import NoDataComp from '../NoDataError/NoDataComp.js' ;
import {SlideToggle} from 'react-smooth-slide-toggle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProductsPage = () => {

    const [product, setProduct] = useState([]);
    const [toggle1 , setToggle1] = useState(true);
    const [toggle2 , setToggle2] = useState(true);
    const [toggle3 , setToggle3] = useState(true);
    const [toggle4 , setToggle4] = useState(true);

    useEffect(() => {

        fetch("http://localhost:8080/products",{
            headers:{
            "auth" : 'abhi123'
            }
        })
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            });
        
    }, []);


   if( product.length){
    return (
        <>
        <div id = 'navigateProduct' className='product-nav-wrapper'>

            <a className='prod-nav' href='#Sofa'>Sofa</a>
            <a className='prod-nav' href='#Table'>Table</a>
            <a className='prod-nav' href='#Bed'>Bed</a>
             <a className='prod-nav' href='#Chair'>Chair</a>
        </div>
            
            <h3> Sofa </h3>
            <hr></hr>
            <SlideToggle
    trigger={<div id='Sofa' className='carousel-dropdown'> <button onClick={()=> setToggle1(!toggle1)}> { toggle1 ? <i class="fa-solid fa-circle-chevron-up fa-beat-fade" style={{color: "#70a3f5"}}></i> 
    : <i class="fa-solid fa-circle-chevron-down fa-beat-fade" style={{color: "#70a3f5"}}></i>}</button></div>} 
    easing="easeOutQuad"
    duration={1200}
    expanded={true}
  >
            <div className='productsWrapper'>
            {product.map((data, index) => {
             if( data.productType === 'sofa'){
                        return (<>
                            <ProductsCard key={index} id={data.productId} {...data} />
                        </>
                        )
                    } }) }
            </div>
            </SlideToggle>
            <h3> Table </h3>
            <hr></hr>
            <SlideToggle
    trigger={<div id='Table' className='carousel-dropdown'> <button onClick={()=> setToggle2(!toggle2)}> { toggle2 ? <i class="fa-solid fa-circle-chevron-up fa-beat-fade" style={{color: "#70a3f5"}}></i> 
    : <i class="fa-solid fa-circle-chevron-down fa-beat-fade" style={{color: "#70a3f5"}}></i>}</button></div>} 
    easing="easeOutQuad"
    duration={1200}
    expanded={true}
  >
            <div className='productsWrapper'>
            {product.map((data, index) => {
                    if( data.productType === 'table'){
                        return (<>
                            <ProductsCard key={index} id={data.productId} {...data} />
                        </>
                        )
                    } }) }
                    </div>
                    </SlideToggle>
                    <h3> Bed </h3>
                    <hr></hr>
                    <SlideToggle
    trigger={<div id='Bed' className='carousel-dropdown'> <button onClick={()=> setToggle3(!toggle3)}> { toggle3 ? <i class="fa-solid fa-circle-chevron-up fa-beat-fade" style={{color: "#70a3f5"}}></i> 
    : <i class="fa-solid fa-circle-chevron-down fa-beat-fade" style={{color: "#70a3f5"}}></i>}</button></div>} 
    easing="easeOutQuad"
    duration={1200}
    expanded={true}
  >
                    <div className='productsWrapper'>
                 {product.map((data, index) => {
                    if( data.productType === 'bed'){
                        return (<>
                            <ProductsCard key={index} id={data.productId} {...data} />
                        </>
                        )
                    } }) }
                    </div>
                    </SlideToggle>
                    <h3> Chair </h3>
                    <hr></hr>
                    <SlideToggle
    trigger={<div id='Chair' className='carousel-dropdown'> <button onClick={()=> setToggle4(!toggle4)}> { toggle4 ? <i class="fa-solid fa-circle-chevron-up fa-beat-fade" style={{color: "#70a3f5"}}></i> 
    : <i class="fa-solid fa-circle-chevron-down fa-beat-fade" style={{color: "#70a3f5"}}></i>}</button></div>} 
    easing="easeOutQuad"
    duration={1200}
    expanded={true}
  >
                
                    <div className='productsWrapper'>
                 {product.map((data, index) => {
                    if( data.productType === 'chair'){
                        return (<>
                            <ProductsCard key={index} id={data.productId} {...data} />
                        </>
                        )
                    } }) }
                    </div>
                    </SlideToggle>


    
           <div className='back-to-top'>
              <a href='#navigateProduct'><i class="fa-solid fa-angle-up fa-beat" style={{color: "white"}}></i></a>
           </div> 
           
        </>
    )
   }
   else{
      return (<>
     <Box sx={{ display: 'flex' , marginLeft :'50%', marginTop:'15%', marginBottom:'30%' }}>
      <CircularProgress />
    </Box>
      </>)
   }   
}

export default ProductsPage;