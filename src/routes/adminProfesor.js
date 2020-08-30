const router = require('express').Router();

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

module.exports = router;