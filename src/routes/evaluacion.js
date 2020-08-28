const router = require('express').Router();
const { isLoggedIn } = require('../util/lib/auth');
const {
  GetEvaluacion,
  PostRespuestas,
  insertNota
} = require('./../services/evaluacion')

  router.get('/evaluacion', (req, res, next) => {
    res.render('Dashboard/Evaluaciones/Evaluacion', {
    });
    
  });

  router.get('/evaluacion1', GetEvaluacion)
  router.post('/nota/:Id', insertNota)

  

module.exports = router;