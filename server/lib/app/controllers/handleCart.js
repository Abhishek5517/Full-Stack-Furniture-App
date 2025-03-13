const fs = require('fs');
const path = require('path');

const db = require('../models/handleCartModel.js') ;


const imageDirectory = path.join(__dirname,'../images');

function getImageURL(imageData) {
    var base64Flag = "data:image/jpeg;base64,";
    var imageStr = arrayBufferToBase64(imageData);
    let imageURL = base64Flag + imageStr;
    return imageURL;
  }

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  };
const insertToCart = ( req , res ) =>{

    const userEmail = req.headers.useremail ;
    const { productId , supplierId} = req.body ;

  
    const checkCartQuery = 'Select * from cart where productId = ?' ;
    db.checkCart( productId  , (err, checkResult) =>{
      if (err) {
        console.error('error uploading data:', err);
        return res.status(500).json({ error: 'Error adding to cart' });
      }
      if( checkResult[0] ){
        return res.status(404).json({ error: 'Item already in cart' });
      }else{
        
        db.insertIntoCart(productId , supplierId , userEmail , (err, result) => {
          if (err) {
            console.error('error uploading data:', err);
            return res.status(500).json({ error: 'Error adding to cart' });
          }
          return res.status(201).json({ message: 'Added to successfully!' });
        
        });
      }
    
    });
  
  
}

const removeFromCart = ( req , res ) =>{
    let productId = req.params.id;
    let userEmail = req.headers.useremail ;

    db.getCartProduct( productId , (err , result)=>{
       if( err ){
        console.error('error fetching data:', err);
        return  res.status(500).json({"error":"error in fetching details"}) ;
       }
       if( result[0]){
      
        db.deleteFromCart( productId , userEmail, (err, result) => {
            if (err) {
              console.error('error uploading data:', err);
              return res.status(500).json({ error: 'Deleting to cart not successful ' });
            }
            return res.status(201).json({ message: 'Deleted successfully!' });
          
          });
       }
    })
  
}

const getDetailsCart = async ( req ,res ) =>{
    
    const userEmail = req.headers.useremail ;
   
      db.cartDetails(userEmail , (err , result) =>{
          if(err){
            console.error("error getting cart Details") ;
            res.status(500).json({"error" : "error getting data!"});
          } 
          if( result.length === 0 ){
            res.status(404).json({"result" : "Nothing in the cart!"});
          }    
          for( let i = 0 ; i < result.length ; i++){
            let imageId = 'f_' + result[i].productId ;
            let base64Data = arrayBufferToBase64(result[i].productImage);
            fs.writeFile(`${imageDirectory}/${imageId}.png`, base64Data, 'base64', function(err) {
              console.log(err);
            });
            result[i].productImage = `${imageId}.png` ;
            if( i === result.length - 1 ){
              res.status(200).json(result);
              return ;
            }
          }
         
      }) ;  
    
}

module.exports = { insertToCart , removeFromCart , getDetailsCart } ;