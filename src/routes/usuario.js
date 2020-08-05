const router = require('express').Router();

router.get('/usuarios', function (req, res, next) {
  res.render('Admin/Usuario/usuario', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

router.get('/nuevousuario', function (req, res, next) {
  res.render('Admin/Usuario/nuevoUsuario', {
    layout: 'admin.hbs',
    title: 'Web Plants'
  });

});

module.exports = router;