const router = require('express').Router();

router.get('/crearclase', (req, res, next) => {
    res.render('Dashboard/Profesor/Clase/clase', {
        layout: 'profesor'
    });

});

module.exports = router;