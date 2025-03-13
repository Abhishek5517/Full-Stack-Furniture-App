import {configureStore} from '@reduxjs/toolkit' ;

import  CartProductSliceReducer  from './slices/CartProductSlice.js';
import CompareProductSliceReducer from './slices/CompareProductSlice.js';
import SupplierDetailsSliceReducer from './slices/SupplierDetailsSlice.js';
import LoginUserSliceReducer from './slices/LoginDataSlice.js';

const store = configureStore({
    reducer:{
        CartProduct : CartProductSliceReducer, 
        CompareProduct : CompareProductSliceReducer,
        SupplierData : SupplierDetailsSliceReducer,
        LoginUserToken :LoginUserSliceReducer ,
    },
});



export default store ;