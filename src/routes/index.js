router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', {
      layout : false,
      title: 'Web Plants'
  });
 });

 router.get('/login', (req, res, next) => {
   res.render('/login/login', {
     layout : false
   });
 });

module.exports = router;