const connection = require('../config/config');


exports.updateAddress = (Address, userId ,callback) =>{
    let query = 'update userdetails set userAddress = ? where userId = ? ' ;
    connection.query(query ,[Address,userId ] ,callback);
}


exports.getAddress = (userId , callback) =>{
    let query = 'Select userAddress from userdetails where userId = ?' ;
    connection.query(query , [userId] , callback);
}


exports.getUserDetails = (userEmail , callback) =>{
    const query = `SELECT * From userdetails where userEmail = ?`
    connection.query(query , [userEmail] , callback);
}


exports.updateUserDetails = ( userPhone , userAddress, userEmail , callback) =>{
    const query = 'update userdetails set userPhone = ? , userAddress = ? where userEmail = ?' ;
    connection.query(query , [userPhone , userAddress, userEmail], callback);
}