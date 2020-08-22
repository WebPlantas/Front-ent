const router = require('express').Router();

router.get('/perfil', (req, res, next) => {
    res.render('Dashboard/Perfil/perfiles', {
        layout: false
    });

});

module.exports = router;