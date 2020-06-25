const mysql = require('mysql');
const { configDB } = require('./keys');

const Pool = mysql.createPool( configDB );

Pool.getConnection( (err, connection) => {
  if(!err)
    connection.release();
  else
    throw err;
  console.log( err ? err : "You're Now Connected to Mysql");
});

module.exports = {
  Pool
}