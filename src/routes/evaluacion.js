const router = require('express').Router();
const { isLoggedIn } = require('../util/lib/auth');
const {
  GetEvaluacion,
  PostRespuestas
} = require('./../services/evaluacion')

  router.get('/evaluacion', isLoggedIn, (req, res, next) => {
    res.render('Dashboard/Evaluaciones/Evaluacion', {
    });
    
  });

  router.get('/evaluacion1', GetEvaluacion)
  router.post('/respuesta', PostRespuestas)

  

module.exports = router;