import React , {useState , useEffect} from 'react'
import NavBar from '../header/NavBar.js';
import { Route , Routes } from 'react-router-dom';
import '../../style/Header.css';
import Login from '../login/Login.js';

const Header = () => {
    const [token , setToken] = useState('') ;

    useEffect(() =>{
        let tokenKey = localStorage.getItem('token') ;
        if(  tokenKey != token ){
         setToken(tokenKey) ;
        }
              
    } ,[token])
    return (<div>
        <NavBar setToken = {setToken}/>
    { !token && <Routes>

        <Route  path = '/' >
          <Route path='*' element={<Login/>}/>
       </Route>
        </Routes>}
    </div>
    )
}

export default Header;