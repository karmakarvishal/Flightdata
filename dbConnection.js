/* eslint-disable linebreak-style */
const mysql = require('mysql2');
const Logger = require('./logger');
const syslog = new Logger().getInstance();
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    syslog.log(err.message);
  } else {
    syslog.log('Connected to MYSQL Server');
  }
});

module.exports = connection;


