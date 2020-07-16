const router = require('express').Router();

 router.get('/profesores', (req, res, next) => {
    res.render('Admin/Profesor/profesor', {
      layout : false
    });
  });

  router.get('/nuevoprofesor', (req, res, next) => {
     res.render('Admin/Profesor/nuevoProfesor', {
       layout : false
     });
   });

  router.get('/perfilprofesor', (req, res, next) => {
     res.render('Admin/Profesor/perfilProfesor', {
       layout : false
     });
   });

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