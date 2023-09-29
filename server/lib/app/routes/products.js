
const express = require('express');
const router = express.Router() ;
const {productsPost , productsGet , oneProductGet ,productPostFromAPI} =  require('../controllers/productController.js');
require('dotenv').config();
const authCheck = (req, res, next) => {
    
    if (!req.headers.auth || req.headers.auth != process.env.API_KEY) {
        res.status(404).json({ "error": "User not Identify" });
    } else {
        next();
    }
}
router.use(authCheck);

router.post('/products' , productsPost) ;
router.get('/products' , productsGet) ;
router.get('/products/:id' , oneProductGet) ;
router.post('/products/:type' , productPostFromAPI);

module.exports = router; 