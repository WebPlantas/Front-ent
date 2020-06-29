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

 router.get('/crearCuenta', (req, res, next) => {
   res.render('Login/CreateAccount', {
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
 
 router.get('/resetpassword', (req, res, next) => {
   res.render('Login/ResetPassword', {
     layout : false
   });
 });

 router.get('/home', (req, res, next) => {
   res.render('Dashboard/Home', {
     layout : false
   });
 });

 router.get('/tematica', (req, res, next) => {
  res.render('Dashboard/Tematicas/Tematica', {
    layout : false
  });
  
});

 router.get('/contenido', (req, res, next) => {
  res.render('Dashboard/Tematicas/Contenido', {
    layout : false
  });
  
});

 router.get('/historia', (req, res, next) => {
  res.render('Dashboard/Tematicas/Historia', {
    layout : false
  });
  
});
 
 
module.exports = router;