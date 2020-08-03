const router = require('express').Router();
const {
  GetEstudiante,
  NewEstudiante,
  GetGrupo,
  RegisterGrupo,
  CreateNewEstudiante,
  PerfilEstudiante,
  GetUpdateEstudiante,
  PostUpdateEstudiante,
  DeleteEstudiante
} = require('./../services/estudiante');

//============CRUD ESTUDIANTES
//GET
router.get('/estudiantes', GetEstudiante);

router.get('/nuevoEstudiante', NewEstudiante);

router.get('/registrargrupo/:Id', GetGrupo);

router.post('/registrargrupo', RegisterGrupo);

router.get('/perfilEstudiante/:Id', PerfilEstudiante);

router.get('/actualizarEstudiante/:Id', GetUpdateEstudiante);

router.post('/nuevoEstudiante', CreateNewEstudiante);

router.post('/actualizarEstudiante/', PostUpdateEstudiante);

router.post('/deleteEstudiante', DeleteEstudiante);





router.get('/actualizargrupo', (req, res, next) => {
  res.render('Admin/Estudiante/actualizarGrupo', {
    layout: 'admin.hbs'
  });
});

module.exports = router;