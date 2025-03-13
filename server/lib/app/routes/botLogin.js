
const express = require('express');
const router = express.Router() ;
const {botLoginJWT} =  require('../controllers/botLoginJwt.js');


router.get('/sts' , botLoginJWT)

module.exports = router; 