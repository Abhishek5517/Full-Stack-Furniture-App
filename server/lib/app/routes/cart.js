const express = require('express');

const router = express.Router();
const { insertToCart, removeFromCart, getDetailsCart } = require('../controllers/handleCart.js');
const { productsPost, productsGet } = require('../controllers/productController.js');
require('dotenv').config();
const authCheck = (req, res, next) => {
    
    if (!req.headers.auth || req.headers.auth != process.env.API_KEY) {
        res.status(404).json({ "error": "User not Identify" });
    } else {
        next();
    }
}
router.use(authCheck);
router.get('/cart', getDetailsCart);
router.post('/cart', insertToCart);
router.delete('/cart/:id', removeFromCart)

module.exports = router; 