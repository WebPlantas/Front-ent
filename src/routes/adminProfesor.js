const router = require('express').Router();
const {
    GetPerfil,
    UpdateProfesorAdmin,
    UpdateUserProfesorAdmin
} = require('./../services/adminProfesor');

router.get('/perfilprofesor', GetPerfil);

router.get('/crearcontenido', (req, res, next) => {
    res.render('Dashboard/Profesor/ContenidoP/newContenido', {
        layout: 'profesor'
    });

});

router.get('/detalleclase', (req, res, next) => {
    res.render('Dashboard/Profesor/Clase/detalleClase', {
        layout: 'profesor'
    });

});

router.post('/UpdateProfesorAdmin', UpdateProfesorAdmin);

router.post('/UpdateUserProfesorAdmin', UpdateUserProfesorAdmin)


module.exports = router;