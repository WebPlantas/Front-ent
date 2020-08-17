const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('../config/connection');
const { isLoggedIn } = require('../util/lib/auth');
const helpers = require('../util/lib/helpers');

router.get('/', (req, res, next) => {
  res.render('index', {
    layout: false,
    title: 'Web Plants'
  });
});

router.get('/login', (req, res, next) => {
  res.render('Login/Login', {
    layout: false
  });
});

router.post('/signin', (req, res, next) => {
  console.log("entro sig");
  passport.authenticate('local.signin', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// INICIAR SESION 
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  console.log("entro buscar");

  const rows = await pool.query('SELECT * FROM usuario WHERE username = ?', [username]);
  console.log("tamaño",rows.length);

  if (rows.length > 0) {
    console.log("entro if", rows[0], );
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.Password);
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.username));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'Username doesnt exits'));
  }

}));

passport.serializeUser(function (user, done) {
  console.log("SERIALIZE", user); 
  done(null, user.idUsuario);
});

// used to deserialize the user
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id]);
  done(null, rows[0]);
});

router.get('/RegistrarProfesor', (req, res, next) => {
  res.render('Login/LoginP', {
    layout: false
  });
});

router.get('/RegistrarEstudiante', (req, res, next) => {
  res.render('Login/LoginE', {
    layout: false
  });
});

router.get('/crearCuenta', (req, res, next) => {
  res.render('Login/CreateAccount', {
    layout: false
  });
});


router.get('/resetpassword', (req, res, next) => {
  res.render('Login/ResetPassword', {
    layout: false
  });
});

module.exports = router;