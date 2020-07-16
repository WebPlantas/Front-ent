const router = require('express').Router();

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
 
 router.get('/RegistrarProfesor', (req, res, next) => {
   res.render('Login/LoginP', {
     layout : false
   });
 });

 router.get('/RegistrarEstudiante', (req, res, next) => {
   res.render('Login/LoginE', {
     layout : false
   });
 });

 router.get('/crearCuenta', (req, res, next) => {
   res.render('Login/CreateAccount', {
     layout : false
   });
 });

 
router.get('/resetpassword', (req, res, next) => {
   res.render('Login/ResetPassword', {
     layout : false
   });
 });
 
 module.exports = router;