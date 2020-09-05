const router = require('express').Router();
const {
    SaveEvaluacion
  } = require('./../services/evaluacion');
router.get('/evaluacionprofesor', function (req, res, next) {
    res.render('Dashboard/Profesor/Evaluacion/Evaluacion', {
    layout: false
    });

});

router.post('/guardarEvaluacion', SaveEvaluacion)

module.exports = router;