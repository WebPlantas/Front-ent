router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', {
      layout : false,
      title: 'Web Plants'
  });
 });

module.exports = router;