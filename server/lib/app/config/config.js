require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createConnection({
		"host": process.env.HOST ,
		"user": 'root' ,
		"password": process.env.PASSWORD_DB,
		"database": process.env.DATABASE
	});
  
  connection.connect();

module.exports = connection;


  