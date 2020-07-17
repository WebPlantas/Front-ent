const router = require('express').Router();

const {
  GetProfesor
} = require('./../services/profesor');

router.get('/profesores', GetProfesor);
 
/*
router.get('/profesores', (req, res, next) => {
    res.render('Admin/Profesor/profesor', {
      layout : false
    });
  });
*/
//  router.get('/nuevoestudiante', (req, res, next) => {
//     res.render('Admin/Profesor/nuevoEstudiante', {
//       layout : false
//     });
//   });

//  router.get('/perfilestudiante', (req, res, next) => {
//     res.render('Admin/Profesor/perfilEstudiante', {
//       layout : false
//     });
//   });

//  router.get('/registrarcurso', (req, res, next) => {
//     res.render('Admin/Profesor/registrarCurso', {
//       layout : false
//     });
//   });

//  router.get('/actualizarestudiante', (req, res, next) => {
//     res.render('Admin/Profesor/actualizarEstudiante', {
//       layout : false
//     });
//   });

//  router.get('/actualizarcurso', (req, res, next) => {
//     res.render('Admin/Profesor/actualizarCurso', {
//       layout : false
//     });
//   });

module.exports = router;
