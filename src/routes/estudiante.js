const router = require('express').Router();
const {
  GetEstudiante,
  NewEstudiante,
  GetGrupo,
  RegisterGrupo,
  DeleteGrupo,
  CreateNewEstudiante,
  PerfilEstudiante,
  GetUpdateEstudiante,
  PostUpdateEstudiante,
  DeleteEstudiante,
  GetUpdateGrupo,
  PostUpdateGrupo
} = require('./../services/estudiante');

//============CRUD ESTUDIANTES
//GET
router.get('/estudiantes', GetEstudiante);
router.get('/nuevoEstudiante', NewEstudiante);
router.get('/perfilEstudiante/:Id', PerfilEstudiante);
router.get('/actualizarEstudiante/:Id', GetUpdateEstudiante);
router.post('/nuevoEstudiante', CreateNewEstudiante);
router.post('/actualizarEstudiante/', PostUpdateEstudiante);
router.post('/deleteEstudiante', DeleteEstudiante);
//===============CRUD GRUPO
router.post('/registrargrupo', RegisterGrupo);
router.get('/registrargrupo/:Id', GetGrupo);
router.get('/actualizarGrupo/:Id', GetUpdateGrupo);
router.post('/actualizarGrupo/', PostUpdateGrupo);
router.get('/deletegrupo/:Id', DeleteGrupo);

module.exports = router;