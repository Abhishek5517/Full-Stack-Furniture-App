var botId = "st-17d0aebd-a99a-5d4c-9f79-f81732436005";
var botName = "ZF Bot";
var sdk = require("./lib/sdk");
var nodemailer = require('nodemailer');
require('dotenv').config();

const sendOTP =  (email , otp) =>{

    // const otp = req.headers.otp ; 
    // const email = req.headers.email ; 
    // let otp = Math.floor(1000 + Math.random() * 9000) ;
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'furniturebot9@gmail.com',
        pass: process.env.PASSWORD 
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
        //   res.status(200).json({"result" :"message sent!"})
        }
      });
}


module.exports = {
    botId   : botId,
    botName : botName,

    on_user_message : function(requestId, data, callback) {
        // console.log(data.context);
        if (data.message === "huihui") {
          data.message = 'huehue';
            //Sends back 'Hello' to user.
            return sdk.sendUserMessage(data, callback);
        } else if(!data.agent_transfer){
            //Forward the message to bot
            return sdk.sendBotMessage(data, callback);
        } else {
            data.message = "Agent Message";
            return sdk.sendUserMessage(data, callback);
        }
    },
    on_webhook      : async function(requestId, data, componentName, callback) 
    {
          let context = data.context ; 
        //   console.log(componentName);
          if( componentName === 'PaymentDetailsWebhook'){
              const email = context.entities.userBuyEmail ; 
              const otp = context.otp ; 
              console.log(context.entities.userBuyEmail ,"botkit") ;
              console.log(context.otp , "botKit");
              sendOTP(email , otp ) ;
          }
       
          callback(null, data);
    },
    on_bot_message  : function(requestId, data, callback) {
        if (data.message === 'hello') {
            data.message = 'The Bot says hello!';
        }
        //Sends back the message to user
        
        return sdk.sendUserMessage(data, callback);
    },
    on_agent_transfer : function(requestId, data, callback){
        return callback(null, data);
    },
    on_event : function (requestId, data, callback) {
        console.log("on_event -->  Event : ", data.event);
        return callback(null, data);
    },
    on_alert : function (requestId, data, callback) {
        console.log("on_alert -->  : ", data, data.message);
        return sdk.sendAlertMessage(data, callback);
    }

};


