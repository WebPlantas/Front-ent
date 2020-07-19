const router = require('express').Router();
const {
  GetEstudiante,
  CreateNewEstudiante,
  PerfilEstudiante,
  GetUpdateEstudiante,
  PostUpdateEstudiante
} = require('./../services/estudiante');

//============CRUD ESTUDIANTES
//GET
router.get('/estudiantes', GetEstudiante);

//Create
router.get('/nuevoestudiante', (req, res, next) => {
  res.render('Admin/Estudiante/nuevoEstudiante', {
    layout: false
  });
});

router.post('/nuevoEstudiante', CreateNewEstudiante);

//UPDATE ESTUDIANTE
router.get('/perfilEstudiante/:Id', PerfilEstudiante);
router.get('/actualizarEstudiante/:Id', GetUpdateEstudiante);
router.post('/actualizarEstudiante/', PostUpdateEstudiante);

//CRUD CURSOS
router.get('/registrarcurso', (req, res, next) => {
  res.render('Admin/Estudiante/registrarCurso', {
    layout: false
  });
});

router.get('/actualizarcurso', (req, res, next) => {
  res.render('Admin/Estudiante/actualizarCurso', {
    layout: false
  });
});

module.exports = router;