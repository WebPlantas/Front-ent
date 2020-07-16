const mysql = require('mysql');
const { promisify } = require('util')
const { configDB } = require('./keys');

const pool = mysql.createPool( configDB );


Pool.getConnection( (err, connection) => {
  if(!err)
    connection.release();
  else
    throw err;
  console.log( err ? err : "You're Now Connected to Mysql");
});

//Promisify pool querys 
pool.query = promisify(pool.query);


module.exports = {
  pool
};