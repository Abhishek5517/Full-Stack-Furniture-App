
const express = require('express') ;
const router = express.Router() ;
const {addressUpdate,getAddress} = require('../controllers/userDetails') ;

router.put('/user/address',addressUpdate);
router.get('/user/address' , getAddress) ;

module.exports = router ;