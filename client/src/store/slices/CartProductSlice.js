
import { createSlice } from '@reduxjs/toolkit';
async function postData(url = "", data = {} , userEmail) {
    console.log(data);
    const response = await fetch(url, {
      method: "POST", 
      headers : {
        "Content-Type" : "application/json",
        "useremail" : userEmail,
        "auth" : 'abhi123'
      } ,
      body:JSON.stringify(data), 
    });
    return response.json();
  }
  

 



const CartProductSlice = createSlice({
    name: 'cartProduct',
    initialState: {
        CartList: [],
        CartTotal: 0,
        CartProducts : 0
    },
    reducers: {
        addtoCart: (state, action) => {
            let data = action.payload.data;
            for( let i = 0 ; i < state.CartList.length ; i++ ){
                if( state.CartList[i].productId === action.payload.cartData.productId ){

                    return ; 
                }
                    
                
            }
             let response = postData('http://localhost:8080/cart' , action.payload.cartData , action.payload.cartData.userEmail) ;
             if( data.productId){
                state.CartList.push(data);
                let p = data.productPrice.split(',') ;
                let price = '' ;
                if( p.length > 1){
                    for( let i = 0 ; i < p.length ; i++){
                        price += p[i] ;
                    }
                    price = parseInt(price);
                } else{
                    price = parseInt(p[0]);
                }
                state.CartTotal += price ;
                state.CartProducts += 1 ;

             }
             
        },
        removeFromCart : (state,action)=>{
            let id = action.payload.id ;
            console.log(id);
            for( let i = 0 ; i < state.CartList.length ; i++ ){
                if( state.CartList[i].productId === id ){
                    let p = state.CartList[i].productPrice.split(',');
                    let price = '' ;
                if( p.length > 1){
                    for( let i = 0 ; i < p.length ; i++){
                        price += p[i] ;
                    }
                    price = parseInt(price);
                } else{
                    price = parseInt(p[0]);
                }
                state.CartTotal -= price ;
                state.CartProducts -= 1 ;
                    state.CartList.splice(i , 1) ;
                    break ;
                }
            }
        }
    },
})
let CartProductSliceReducer = CartProductSlice.reducer
export default CartProductSliceReducer;

export const { addtoCart ,removeFromCart} = CartProductSlice.actions; 