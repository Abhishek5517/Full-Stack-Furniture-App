require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
		"host": process.env.HOST ,
		"user": process.env.USER,
		"password": process.env.PASSWORD_DB,
		"database": process.env.DATABASE
	});
  
  connection.connect();

module.exports = connection;


  