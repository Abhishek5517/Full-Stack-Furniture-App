import React, { useEffect, useState } from 'react'
import '../../style/LoginSecurity.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

const EditPopup = () => {
    return (
        <>
            <Popup trigger={<button> Click to open popup </button>}
                position="right centre">
                <div>Scaler Academy</div>
                <button>Click here</button>
            </Popup>
        </>
    )
}
const LoginSecurity = () => {
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        if( variant === 'warning'){
           enqueueSnackbar('please ensure field is valid and filled', {variant});
        }else{
    
          enqueueSnackbar('phone number updated successfully!', { variant });
        }
      };
    const [isValidPhone, setisValidPhone] = useState(true);
    const [phone , setPhone] = useState('');
    const [userData, setUserData] = useState({});
    const [userEmail, setUserEmail] = useState(localStorage.getItem('jwtSubBot'));
    useEffect(() => {
        fetch('http://localhost:8080/user/userDetails', {
            headers: {
                "useremail": userEmail,
                "auth" : 'abhi123'
            },
        }).then(response => response.json())
            .then(data => {
                setUserData(data);
            });
    }, [])
    const validatePhone= () =>{
        let a = true ; 
        if ((/^(?:\+?\d{1,3}[-\s]?)?(?:\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,}-?\d{1,}-?\d{1,}$/).test(phone)) {
     
            setisValidPhone(true);
        }
        else {
            a= false;             
            setisValidPhone(false);
        }
        return a ; 
    }
    return (
        <div className="user-profile-details">
            <div className="profile-id">
                <div style={{textAlign:'center'}} >
                    <h1> Account Details </h1>
                </div>
            </div>
            <div className="profile-name">
                <div className="name-icon">
                    <i className="fa-solid fa-file-signature fa-xl" style={{ color: "#020424" }}></i>
                </div>
                <div className="name-name">
                    <h3>{userData.userName}</h3>
                </div>
            </div>
            <div className="profile-email">
                <div className="email-icon">
                    <i className="fa-solid fa-envelope fa-xl" style={{ color: "#020424" }}></i>
                </div>
                <div className="email-name">
                    <h3>{userData.userEmail}</h3>
                </div>
            </div>
            <div className="profile-phoneNumber">
                <div className="phoneNumber-icon">
                    <i className="fa-solid fa-phone fa-xl" style={{ color: "#020424" }}></i>
                </div>
                <div className="phoneNumber-name">
                    <h3>{userData.userPhone ? userData.userPhone : '----'}</h3>
                </div>
                <div className="edit-phone">

                    <buttom data-bs-toggle="modal" data-bs-target="#editPhone"> <i className="fa-solid fa-file-pen fa-2xl" style={{ color: "#020424" }}> </i></buttom>
                </div>
            </div>
            <div className="modal fade" id="editPhone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form id="editForm" >
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Phone Number</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label for="phone" className="form-label">Phone :</label>
                                    <input type="tel" className="form-control" id="phone" name="phone" onChange={(e)=>{
                                        setPhone(e.target.value) 
                                    }} value={phone} required />
                                    {
                                        !isValidPhone && (
                                            <span className="error-tooltip" data-tip="phone is required">
                                                ❗ Please Provide a valid phone number
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button  onClick={(e) =>{
                                    e.preventDefault();
                                    if(validatePhone()){
                                        let data = {
                                            "userPhone" : phone,
                                            "userAddress" : userData.userAddress ? userData.userAddress : '' 
                                        }
                            
                                        fetch('http://localhost:8080/user/userDetails/update' , {
                                            method : "PUT",
                                            headers :{
                                                "Content-Type" : "application/json",
                                                "auth" : "abhi123",
                                                "useremail" : userData.userEmail,
                                               
                                            },
                                            body: JSON.stringify(data), 
                                        })
                                    }
                                }}   >{<Button onClick={(isValidPhone&phone) ? handleClickVariant('success') :handleClickVariant('warning')  }>Update Phone</Button>}</button>
                            </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginSecurity;