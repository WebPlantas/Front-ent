const { isLoggedIn } = require('../util/lib/auth');
const {
  GetTematicas
} = require('./../services/evaluacion');

const router = require('express').Router();

router.get('/evaluaciones', function (req, res, next) {
  res.render('Admin/Evaluacion/evaluacion', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

router.get('/nuevaevaluacion', GetTematicas);

router.get('/vistaprevia', function (req, res, next) {
  res.render('Admin/Evaluacion/vistaPrevia', {
    layout: false,
    title: 'Web Plants'
  });

});

module.exports = router;