const router = require('express').Router();
const {
  GetTematicaProfesor,
  RegisterTematicaProfesor
} = require('../services/contenido');

const { isLoggedIn } = require('../util/lib/auth');

router.get('/contenidoprofesor', isLoggedIn, GetTematicaProfesor);  

router.post('/contenidoprofesor', RegisterTematicaProfesor);

module.exports = router;