const router = require('express').Router();
const {
  isLoggedIn
} = require('../util/lib/auth');

router.get('/home', isLoggedIn, function (req, res, next) {
  res.render('Dashboard/index', {
    layout: 'dashboard.hbs',
    title: 'Web Plants'
  });

});

module.exports = router;