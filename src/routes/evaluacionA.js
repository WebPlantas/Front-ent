const router = require('express').Router();

router.get('/evaluaciones', function (req, res, next) {
  res.render('Admin/Evaluacion/evaluacion', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

router.get('/nuevaevaluacion', function (req, res, next) {
  res.render('Admin/Evaluacion/nuevaEvaluacion', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

module.exports = router;