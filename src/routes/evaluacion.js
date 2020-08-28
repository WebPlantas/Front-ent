const router = require('express').Router();
const { isLoggedIn } = require('../util/lib/auth');
const {
  GetEvaluacionUno,
  insertNotaUno,
  GetEvaluacionDos,
  insertNotaDos
} = require('./../services/evaluacion')

  router.get('/evaluacion', (req, res, next) => {
    res.render('Dashboard/Evaluaciones/Evaluacion', {
    });
    
  });

  router.get('/evaluacion1', GetEvaluacionUno)
  router.post('/nota/:Id/:Nota', insertNotaUno)

  router.get('/evaluacion2', GetEvaluacionDos)
  router.post('/nota/:Id/:Nota', insertNotaDos)

  

module.exports = router;