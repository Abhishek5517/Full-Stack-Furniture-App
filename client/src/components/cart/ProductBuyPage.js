import React, { useEffect, useState } from 'react' ;
import '../../style/ProductBuyPage.css';
import { useSelector, useDispatch } from 'react-redux';
import BuyCard from './BuyCard.js';
import NoDataComp from '../NoDataError/NoDataComp';
import { addtoCart } from '../../store/slices/CartProductSlice';
const ProductBuyPage = () => {

    const [reload , setReload] = useState(0) ;
    const dispatch = useDispatch();
    const [userEmail , setUserEmail ] = useState(localStorage.getItem('jwtSubBot')) ;
    let cartData = useSelector((state) =>{
        return state.CartProduct.CartList ;
    })
    let CartTotal = useSelector((state)=>{
       return (state.CartProduct.CartTotal).toLocaleString('en-IN', { 
            style: 'currency', 
            currency: 'INR' 
        });
    }) 
  
   
    const [cartDatum , setcartDatum] = useState([]);
    const fetchCartData = async () =>{
        await fetch("http://localhost:8080/cart" , {
            method: 'GET',
            headers :{
                "useremail" :userEmail,
                "auth" : 'abhi123'
            },
        })
        .then(response => response.json())
        .then(data => {
            setcartDatum(data);
        });
           
    
    }
    useEffect(()=>{
        fetchCartData();

    },[cartData]);

    useEffect(() =>{
            for(let i = 0 ;  i < cartDatum.length ; i++)
            {
                dispatch(addtoCart(
                    {
                        data: cartDatum[i],
                        cartData: {
                            "productId": cartDatum[i].productId,
                            "supplierId": cartDatum[i].supplierId,
                            "userEmail" : userEmail
                        }
                    })) ;
            }
            
    } , [cartDatum]);


    if( cartData.length )
    {  
        return (
            <>
            <div style={{textAlign:"end"}}> <h3>Cart Total :   {CartTotal}</h3></div>
           
           { cartData.map((data , index) =>{
                return <BuyCard id={data.productId} {...data}/>
            })}  
            </> )
    }
    else{
            return (
                <NoDataComp message={"Nothing in the cart!"} />
            )
    }

}

export default ProductBuyPage;