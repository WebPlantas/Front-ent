const router = require('express').Router();
const {
  GetTematicaProfesor,
  RegisterTematicaProfesor
} = require('../services/contenido');

const { isLoggedInAsProfesor } = require('../util/lib/auth');

router.get('/contenidoprofesor', isLoggedInAsProfesor, GetTematicaProfesor);  

router.post('/contenidoprofesor', RegisterTematicaProfesor);

module.exports = router;