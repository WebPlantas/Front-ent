const router = require('express').Router();
const {
    GetPerfil
  } = require('./../services/adminProfesor');

router.get('/adminprofesor', (req, res, next) => {
    res.render('Dashboard/Profesor/Clase/clase', {
        layout: 'profesor'
    });

});

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

router.get('/perfilprofesor', GetPerfil);

// router.get('/perfilprofesor', (req, res, next) => {
//     res.render('Dashboard/Profesor/Perfil/perfil', {
//         layout: 'profesor'
//     });

// });

module.exports = router;