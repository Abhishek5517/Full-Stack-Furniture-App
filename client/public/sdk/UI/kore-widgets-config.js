(function(KoreSDK){
    let jwtBotSub = localStorage.getItem('jwtSubBot') ;
    var KoreSDK=KoreSDK||{};

    var botOptionsWiz = {};
    botOptionsWiz.logLevel = 'debug';
    botOptionsWiz.koreAPIUrl = "https://bots.kore.ai";

    botOptionsWiz.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    botOptionsWiz.userIdentity = jwtBotSub;// Provide users email id here
    botOptionsWiz.botInfo = { name: "Zenith Furniture Bot", "_id": "st-18f07f58-645f-53b1-a7b6-59781b4ab540" }; // bot name is case sensitive
    botOptionsWiz.clientId = "cs-c73a0bb4-10b6-5b68-ae30-dea26740d0d8";
    botOptionsWiz.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

    var widgetsConfig = {
        botOptions: botOptionsWiz
    };
    
    KoreSDK.widgetsConfig=widgetsConfig
})(window.KoreSDK);