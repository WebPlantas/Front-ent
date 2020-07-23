const router = require('express').Router();

router.get('/admin', function (req, res, next) {
  res.render('Admin/index', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

module.exports = router;