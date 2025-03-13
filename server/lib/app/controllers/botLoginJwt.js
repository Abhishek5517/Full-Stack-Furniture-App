const jwtlib = require('jsonwebtoken');




const botLoginJWT = (req , res ) =>{
    let sub = req.headers.jwtbotsub ;
    res.set({
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Methods":"*",
    }) ;

    const jwt = generateJWTToken(sub);
    data = {
        jwt :jwt
    };
    res.send(JSON.stringify(data));


}

function generateJWTToken(sub){
    const payload = {
        "iat" : ( new Date().getTime())/1000,
        "exp" : (( new Date().getTime())/1000) + 86400,
        "aud" : "https://idproxy.kore.ai/authorize",
        "iss" : "cs-c73a0bb4-10b6-5b68-ae30-dea26740d0d8",
        "sub" :  sub
    }
    const secret = "Tyu5uyPTdcd/m+6RDIiQbd7D315T3Gb02Lq7bhrUOWo=" ;
    var token = jwtlib.sign(payload , secret) ;
    return token ; 
}


module.exports = { botLoginJWT };