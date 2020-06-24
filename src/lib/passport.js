const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/connection');
const helpers = require('../lib/helpers');

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
    done(null, userProfesor.id);
});

passport.deserializeUser( async (id, done) =>{
    pool.pool.query('SELECT * FROM profesores WHERE IdProfesor = ?', [id]);
    done(null, rows[0]);
});
