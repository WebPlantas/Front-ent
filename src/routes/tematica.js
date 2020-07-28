const router = require('express').Router();
const {
  GetTematica,
  NewTematica,
  PerfilTematica,
  GetUpdateTematica,
  RegisterTematica,
  PostUpdateTematica,
  DeleteTematica
} = require('./../services/tematica');

router.get('/tematicas', GetTematica);   
  
router.get('/nuevatematica', NewTematica);

router.get('/perfiltematica/:Id', PerfilTematica);

router.get('/actualizartematica/:Id', GetUpdateTematica);

router.post('/nuevatematica', RegisterTematica);

router.post('/actualizartematica/', PostUpdateTematica);

router.post('/deletematica', DeleteTematica)

  
module.exports = router;