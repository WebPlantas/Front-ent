const { isLoggedIn } = require('../util/lib/auth');
const {
  GetTematicas,
  GetEvaluaciones
} = require('./../services/evaluacion');

const router = require('express').Router();

router.get('/evaluaciones', GetEvaluaciones);

router.get('/nuevaevaluacion', GetTematicas);

router.get('/vistaprevia/:Id', function (req, res, next) {
  res.render('Admin/Evaluacion/vistaPrevia', {
    layout: false,
    title: 'Web Plants'
  });

});

module.exports = router;