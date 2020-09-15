const router = require('express').Router();
const {
    SaveEvaluacion,
    GetTematicas,
    GetEvaluaciones,
    GetVistaPrevia,
    DeleteEvaluacion
  } = require('./../services/evaluacionP');

router.get('/evaluacionprofesor', GetEvaluaciones);

router.get('/newevaluation', GetTematicas);

router.post('/guardarEvaluacion', SaveEvaluacion);

router.get('/vistaPrevia/:Id', GetVistaPrevia);

router.get('/deleteEvaluacion/:Id', DeleteEvaluacion)

module.exports = router;