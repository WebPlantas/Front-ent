const router = require('express').Router();
const {
  GetProfesor,
  NewProfesor,
  GetCurso,
  CreateNewProfesor,
  PerfilProfesor,
  GetUpdateProfesor,
  PostUpdateProfesor,
  DeleteProfesor,
  RegisterCourse
} = require('./../services/profesor');

//GET
router.get('/profesores', GetProfesor);

router.get('/nuevoProfesor', NewProfesor);

router.get('/registrarCurso/:Id', GetCurso);

router.get('/perfilProfesor/:Id', PerfilProfesor);

router.get('/actualizarProfesor/:Id', GetUpdateProfesor);

router.post('/nuevoProfesor', CreateNewProfesor);

router.post('/registrarCurso', RegisterCourse);

router.post('/actualizarProfesor/', PostUpdateProfesor);

router.post('/deleteProfesor', DeleteProfesor)

router.get('/actualizarcurso', (req, res, next) => {
  res.render('Admin/Profesor/actualizarCurso', {
    layout: 'admin.hbs'
  });
});

module.exports = router;
