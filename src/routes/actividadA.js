const router = require('express').Router();

router.get('/actividades', function (req, res, next) {
  res.render('Admin/Actividad/actividad', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

module.exports = router;