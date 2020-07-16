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

  router.get('/registrargrupo', (req, res, next) => {
     res.render('Admin/Profesor/registrarGrupo', {
       layout : false
     });
   });

  router.get('/actualizarprofesor', (req, res, next) => {
     res.render('Admin/Profesor/actualizarProfesor', {
       layout : false
     });
   });

  router.get('/actualizargrupo', (req, res, next) => {
     res.render('Admin/Profesor/actualizarGrupo', {
       layout : false
     });
   });

module.exports = router;