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

router.get('/registrargrupo/:Id', GetGrupo);
router.get('/actualizarGrupo/:Id', GetUpdateGrupo);
router.post('/actualizarGrupo/', PostUpdateGrupo);
router.post('/registrargrupo', RegisterGrupo);
router.post('/deletegrupo', DeleteGrupo);




router.get('/actualizargrupo', (req, res, next) => {
  res.render('Admin/Estudiante/actualizarGrupo', {
    layout: 'admin.hbs'
  });
});

module.exports = router;