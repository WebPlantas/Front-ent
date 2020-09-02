const router = require('express').Router();
const {
    GetNotas,
    UpdateEstudiante,
    UpdateUser
} = require('./../services/perfil');

router.get('/perfilEstudiante', GetNotas);
router.post('/updateEstudiante', UpdateEstudiante)
router.post('/updateUser', UpdateUser)

module.exports = router;