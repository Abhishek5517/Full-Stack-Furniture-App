const db = require('../models/orderModel.js');
const fsExtra = require('fs-extra');
const fs = require('fs');
const path = require('path');


const imageDirectory = path.join(__dirname,'../images');
const short = require('shortid');
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

const getOrder = (req, res) => {

    const userEmail = req.headers.useremail;



  db.getOrders(userEmail ,  (err, result) => {
        if (err) {
            console.error("error fetching orders", err);
            res.status(500).json({ "error": "internal server error" });
        }
        fsExtra.emptyDirSync(imageDirectory) ;
        if (result.length) {
            for (let i = 0; i < result.length; i++) {
                let imageId = 'f_' + result[i].productId;
                let base64Data = arrayBufferToBase64(result[i].productImage);
                fs.writeFile(`${imageDirectory}/${imageId}.png`, base64Data, 'base64', function (err) {
                    console.log(err);
                });

                result[i].productImage = `${imageId}.png`;
            }
        }

        res.status(200).json(result);
    });

}

const postOrder = (req, res) => {
    const userEmail = req.headers.useremail;
    const productId = req.body.productId;
    const getSupplierId = "SELECT supplierId from products WHERE productId = ?"
   db.getSuppliersId(productId, (err, result) =>{
        if( err ){
            console.error("error getting orders");
           return res.status(500).json({"error":"internal server error"}) ;
            
        }
        let supplierId = result[0].supplierId ;
       
    db.insertOrder(productId ,userEmail , supplierId ,(err, result) => {
        if (err) {
            console.error('error uploading data:', err);
            return res.status(500).json({ error: 'Error placing order' });
        }
       return res.status(201).json({ "result": "order placed!" });
    });

    })
    
   

}


module.exports = { getOrder, postOrder };