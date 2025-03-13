const express = require('express');
const router = express.Router() ;
const {sendOTP}  = require('../controllers/sendOTP') ;
require('dotenv').config();
const authCheck = (req, res, next) => {
    
    if (!req.headers.auth || req.headers.auth != process.env.API_KEY) {
        res.status(404).json({ "error": "User not Identify" });
    } else {
        next();
    }
}
router.use(authCheck);
router.get('/otp' , sendOTP) ;

module.exports = router; 