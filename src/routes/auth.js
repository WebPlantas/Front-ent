const router = require('express').Router();
const passport = require('passport');
const pool = require('../config/connection');



router.get('/addProfesor', (req, res) => {

    res.render('Login/LoginP', {
        layout: false
    });
});

router.post('/saveProfesor', passport.authenticate('local.saveProfesor', {
    successRedirect: '/',
    failureRedirect: '/addProfesor',
    failureFlash: true
}));



/*
    const {nombrep, apellidop, emailp, passwordp} = req.body;
    const newProfesor = {
        nombrep,
        apellidop,
        emailp,
        passwordp
    };
    await pool.pool.query('INSERT INTO profesores SET ?', [newProfesor]);
    
    req.flash('success', 'Usuario guardado correctamente');
    res.render('index',{ 
        layout : false
    });
});
*/

/*
router.post('/addProfesor', (req, res) =>{
    console.log("etnorrasds");
    
    res.render('index',{ 
        layout : false
    });
});
*/
module.exports = router;