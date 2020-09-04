const router = require('express').Router();
const {
    GetClase,
    GetCodigo,
    RegisterClase
  } = require('./../services/clase');

router.get('/adminprofesor', GetClase);

router.get('/detalleclase', GetCodigo);

// router.get('/detalleclase', (req, res, next) => {
//   res.render('Dashboard/Profesor/Clase/detalleClase', {
//       layout: 'profesor'
//   });

// });

router.post('/registerclase', RegisterClase);


module.exports = router;