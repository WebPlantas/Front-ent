const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/connection');
const helpers = require('../util/lib/helpers');

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
   res.render('Dashboard/Home', {layout : false});
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

 router.get('/evaluacion', (req, res, next) => {
  res.render('Dashboard/Evaluaciones/Evaluacion', {
    layout : false
  });
  
});


//---------------Modificacion Index---------------

router.get('/admin', (req, res, next) => {
  res.render('Admin/index', {
    layout : false
  });
  
});

//GUARDAR DOCENTE
router.post('/saveProfesor', passport.authenticate('local.saveProfesor', {
  successRedirect: '/login',
  failureRedirect: '/loginProfesor',
  failureFlash: true
}));
//INICIAR SESION
router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
  }) (req, res, next);
});

//---------------PASSPORT LOCAL-----------------

//INICIAR SESION DOCENTE
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async(req, username, password, done)=>{
  console.log("entro buscar");
  
  const rows = await pool.pool.query('SELECT * FROM profesores WHERE emailp = ?', [username]);
  console.log(rows.length);
  
  if (rows.length > 0) {
      const user = rows[0];
      console.log(user);
      
      const validPassword = await helpers.matchPassword(password, user.passwordp);
      console.log(validPassword);
      
      if (validPassword) {
          done(null, user, req.flash('success','welcome' + user.nombrep))
      }else{
          done(null, false, req.flash('message','Incorrect password'));
      }
  }else{
      return done(null, false, req.flash('message','Username doesnt exits'));
  }
  
}));

//REGISTRAR DOCENTE
passport.use('local.saveProfesor', new LocalStrategy({
  usernameField: 'emailp',
  passwordField: 'passwordp',
  passReqToCallback: true
}, async(req, emailp, passwordp, done)=>{
  const {nombrep, apellidop} = req.body
  const newProfesor = {
      nombrep,
      apellidop,
      emailp,
      passwordp
  };
  newProfesor.passwordp = await helpers.encrytPassword(passwordp);
  const result = await pool.pool.query('INSERT INTO profesores SET ?', [newProfesor]);
  newProfesor.IdProfesor = result.insertId;
  return done(null, newProfesor);
  
}));

passport.serializeUser((userProfesor, done) =>{
  done(null, userProfesor.IdProfesor);
});

passport.deserializeUser( async (id, done) =>{
  const rows = await pool.pool.query('SELECT * FROM profesores WHERE IdProfesor = ?', [id]);
  done(null, rows[0]);
});


module.exports = router;