const mysql = require('mysql');
const { configDB } = require('./keys');

const pool = mysql.createPool( configDB );

pool.getConnection((err, connection) => {
  if(!err)
    connection.release();
  else
    throw err;
  console.log( err ? err : "You're Now Connected to Mysql");
});

module.exports = {
  pool
};