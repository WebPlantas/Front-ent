const router = require('express').Router();
const {
  GetEstudiante,
  NewEstudiante,
  CreateNewEstudiante,
  PerfilEstudiante,
  GetUpdateEstudiante,
  PostUpdateEstudiante,
  DeleteEstudiante
} = require('./../services/estudiante');

//============CRUD ESTUDIANTES
//GET
router.get('/estudiantes', GetEstudiante);

//Create
router.get('/nuevoEstudiante', NewEstudiante);

router.post('/nuevoEstudiante', CreateNewEstudiante);

//UPDATE ESTUDIANTE
router.get('/perfilEstudiante/:Id', PerfilEstudiante);
router.get('/actualizarEstudiante/:Id', GetUpdateEstudiante);
router.post('/actualizarEstudiante/', PostUpdateEstudiante);

//DELETE ESTUDIANTES

router.post('/deleteEstudiante', DeleteEstudiante)




router.get('/registrargrupo', (req, res, next) => {
  res.render('Admin/Estudiante/registrarGrupo', {
    layout: 'admin.hbs'
  });
});

router.get('/actualizargrupo', (req, res, next) => {
  res.render('Admin/Estudiante/actualizarGrupo', {
    layout: 'admin.hbs'
  });
});

module.exports = router;