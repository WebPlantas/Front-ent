const router = require('express').Router();
const {
  GetEstudiante,
  PerfilEstudiante
} = require('./../services/estudiante');

router.get('/estudiantes', GetEstudiante);

router.get('/nuevoestudiante', (req, res, next) => {
  res.render('Admin/Estudiante/nuevoEstudiante', {
    layout: false
  });
});

router.get('/perfilEstudiante/:Id', PerfilEstudiante);

router.get('/registrarcurso', (req, res, next) => {
  res.render('Admin/Estudiante/registrarCurso', {
    layout: false
  });
});

router.get('/actualizarestudiante', (req, res, next) => {
  res.render('Admin/Estudiante/actualizarEstudiante', {
    layout: false
  });
});

router.get('/actualizarcurso', (req, res, next) => {
  res.render('Admin/Estudiante/actualizarCurso', {
    layout: false
  });
});

module.exports = router;