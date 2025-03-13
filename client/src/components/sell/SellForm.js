// import { TagInput } from "react-awesome-tags-input";
import { useState } from "react";
import '../../style/sellForm.css';
import { TagsInput } from "react-tag-input-component";
import productsData from '../../data/ProductsData.json' ;

import Button from '@mui/material/Button';
import {  useSnackbar } from 'notistack';


const SellForm = () => {
  const { enqueueSnackbar } = useSnackbar();
 
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dimension: '',
    product_name: '',
    product_price: '',
    address:'',
    type: '',
    image: '',
    product_description: ''
  });

  const [isValidName , setisValidName] = useState(true) ;
  const [isValidEmail , setisValidEmail] = useState(true) ;
  const [isValidPhone , setisValidPhone] = useState(true) ;
  const [isValidProductName , setisValidProductName] = useState(true) ;
  const [isValidType , setisValidType] = useState(true) ;
  const [isValidDimension , setisValidDimension ] = useState(true) ;
  const [isValidForm , setisValidForm ] = useState(false);

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      headers :{
        "auth" : 'abhi123'
      },
      body: data, 
    });
    return response.json();
  }
  
  
  const addValue = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const addAddress = (e) => {
    setAddressData((prev) => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }

  function getAddress(){
      let street = addressData.street ;
      let country = addressData.country ;
      let postalCode = addressData.postalCode ;
      let state = addressData.state ;
      let city = addressData.city ;
      const address = street + ', ' + city +', '+postalCode+', '+state+', '+country ;
      return address ;
  }


  const addToProductsPage = (payload) =>{
    console.log(payload , "addToProductPage");
    let data = JSON.stringify(formData);
    console.log(data);
    productsData.push(data);
  }
  
  const postSellFormData = () =>{
    let Address = getAddress() ;
    setFormData((prev) =>{
      return {
        ...prev , address: Address 
      }
    });
    const form = document.getElementById('sellingForm');
    let payload = new FormData(form) ;
   
    let formObject = Object.fromEntries(payload.entries());
  
    addToProductsPage(formObject);
    try{

      let response = postData('http://localhost:8080/products' , payload ) ;
    }
    catch(err){
      console.error(err);
    }
    

  }

  
  const VadidateSellForm = () =>{
    let a = true;
    // name
    if ((/^[a-zA-Z]+ [a-zA-Z]+$/).test(formData.name)) {
        setisValidName(true);

    }
    else {
        setisValidName(false);
        
       a= false;
    }
    //phone
    if ((/^(?:\+?\d{1,3}[-\s]?)?(?:\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,}-?\d{1,}-?\d{1,}$/).test(formData.phone)) {
     
        setisValidPhone(true);
    }
    else {
        a= false;             
        setisValidPhone(false);
    }
    // email
    if( (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(formData.email)){
      setisValidEmail(true);
    }
    else{
      a= false;             
      setisValidEmail(false);
    }

  if( formData.type === 'table'|| formData.type === 'chair'|| formData.type === 'bed' || formData.type === 'sofa' ){
      setisValidType(true) ;
  }else{
    setisValidType(false) ;
    a = false ;
  }
  if( (/^\d+Lx\d+Bx\d+H$/).test(formData.dimension) ){
    setisValidDimension(true) ;
  }
  else{
    a = false ;
    console.log(formData.dimension)
    setisValidDimension(false) ;
  }

  return a ; 
  }

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    if( variant === 'warning'){
       enqueueSnackbar('please ensure every field is valid and filled', {variant});
    }else{

      enqueueSnackbar(`${formData.product_name} is added successfully!`, { variant });
    }
  };

  return ( <>
  <div style={{textAlign:'center',padding:'1em'}}><h4>You can sell your product here by simply filling and uploading the product details in this form</h4></div>
  <div style={{display:'flex'}}>
    <div className='sell-images'>
      <img className='sell-img' src='./sellImage.jpg' alt='...'/>
      <img className='sell-img'  src='./sellImage2.webp' alt='...'/>
      <img className='sell-img'  src='./sellImage3.png' alt='...'/>
    </div>

    <div className="selling-form-container">
      <h2 className="sellingFormHeading">Selling details</h2>
      <form id="sellingForm" >
        <div className="mb-3">
          <label for="name" className="form-label" >Name :</label>
          <input type="text" className="form-control" id="name" name="name" onChange={(e) => addValue(e)} value={formData.name} required />
          {
              !isValidName && (
                    <span className="error-tooltip" data-tip="Name is required">
                          ❗ Please Provide a proper name
                   </span>
                   )
          }
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">Email :</label>
          <input type="email" className="form-control" id="email" name="email" onChange={(e) => addValue(e)} value={formData.email} required />
          {
              !isValidEmail && (
                    <span className="error-tooltip" data-tip="Name is required">
                          ❗ Please Provide a proper email
                   </span>
                   )
          }
        </div>
        <div className="mb-3">
          <label for="phone" className="form-label">Phone :</label>
          <input type="tel" className="form-control" id="phone" name="phone" onChange={(e) => addValue(e)} value={formData.phone} required />
          {
              !isValidPhone && (
                    <span className="error-tooltip" data-tip="Name is required">
                          ❗ Please Provide a valid phone number
                   </span>
                   )
          }
        </div>

        <p>Address :</p>
        <div className="sellFormAddress">
          <div class="mb-3">
            <label for="street" class="form-label">Street Address:</label>
            <input type="text" class="form-control" id="street" name="street" onChange={(e) => { addAddress(e); }} value={addressData.street} required />
          </div>

          <div class="mb-3">
            <label for="city" class="form-label">City:</label>
            <input type="text" class="form-control" id="city" name="city" onChange={(e) => { addAddress(e); }} value={addressData.city} required />
          </div>

          <div class="mb-3">
            <label for="state" class="form-label">State/Province:</label>
            <input type="text" class="form-control" id="state" name="state" onChange={(e) => { addAddress(e); }} value={addressData.state} required />
          </div>

          <div class="mb-3">
            <label for="postalCode" class="form-label">Postal Code:</label>
            <input type="text" class="form-control" id="postalCode" name="postalCode" onChange={(e) => { addAddress(e); }} value={addressData.postalCode} required />
          </div>

          <div class="mb-3">
            <label for="country" class="form-label">Country:</label>
            <input type="text" class="form-control" id="country" name="country" onChange={(e) => { addAddress(e); }} value={addressData.country} required />
          </div>
        </div>

 


 {/* Now product form details */}


        <div className="mb-3">
          <label for="product_name" className="form-label">Product Name :</label>
          <input type="text" className="form-control" id="selling-product-name" name="product_name" onChange={(e) => addValue(e)} value={formData.product_name} required />
          {
              !isValidProductName && (
                    <span className="error-tooltip" data-tip="Name is required">
                          ❗ Please Provide a valid product name
                   </span>
                   )
          }
        </div>
        <div className="mb-3">
          <label for="product_price" className="form-label">Product Price in Rupees(₹):</label>
          <input type="number" className="form-control" id="selling-product-price" name="product_price" min='0' onChange={(e) => addValue(e)} value={formData.product_price} required />
          {
              !isValidType && (
                    <span className="error-tooltip" data-tip="Name is required">
                          ❗ Please select a valid type as sofa, table, chair, and bed
                   </span>
                   )
          }
        </div>
        <div className="row mb-3 g-3">

        <label for="type" className="form-label">Select product type :</label>
          <div className='type-tag'>
            <TagsInput
              value={selected}
              onChange={setSelected}
              name="type"
            />
            
            <select name="type" id="select_type" className="form-control" onChange={(e) => {
              console.log(e.target.value)
              addValue(e);
              setSelected((prev) => [e.target.value]);
            }} required>
              <option value="table">table</option>
              <option value="chair">chair</option>
              <option value="sofa">sofa</option>
              <option value="bed">bed</option>
            </select>

          </div>
        </div>
        <div className="mb-3">
          <label for="dimension" className="form-label">Dimension :</label>
          <input type="text" className="form-control" id="selling-product-dimension" name="dimension" onChange={(e) => addValue(e)} value={formData.dimension} required />
          {
              !isValidDimension && (
                    <span className="error-tooltip" data-tip="Name is required">
                          ❗ Please Provide a valid product dimension as 100Lx80Bx50H
                   </span>
                   )
          }
        </div>
        <div className="mb-3">
          <label for="imageUpload" className="form-label">Upload Product Image :</label>
          <input type="file" className="form-control" id="imageUpload" accept="image/*" name='image' onChange={(e) => addValue(e)} value={formData.image} />
        </div>
        <div className="mb-3">
          <label for="selling-product-description">Products Description :</label><br />
          <textarea id="sellingFormTextArea" rows="4" cols="70" name="product_description" form="sellingForm" onChange={(e) => addValue(e)} value={formData.product_description}>
          </textarea>
        </div>
        <div className="selling-form-submit-btn">
          <button  onClick={(e)=>{
            e.preventDefault();
            if( VadidateSellForm()){
              // console.log("huihui")
              setisValidForm(true) ;
            postSellFormData();
            }else{
              setisValidForm(false);
            }
          }} >{<Button onClick={isValidForm ? handleClickVariant('success') : handleClickVariant('warning') }>Submit</Button>}</button>
        </div>
          
      </form>
    </div>
    </div>
    </>
  )
}

export default SellForm;