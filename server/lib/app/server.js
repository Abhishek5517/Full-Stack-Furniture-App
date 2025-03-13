require('dotenv').config();
// var Application = require("./lib/app");/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appExp = express();
const PORT = 8080;
const productRoutes =  require('./routes/products.js');
const loginSignUpRoutes = require('./routes/login.js');
const botLoginRoutes = require('./routes/botLogin.js')
const cartRoutes = require('./routes/cart.js');
const userRoutes = require('./routes/user.js');
const otpRoutes = require('./routes/OTP.js');
const orderRoutes = require('./routes/orderRoute.js');
const PaymentRoutes = require('./routes/paymentRouteStripe.js')


const authCheck = ( req , res , next ) =>{
    // console.log(req.headers.auth);
    if( !req.headers.auth || req.headers.auth != 'abhi123'){
        res.status(404).json({"error" : "User not Identified"}) ;
    }else{
        next();
    }
}





appExp.use(express.json());
appExp.use(express.static('public'));
appExp.use('/images', express.static('images'));
appExp.use(bodyParser.json());
// var PROJECT_DIR = path.normalize(__dirname);
// app.use('/',express.static(path.join(PROJECT_DIR, '')));

appExp.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT , DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();  

});
// appExp.use(authCheck) ;
appExp.use(loginSignUpRoutes);
appExp.use(productRoutes)    ;
appExp.use(botLoginRoutes)   ;
appExp.use(cartRoutes)       ;
appExp.use(userRoutes)       ;
appExp.use(otpRoutes)        ;
appExp.use(orderRoutes)      ;
appExp.use(PaymentRoutes);
appExp.listen(PORT, () => {
    console.log(`server running on port :${PORT}`);
});
 