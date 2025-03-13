import React, { useEffect , useState } from 'react'
import '../../style/Login.css';
import { addToken , showErrorLog } from '../../store/slices/LoginDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {  useSnackbar } from 'notistack';
const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isValidEmail , setValidEmail] = useState(true);
  const [isValidName , setValidName] = useState(true);
  const [displaySignUpButton , setdisplaySignUpButton] = useState(true);
  const [validated , setValidated] = useState(false);
  const [loginData , setLoginData] = useState({
    name:'',
    email:'',
    password:''
  }) ;

  const showError = useSelector((state) =>{
    return state.LoginUserToken.showError ;
  })
  const handleClickVariant = (variant , type) => () => {
   
    if( type === 'signup'){

      if( variant === 'warning' && showError !== ''){

        enqueueSnackbar(`Signup unsuccessful ${showError}`, {variant});
      }else if( showError === ''  && variant === 'success') {
        
        enqueueSnackbar('Signup successful ! Please Login Now with same credentials', { variant });
      }
    }else if( type === 'login'){
      
      if( variant === 'warning' && showError !== ''){
        enqueueSnackbar(`Login unsuccessful ${showError}`, {variant});
      }else if(showError === '' && variant === 'success') {
        
        enqueueSnackbar('Logged in successfully!', { variant });
      }
    }
  };





  const addToLogin = (e) => {
        setLoginData( (prev) => { return  {
          ...prev , [e.target.name] : e.target.value 
        }}
        )
  }
  useEffect(()=>{

  },[loginData])
  
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth" : 'abhi123'
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response.json();
  }
  

  function validatefield(){
    let   a = true ;
    if( (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(loginData.email)){
      setValidEmail(true);
    
  }
  else{
    setValidEmail(false);
    a = false ;
  }
  if( (/^[a-zA-Z]+ [a-zA-Z]+$/).test(loginData.name)){
    setValidName(true);
 
  }
  else{
    setValidName(false);
    a = false ;
  }
  
    return a ;
  }
  const signUp = async () => {
      let valid = validatefield() ; 
      // console.log( isValidEmail);
      if(  valid === true ){
          let response =   await postData('http://localhost:8080/signUp',loginData) ;
          if( response.error){
            console.log(response.error)
            dispatch(showErrorLog({errors: response.error}))
            setdisplaySignUpButton(true);
          }else{
            dispatch(showErrorLog({errors: ''}))

            setLoginData({
              name:'',
              email:'',
              password:''
            })
            setdisplaySignUpButton(false);
          }
       
          
      }
      else{
        dispatch(showErrorLog({errors: 'error signup'}))

      }
  }
  const closeDialog = () =>{
       let dialog = document.getElementById("loginModal");
       dialog.style.display = "none";
  }
  const login = async () => {
    let valid = validatefield() ; 
    setValidated(valid);
    if( valid === true ){
         let response =  await postData('http://localhost:8080/login',{name:loginData.name , email:loginData.email, password:loginData.password}) ;
        if( response.error ){
          dispatch(showErrorLog({errors: response.error}))

        }else{
          let token = response.token ;
          localStorage.setItem("jwtSubBot" , response.jwtBotSub) ;
          localStorage.setItem("token" , token);
          window.location.reload(true);
          dispatch(addToken({Token : token , userEmail : loginData.email , userName : loginData.name})) ;
          dispatch(showErrorLog({errors: ''}))
          closeDialog();
        }
        
    }
    else{
      dispatch(showErrorLog({errors : 'error login'})) ;
    }
}
   return (
    <>
      <div className="modal fade show" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="false" role="dialog" aria-modal="true" style={{display:"block"}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="loginModalLabel">SIGN UP or LOGIN</h1>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control"
                   id="InputEmail1"  required name='email'
                   aria-describedby="emailHelp" onChange={(e) => addToLogin(e)} value = {loginData.email} />
                   {
              !isValidEmail && (
                    <span className="error-tooltip" data-tip="Name is required">
                          ❗ Please Provide a proper email
                   </span>
                   )
          }
                

                </div>
                <div className="mb-3">
                  <label for="name" className="form-label">Name</label>
                  <input type="name" className="form-control" id="name" name='name' aria-describedby="name" required
                   onChange={(e) => addToLogin(e)}  value = {loginData.name}  placeholder='First Name and Last Name'/>
{  !isValidName && ( 
                    <span className="error-tooltip" data-tip="Name is required">
                          ❗ Please Provide a proper first and last name
                   </span>
                   )}
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">Password</label>
                  <input type="password" className="form-control" 
                  id="password" onChange={(e) => addToLogin(e)} required name='password'  value = {loginData.password} />
                </div>

                <div className="modal-footer">
               { displaySignUpButton && <button  onClick={(e) => {
                  e.preventDefault() ;
                  signUp() ;
                }} className="btn" style={{color:"black",backgroundImage: "linear-gradient(120deg, #dfe243, #b9e75f)"
    }}>{<Button onClick={  validated  ? handleClickVariant('success','signup'):handleClickVariant('warning','signup')  }>SIGN UP</Button>}</button>}
                  <button onClick={(e)=>{
                    e.preventDefault();
login() 
                  }
                  } className="btn" style={{color:"black",backgroundImage: "linear-gradient(120deg, #8cefa3, #5df8c5)"
    }}>{<Button onClick={ (showError === '') && validated  ? handleClickVariant('success','login'):handleClickVariant('warning','login') }>LOGIN</Button>}</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Login;

