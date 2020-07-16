const router = require('express').Router();

 router.get('/estudiantes', (req, res, next) => {
    res.render('Admin/Estudiante/estudiante', {
      layout : false
    });
  });

 router.get('/nuevoestudiante', (req, res, next) => {
    res.render('Admin/Estudiante/nuevoEstudiante', {
      layout : false
    });
  });

 router.get('/perfilestudiante', (req, res, next) => {
    res.render('Admin/Estudiante/perfilEstudiante', {
      layout : false
    });
  });

 router.get('/registrarcurso', (req, res, next) => {
    res.render('Admin/Estudiante/registrarCurso', {
      layout : false
    });
  });

 router.get('/actualizarestudiante', (req, res, next) => {
    res.render('Admin/Estudiante/actualizarEstudiante', {
      layout : false
    });
  });

 router.get('/actualizarcurso', (req, res, next) => {
    res.render('Admin/Estudiante/actualizarCurso', {
      layout : false
    });
  });

module.exports = router;