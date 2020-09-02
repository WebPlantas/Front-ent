router = require('express').Router();

router.use(
  [
      require('./home'),
      require('./dashboard'), 
      require('./profesor'), 
      require('./estudiante'), 
      require('./tematica'), 
      require('./theme'), 
      require('./admin'), 
      require('./estudiante'), 
      require('./perfil'), 
      require('./adminProfesor'), 
      require('./evaluacion'),
      require('./clase'),
      require('./evaluacionA'),
      require('./actividadA'),
      require('./usuario')
  ]
);
 
module.exports = router;