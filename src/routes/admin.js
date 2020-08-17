const router = require('express').Router();
const { isLoggedIn } = require('../util/lib/auth');
router.get('/admin', isLoggedIn, function (req, res, next) {
  res.render('Admin/index', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

module.exports = router;