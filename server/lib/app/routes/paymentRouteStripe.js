const express = require('express') ;
const {paymentStripe} = require('../controllers/payment.js');
const router = express.Router();
require('dotenv').config();
const authCheck = (req, res, next) => {
    
    if (!req.headers.auth || req.headers.auth != process.env.API_KEY) {
        res.status(404).json({ "error": "User not Identified" });
    } else {
        next();
    }
}
router.use(authCheck);
router.post('/create-checkout-session', paymentStripe) ;

module.exports = router; 