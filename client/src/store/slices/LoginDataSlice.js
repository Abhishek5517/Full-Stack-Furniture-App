
import { createSlice } from '@reduxjs/toolkit';
const LoginUserSlice = createSlice({
    name: 'LoginUser',
    initialState: {
        Token: localStorage.getItem('token'),
        userName : '',
        userEmail : '',
        showError : ''
    },
    reducers: {
          addToken: (state, action) => {
            state.userEmail = action.payload.userEmail ;
            state.userName = action.payload.userName ;
            state.Token = action.payload.Token ;
        },
        removeToken : (state, action) =>{
            state.Token = localStorage.getItem('token') ;
        },
        showErrorLog : ( state , action ) =>{
            state.showError = action.payload.errors ; 
        },
    },
})
let LoginUserSliceReducer = LoginUserSlice.reducer
export default LoginUserSliceReducer;

export const { addToken, removeToken , showErrorLog} = LoginUserSlice.actions; 