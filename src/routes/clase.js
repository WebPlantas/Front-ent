const router = require('express').Router();
const {
    GetClase
  } = require('./../services/clase');

router.get('/adminprofesor', GetClase);




module.exports = router;