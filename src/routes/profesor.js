const router = require('express').Router();
const {
  GetProfesor,
  NewProfesor,
  CreateNewProfesor,
  PerfilProfesor,
  GetUpdateProfesor,
  PostUpdateProfesor,
  DeleteProfesor,
  GetCurso,
  RegisterCourse,
  GetUpdateCurso,
  PostUpdateCurso,
  DeleteCurso,
  PCreateNewProfesor
} = require('./../services/profesor');
const { isLoggedIn } = require('../util/lib/auth');
//GET
router.get('/profesores', GetProfesor);
router.get('/nuevoProfesor', NewProfesor);
router.get('/perfilProfesor/:Id', isLoggedIn, PerfilProfesor);
router.get('/actualizarProfesor/:Id', GetUpdateProfesor);

router.post('/nuevoProfesor', CreateNewProfesor);
router.post('/saveProfesor', PCreateNewProfesor);

router.post('/actualizarProfesor/', PostUpdateProfesor);
router.post('/deleteProfesor', DeleteProfesor);

//=======CRUD CURSOS
router.get('/registrarCurso/:Id', GetCurso);
router.post('/registrarCurso', RegisterCourse);
router.get('/actualizarCurso/:Id', isLoggedIn, GetUpdateCurso);
router.post('/actualizarCurso/', PostUpdateCurso);
router.get('/deletecurso/:Id', DeleteCurso);

router.get('/actualizarcurso', (req, res, next) => {
  res.render('Admin/Profesor/actualizarCurso', {
    layout: 'admin.hbs'
  });
});

module.exports = router;
