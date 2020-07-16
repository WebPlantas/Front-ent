const router = require('express').Router();

    router.get('/evaluacion', (req, res, next) => {
    res.render('Dashboard/Evaluaciones/Evaluacion', {
    });
    
  });

module.exports = router;