//aqui va la configuracion del deserializeUser, company, transporter
const passport = require('passport');
const router = require('express').Router();
const { isLoggedIn } = require('../lib/auth');


// INICIAR SESION
router.post('/signin', (req, res, next) => {
    console.log("Entro signin");
    req.check('username', 'Username is Required').notEmpty();
    req.check('password', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
        req.flash('message', errors[0].msg);
        res.redirect('/login');
      }
    passport.authenticate('local.signin', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


module.exports = router; 