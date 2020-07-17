const router = require('express').Router();

    router.get('/tematicas', (req, res, next) => {
    res.render('Admin/Tematica/tematica', {
      layout : false,
    });
    
  });
  
   router.get('/nuevatematica', (req, res, next) => {
    res.render('Admin/Tematica/nuevaTematica', {
      layout : false,
    });
    
  });
  
module.exports = router;