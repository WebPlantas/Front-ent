const router = require('express').Router();
const {
    SaveEvaluacion
  } = require('./../services/evaluacion');

router.get('/evaluacionprofesor', function (req, res, next) {
    res.render('Dashboard/Profesor/Evaluacion/Evaluacion', {
    layout: 'profesor.hbs'
    });

});

router.get('/newevaluation', function (req, res, next) {
  res.render('Dashboard/Profesor/Evaluacion/newEvaluation', {
  layout: 'profesor.hbs'
  });

});

router.post('/guardarEvaluacion', SaveEvaluacion)

module.exports = router;