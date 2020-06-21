router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', {
      layout : false,
      title: 'Web Plants'
  });
 });

 router.get('/login', (req, res, next) => {
   res.render('Login/Login', {
     layout : false
   });
 });

 router.get('/crearCuenta', (req, res, next) => {
   res.render('Login/CrearCuenta', {
     layout : false
   });
 });

 router.get('/loginProfesor', (req, res, next) => {
   res.render('Login/LoginP', {
     layout : false
   });
 });

 router.get('/loginEstudiante', (req, res, next) => {
   res.render('Login/LoginE', {
     layout : false
   });
 });
 
module.exports = router;