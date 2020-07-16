const router = require('express').Router();

    router.get('/admin', (req, res, next) => {
    res.render('Admin/index', {
        layout : false,
        title: 'Web Plants'
    });
    
  });

module.exports = router;