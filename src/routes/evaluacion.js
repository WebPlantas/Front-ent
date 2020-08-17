const router = require('express').Router();
const { isLoggedIn } = require('../util/lib/auth');
    router.get('/evaluacion', isLoggedIn, (req, res, next) => {
    res.render('Dashboard/Evaluaciones/Evaluacion', {
    });
    
  });

module.exports = router;