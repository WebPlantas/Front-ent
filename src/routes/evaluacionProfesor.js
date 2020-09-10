const router = require('express').Router();
const {
    SaveEvaluacion,
    GetTematicas,
    GetEvaluaciones
  } = require('./../services/evaluacionP');

router.get('/evaluacionprofesor', GetEvaluaciones);

router.get('/newevaluation', GetTematicas);

router.post('/guardarEvaluacion', SaveEvaluacion)

module.exports = router;