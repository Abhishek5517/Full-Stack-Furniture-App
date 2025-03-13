// Variables
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);

var jwtlib = require('jsonwebtoken');
//Configure port
var port=8081;

//App directories
var PROJECT_DIR = path.normalize(__dirname);

app.use('/',express.static(path.join(PROJECT_DIR, '')));

http.listen(port, function(){
    console.log('Sample Application runnning at http://localhost:'+port+'/UI');
});


app.get('/sts' , (req , res) =>{
   
    res.set({
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Methods":"*",
    }) ;

    const jwt = generateJWTToken();
    data = {
        jwt :jwt
    };
    res.send(JSON.stringify(data));
});


function generateJWTToken(){
    const payload = {
        "iat" : ( new Date().getTime())/1000,
        "exp" : (( new Date().getTime())/1000) + 86400,
        "aud" : "https://idproxy.kore.ai/authorize",
        "iss" : "cs-1bfa9d38-71c0-53dd-bd1e-cb2083506967",
        "sub" :  "abhishekkumre2001@gmail.com"
    }
    const secret = "f/rnN80kxsibjBqDtRcfUCfd/0KoFXaNtWFLCWvGXkA=" ;
    var token = jwtlib.sign(payload , secret) ;
    return token ; 
}