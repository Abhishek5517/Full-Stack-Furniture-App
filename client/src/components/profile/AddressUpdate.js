import { useEffect, useState } from 'react'
import '../../style/AddressUpdate.css';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const AddressUpdate = () => {
    const navigate = useNavigate() ;
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
      enqueueSnackbar('I love snacks.');
    };
  
    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        if( variant === 'warning'){
           enqueueSnackbar('please ensure every field is valid and filled', {variant});
        }else{
    
          enqueueSnackbar('Address update successfully!', { variant });
          navigate('/profile/address');
        }
      };
  
   const [token , setToken] = useState(null);
    useEffect(()=>{
        let jwtToken = localStorage.getItem('token');
        setToken(jwtToken) ;
    },[])
    const [addressData, setaddressData] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
   
    const [isValidPostalCode, setisValidPostalCode] = useState(true);
    
    const addData = (e) => {
        setaddressData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function validateAddress(){
        let a = true ; 
        
            
        if(/^[1-9][0-9]{5}$/.test(addressData.postalCode)){
            setisValidPostalCode(true) ;
        }
        else{
            setisValidPostalCode(false);
            a = false;
        }
        return a ; 
    }
    async function postData(url = "", data = {}) {
        console.log(data);
        const response = await fetch(url, {
          method: "PUT", 
          headers:{
            'Content-Type':'application/json',
            'Authorization': token,
            "auth" : 'abhi123'
          },
          body: JSON.stringify(data), 
        });
        return response.json();
      }
    const editData = () => {
        const valid = validateAddress();
        
       
        if( valid){
           let response = postData('http://localhost:8080/user/address', addressData) ;
           handleClickVariant('success') ;
        }else{
            handleClickVariant('warning') ;
        }
    }


    return (
        <div className="Address-edit">
            <div className="form_header">
                <h2>
                    Address Update
                </h2>
                <br></br>
                <br></br>
            </div>
            <form >
                <div className="addressUpdataForm">
                    <div className="mb-3">
                        <label for="street" className="form-label">Street Address:</label>
                        <input type="text" className="form-control" id="street" name="street" onChange={(e) => addData(e)} value={addressData.street} required />
                     
                    </div>

                    <div className="mb-3">
                        <label for="city" className="form-label">City:</label>
                        <input type="text" className="form-control" id="city" name="city" onChange={(e) => addData(e)} value={addressData.city} required />
                    </div>

                    <div className="mb-3">
                        <label for="state" className="form-label">State/Province:</label>
                        <input type="text" className="form-control" id="state" name="state" onChange={(e) => addData(e)} value={addressData.state} required />
                    </div>

                    <div className="mb-3">
                        <label for="postalCode" className="form-label">Postal Code:</label>
                        <input type="text" className="form-control" id="postalCode" name="postalCode" onChange={(e) => addData(e)} value={addressData.postalCode} required />
                        {
                            !isValidPostalCode && (
                                <span className="error-tooltip" data-tip="Name is required">
                                    ❗ Please Provide a valid postal code 
                                </span>
                            )
                        }
                    </div>

                    <div className="mb-3">
                        <label for="country" className="form-label">Country:</label>
                        <input type="text" className="form-control" id="country" name="country" onChange={(e) => addData(e)} value={addressData.country} required />
                    </div>
                </div>
                <div className="address-edit-submit">
                    <button   onClick={(e) => {
                        e.preventDefault();
                                  editData();
                            
                    }

                   }>{<Button onClick={isValidPostalCode ? handleClickVariant('success'):handleClickVariant('warning')}>Submit</Button>}</button>
                </div>
            </form>

        </div>
    )
}

export default AddressUpdate ;