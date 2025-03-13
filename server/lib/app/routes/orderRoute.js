const {getOrder ,postOrder} = require('../controllers/orders.js');

const express = require('express');
const router = express.Router() ;
require('dotenv').config();
const authCheck = (req, res, next) => {
    
    if (!req.headers.auth || req.headers.auth != process.env.API_KEY) {
        res.status(404).json({ "error": "User not Identify" });
    } else {
        next();
    }
}
router.use(authCheck);
router.get('/orders', getOrder) ;
router.post('/order', postOrder) ;
module.exports = router; 