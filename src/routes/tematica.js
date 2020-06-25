const router = require('express').Router();

router.get('/tematica', (req, res, next) => {
    res.render('Dashboard/Tematicas/Tematica',);
    
});

module.exports = router;