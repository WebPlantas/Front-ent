const router = require('express').Router();

    router.get('/tematica', (req, res, next) => {
    res.render('Dashboard/Tematicas/Tematica', {
    });
    
  });
  
   router.get('/contenido', (req, res, next) => {
    res.render('Dashboard/Tematicas/Contenido', {
    });
    
  });
  
   router.get('/historia', (req, res, next) => {
    res.render('Dashboard/Tematicas/Historia', {
    });
    
  });
  
module.exports = router;