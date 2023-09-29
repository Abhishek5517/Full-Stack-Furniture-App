
const express = require('express') ;
const router = express.Router() ;
const {addressUpdate , AddressGet , userDetailGet , userDetailUpdate} = require('../controllers/userDetails') ;
require('dotenv').config();
const authCheck = (req, res, next) => {
    
    if (!req.headers.auth || req.headers.auth != process.env.API_KEY) {
        res.status(404).json({ "error": "User not Identify" });
    } else {
        next();
    }
}
router.use(authCheck);
router.put('/user/address',addressUpdate );
router.get('/user/address' , AddressGet) ;
router.get('/user/userDetails' , userDetailGet) ;
router.put('/user/userDetails/update' ,userDetailUpdate)

module.exports = router ;