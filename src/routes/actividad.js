const router = require('express').Router();
const { isLoggedIn } = require('../util/lib/auth');

router.get('/crucigrama', isLoggedIn, function (req, res, next) {
  res.render('Dashboard/Actividades/crucigrama', {
    layout: null,
    title: 'Web Plants'
  });

});

router.get('/newactivity', isLoggedIn, function (req, res, next) {
  res.render('Dashboard/Actividades/actividad', {
    layout: 'dashboard.hbs',
    title: 'Web Plants'
  });

});



module.exports = router;