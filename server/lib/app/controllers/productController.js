const formidable = require('formidable');
const connection = require('../config/config');
const path = require('path');
const db = require('../models/productModel.js');
const imageDirectory = path.join(__dirname,'../images');

const axios = require('axios');
const fs = require('fs');

async function downloadImage(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const isValidUrl = urlString => {
  try {
    return Boolean(new URL(urlString));
  }
  catch (e) {
    return false;
  }
}

const productPostFromAPI = ( req , res ) =>{

    let payload = req.body.data.products ; 
  
      let productTableData  = [] ;
      let supplierTableData = [] ;
      for( let i = 0 ; i < payload.length ; i++){
        let name = "Abhishek" ;
        let email = "abhishekkumre2001@gmail.com" ;
        let Address = "" ;
        let phone = "+917049250673" ;
        let product_name =  payload[i]["product_title"].split(" ").length > 1 ? payload[i]["product_title"].split(" ")[0] +" "+ payload[i]["product_title"].split(" ")[1] : payload[i]["product_title"].split(" ")[0];
        let type = req.params.type  ;
        let dimension = '' ;
        let product_price = payload[i]["product_price"].slice(1);
        let product_description = payload[i]["product_title"] ;
      // let imageURL ; 
    
      downloadImage(payload[i]["product_photo"])
        .then((imageData) => {
         
         db.getSupplierId( (err, result) => {
            if (err) {
              console.error('error uploading data:', err);
              return res.status(500).json({ error: 'Error in inserting data' });
            }
            let supplierId = 0;
            let lastId = result[0].supplierId;
            supplierId = lastId ? (lastId + i + 1) : 1;
           
            productTableData.push([product_name, product_price, type, type, dimension, imageData, product_description,supplierId])
        
            supplierTableData.push([name, email, phone, Address]);
            imageURL = imageData ;
        
            if( payload.length === productTableData.length && supplierTableData.length === payload.length ){
           
                db.insertSupplierData(supplierTableData, (err, result) => {
                  if (err) {
                    console.error('error uploading data:', err);
                    return res.status(500).json({ error: 'Error adding supplier details' });
                  }

                db.insertProductData(productTableData,  (err, result) => {
                    if (err) {
                      console.error('error uploading data:', err);
                      return res.status(500).json({ error: 'Error creating product' });
                    }
                  return res.status(201).json({ message: 'product and supplier Added successfully!' });
                });
                });
            }
            })
          }).catch((err) => {
            console.error('Error downloading image:', err);
          });;
    }
  }

const postData = (dataSet , res) =>{
  const {name, email, phone, Address,product_name, product_price, type, dimension, image, product_description } = dataSet;
  db.getSupplierId( (err, result) => {
    if (err) {
      console.error('error uploading data:', err);
      return res.status(500).json({ error: 'Error in inserting data' });
    }
    let supplierId = 0;
    let lastId = result[0].supplierId;
    supplierId = lastId ? (lastId + 1) : 1;

    db.insertProductDetails(product_name, product_price, type, dimension, image, product_description, supplierId  ,(err, result) => {
      if (err) {
        console.error('error uploading data:', err);
        return res.status(500).json({ error: 'Error creating product' });
      }
     db.insertSupplierDetails( name, email, phone, Address, (err, result) => {
        if (err) {
          console.error('error uploading data:', err);
          return res.status(500).json({ error: 'Error adding supplier details' });
        }
      });
      return res.status(201).json({ message: 'product and supplier Added successfully!' });
    });

  });


}

const productsPost = (req, res) => {

  let payload = req.body;
  
  if (isValidUrl(payload.image)) {
   
    let name = payload.name ;
    let email = payload.email ;
    let Address = payload.Address ;
    let phone = payload.phone ;
    let product_name = payload.product_name ;
    let type = payload.type[0] ;
    let dimension = payload.dimension ;
    let product_price = payload.product_price ;
    let product_description = payload.product_description ;
    
    let image ; 

    downloadImage(payload.image)
      .then((imageData) => {
      image = imageData ;   
      let dataSet = {name, email, phone, Address,product_name, product_price, type, dimension, image, product_description } ;
      postData(dataSet , res) ;
 
 
      })
      .catch((err) => {
        console.error('Error downloading image:', err);
      });

  }
  else{
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      else {
        let image = fs.readFileSync(files.image[0].filepath);
        let { name, email, phone, Address } = getSupplierDetails(fields);
        let { product_name, product_price, type, dimension, product_description } = getProductDetails(fields);
        let dataSet = {name, email, phone, Address,product_name, product_price, type, dimension, image, product_description } ;

        postData(dataSet , res) ;

   
      }
    });
  }

}

function getProductDetails(fields) {
  let product_name = fields.product_name[0];
  let product_price = fields.product_price[0];
  let type = fields.type[1];
  let dimension = fields.dimension[0];
  let product_description = fields.product_description[0];
  return { product_name, product_price, type, dimension, product_description };
}

function getSupplierDetails(fields) {
  let name = fields.name[0];
  let email = fields.email[0];
  let phone = fields.phone[0];
  let Address = getAddress(fields);
  return { name, email, phone, Address };
}
function getAddress(fields) {
  let street = fields.street[0];
  let country = fields.country[0];
  let postalCode = fields.postalCode[0];
  let state = fields.state[0];
  let city = fields.city[0];
  const address = street + ', ' + city + ', ' + postalCode + ', ' + state + ', ' + country;
  return address;
}



function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return btoa(binary);
};


function getImageURL(imageData) {
  var base64Flag = "data:image/jpeg;base64,";
  var imageStr = arrayBufferToBase64(imageData);
  let imageURL = base64Flag + imageStr;
  return imageURL;
}

const productsGet = (req, res) => {

  const query = ' SELECT * from products';
  db.getProducts( (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
      return;
    }
    const data = results;
   db.getSupplier( (err, results) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Data not found' });
        return;
      }
      let finalData = [];
      let supplierData = results;
      for (let i = 0; i < data.length; i++) {
        let imageId = 'f_' + data[i].productId ;
        let base64Data = arrayBufferToBase64(data[i].productImage);
        fs.writeFile(`${imageDirectory}/${imageId}.png`, base64Data, 'base64', function(err) {
          console.log(err);
        });
        
        data[i].productImage = `${imageId}.png` ;
        finalData.push({
          ...data[i], ...supplierData[i]
        });
      }
      res.status(200).json(finalData);
    });

  });

}


const oneProductGet = (req, res) => {

  let productId = parseInt(req.params.id);

  const query = " Select * from products where productId = ?";
   db.getOneProduct(productId , (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
      return;
    }
    const data = results[0];
    const blob = new Blob([data.productImage]);
    
    let imageId = 'f_' + data.productId ;
    let base64Data = arrayBufferToBase64(data.productImage);
    fs.writeFile(`${imageDirectory}/${imageId}.png`, base64Data, 'base64', function(err) {
      console.log(err);
    });
    data.productImage = `${imageId}.png` ;
    


    res.status(200).json(data);

  });



}
module.exports = { productsPost, productsGet, oneProductGet ,productPostFromAPI };