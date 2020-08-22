const router = require('express').Router();
const {
  isLoggedInAsProfesor
} = require('../util/lib/auth');

router.get('/admin', isLoggedInAsProfesor, function (req, res, next) {
  res.render('Admin/index', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

module.exports = router;