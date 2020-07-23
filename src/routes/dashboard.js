const router = require('express').Router();

    router.get('/home', function (req, res, next) {
    res.render('Dashboard/index', {
      layout: 'dashboard.hbs',
      title: 'Web Plants'
    });

  });

  module.exports = router;