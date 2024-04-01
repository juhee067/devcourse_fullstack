// Create the connection to database
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pt_Youtube',
  dateStrings: true,
});

module.exports = connection;
