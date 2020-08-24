const router = require('express').Router();

router.get('/adminprofesor', (req, res, next) => {
    res.render('Dashboard/Profesor/admin', {
        layout: 'admin'
    });

});

module.exports = router;