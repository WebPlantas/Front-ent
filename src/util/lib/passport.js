const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/connection');
const helpers = require('../lib/helpers');

// INICIAR SESION 
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log("entro buscar");

    const rows = await pool.pool.query('SELECT * FROM usuario WHERE username = ?', [username]);
    console.log(rows.length);

    if (rows.length > 0) {
        const user = rows[0];
        console.log(user);

        const validPassword = await helpers.matchPassword(password, user.passwordp);
        console.log(validPassword);

        if (validPassword) {
            done(null, user, req.flash('success', 'welcome' + user.nombrep))
        } else {
            done(null, false, req.flash('message', 'Incorrect password'));
        }
    } else {
        return done(null, false, req.flash('message', 'Username doesnt exits'));
    }

}));