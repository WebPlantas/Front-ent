const router = require('express').Router();

const {
    GetGrupoProfesor,
    RegisterGrupoProfesor
  } = require('./../services/grupo');

router.get('/grupoclase', GetGrupoProfesor);

router.post('/registergroup', RegisterGrupoProfesor);




module.exports = router;