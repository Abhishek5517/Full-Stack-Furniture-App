const express = require('express') ;

const router = express.Router() ;

const {loginController , signUpController} = require('../controllers/loginController.js');


router.post('/login' , loginController) ;

router.post('/signUp' , signUpController);

module.exports = router ; 