const router = require('express').Router();
const {
  GetProfesor,
  NewProfesor,
  CreateNewProfesor,
  PerfilProfesor,
  GetUpdateProfesor,
  PostUpdateProfesor,
  DeleteProfesor
} = require('./../services/profesor');

//============CRUD ProfesorS
//GET
router.get('/profesores', GetProfesor);

//Create
router.get('/nuevoProfesor', NewProfesor);

router.post('/nuevoProfesor', CreateNewProfesor);

//UPDATE Profesor
router.get('/perfilProfesor/:Id', PerfilProfesor);
router.get('/actualizarProfesor/:Id', GetUpdateProfesor);
router.post('/actualizarProfesor/', PostUpdateProfesor);

//DELETE ProfesorS

router.post('/deleteProfesor', DeleteProfesor)

router.get('/registrargrupo', (req, res, next) => {
  res.render('Admin/Profesor/registrarGrupo', {
    layout: 'admin.hbs'
  });
});

router.get('/actualizargrupo', (req, res, next) => {
  res.render('Admin/Profesor/actualizarGrupo', {
    layout: 'admin.hbs'
  });
});

module.exports = router;
