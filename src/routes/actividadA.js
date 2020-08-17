const router = require('express').Router();
const { isLoggedIn } = require('../util/lib/auth');
router.get('/actividades', isLoggedIn, function (req, res, next) {
  res.render('Admin/Actividad/actividad', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

router.get('/newactivity', function (req, res, next) {
  res.render('Admin/Actividad/newActivity', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

module.exports = router;