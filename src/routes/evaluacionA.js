const { isLoggedIn } = require('../util/lib/auth');

const router = require('express').Router();

router.get('/evaluaciones', isLoggedIn, function (req, res, next) {
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

router.get('/vistaprevia', function (req, res, next) {
  res.render('Admin/Evaluacion/vistaPrevia', {
    layout: false,
    title: 'Web Plants'
  });

});

module.exports = router;