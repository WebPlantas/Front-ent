const { config } = require("dotenv");

config();

module.exports = {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    APP_PORT: process.env.PORT_APP,
    SECRETKEY: process.env.SECRET,
    EMAIL: process.env.EMAIL,
    COMPANY: process.env.COMPANY,
    PASSWORD: process.env.PASSWORD
};