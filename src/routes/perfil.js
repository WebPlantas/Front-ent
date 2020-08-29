const router = require('express').Router();
const {
    GetNotas
} = require('./../services/perfil');

router.get('/perfil', GetNotas);

module.exports = router;