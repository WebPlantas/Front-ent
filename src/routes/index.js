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
      require('./evaluacion'),
      require('./evaluacionA')
  ]
);
 
module.exports = router;