const router = require('express').Router();

    router.get('/home', (req, res, next) => {
    res.render('Dashboard/index', {
    });

  });

  module.exports = router;