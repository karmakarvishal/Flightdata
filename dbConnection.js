let mysql = require('mysql2');
const logger = require('./logger');
const syslog = new logger().getInstance();

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'karmakar#123',
  database: 'flightdb'
});

// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    syslog.log(err.message);
  }
  syslog.log("Connected to MYSQL Server")
});

module.exports = connection;



