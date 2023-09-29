const connection = require('../config/config.js');




exports.checkEmail = (email , callback) =>{
    const checkEmailQuery = 'SELECT * FROM accounts WHERE userEmail = ?'
    connection.query(checkEmailQuery ,[email], callback) ;
}

exports.insertAccount = (name , email , hashedPassword , callback) =>{
    const query = 'INSERT INTO accounts (userName, userEmail, userPassword) VALUES (?, ?, ?)';
    connection.query(query, [name, email, hashedPassword] , callback ) ;
}

exports.insertUserdetails = ( name , email , callback) =>{
    const query2 = 'INSERT INTO userdetails (userName, userEmail) VALUES (?, ?)' ;
    connection.query(query2, [name, email] , callback ) ;   
}


exports.detailsWithEmail = ( email , callback ) =>{
    const query = 'SELECT * FROM accounts WHERE userEmail = ?';
    connection.query(query, [email], callback) ;

}