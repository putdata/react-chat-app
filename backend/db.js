const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  port: 3306,
  database: 'chat'
});

module.exports = connection;