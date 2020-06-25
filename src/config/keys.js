const {
    HOST,
    PORT,
    USER,
    DB_PASSWORD,
    DB_DATABASE
} = require("./../const/const");

const configDB = {
    connectionLimit: 20,
    host: HOST,
    port: PORT,
    user: USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    multipleStatements: true
};

module.exports = {
    configDB
};