const express = require('express');

const { APP_PORT } = require('./src/const/const');

const app = module.exports = express();

//run server
app.listen(APP_PORT, () => {
    console.log(`Server Running in port : ${APP_PORT}`);
});
