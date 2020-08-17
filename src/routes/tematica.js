const router = require('express').Router();
const {
  GetTematica,
  NewTematica,
  PerfilTematica,
  GetContenido,
  GetUpdateTematica,
  DetailContenido,
  RegisterTematica,
  PostUpdateTematica,
  DeleteTematica,
  RegisterContenido,
  DeleteContenido
} = require('../services/tematica');

const { isLoggedIn } = require('../util/lib/auth');

router.get('/tematicas', isLoggedIn, GetTematica);   
  
router.get('/nuevatematica', NewTematica);

router.get('/perfiltematica/:Id', PerfilTematica);

router.get('/actualizartematica/:Id', GetUpdateTematica);

router.get('/actualizarcontenido/:Id', DetailContenido);

router.get('/registrarcontenido/:Id', GetContenido);

router.post('/nuevatematica', RegisterTematica);

router.post('/actualizartematica/', PostUpdateTematica);

router.post('/deletematica', DeleteTematica);

router.post('/registrarcontenido', RegisterContenido);

router.post('/deletecontenido', DeleteContenido);


  
module.exports = router;