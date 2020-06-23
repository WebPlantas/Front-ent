const router = require('express').Router();

const pool = require('../config/connection');

router.get('/addProfesor', (req, res) =>{
    console.log("ENTRO GET");
    
    res.render('Login/LoginP',{ 
        layout : false
    });
});

router.post('/saveProfesor', async (req, res) =>{
    const {nombrep, apellidop, emailp, passwordp} = req.body;
    const newProfesor = {
        nombrep,
        apellidop,
        emailp,
        passwordp
    };
    await pool.pool.query('INSERT INTO profesores SET ?', [newProfesor]);
    res.render('index',{ 
        layout : false
    });
});
/*
router.post('/addProfesor', (req, res) =>{
    console.log("etnorrasds");
    
    res.render('index',{ 
        layout : false
    });
});
*/
module.exports = router;