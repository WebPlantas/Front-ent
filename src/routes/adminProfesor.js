const router = require('express').Router();
const {
    GetPerfil,
    UpdateProfesorAdmin,
    UpdateUserProfesorAdmin
} = require('./../services/adminProfesor');

router.get('/perfilprofesor', GetPerfil);

router.post('/UpdateProfesorAdmin', UpdateProfesorAdmin);

router.post('/UpdateUserProfesorAdmin', UpdateUserProfesorAdmin)


module.exports = router;