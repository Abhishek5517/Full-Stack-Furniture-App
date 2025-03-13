


var nodemailer = require('nodemailer');


const sendOTP = ( req , res ) =>{

  const otp = req.headers.otp ; 
  const email = req.headers.email ; 
  // let otp = Math.floor(1000 + Math.random() * 9000) ;
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'furniturebot9@gmail.com',
      pass: 'isjgpauotazpsxje'
    }
  });
  
  var mailOptions = {
    from: 'furniturebot9@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'Your OTP is : ' + otp
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({"result" :"message sent!"})
    }
  });
   
}

module.exports = {sendOTP} ;



