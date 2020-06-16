router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', {
      layout : false,
      title: 'Web Plants'
  });
 });

 router.get('/loginP', (req, res, next) => {
  res.render('loginProfesor', {
      layout : false,
      title: 'Web Plants'
  });
 });

 router.get('/loginU', (req, res, next) => {
  res.render('loginUser', {
      layout : false,
      title: 'Web Plants'
  });
 });
module.exports = router;