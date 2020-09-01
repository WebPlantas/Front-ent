const router = require('express').Router();
const {
    GetNotas,
    UpdateEstudiante
} = require('./../services/perfil');

router.get('/perfil', GetNotas);
router.post('/updateEstudiante', UpdateEstudiante)

module.exports = router;