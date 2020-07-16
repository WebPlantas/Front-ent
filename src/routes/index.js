router = require('express').Router();

router.use(
  [
      require('./home'),
      require('./dashboard'), 
      require('./profesor'), 
      require('./estudiante'), 
      require('./tematica'), 
      require('./admin'), 
      require('./estudiante'), 
      require('./evaluacion')
  ]
);
 
module.exports = router;