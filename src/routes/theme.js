const router = require('express').Router();

router.get('/tematica', (req, res, next) => {
    res.render('Dashboard/Tematicas/Tematica', {});
});

router.get('/contenido', (req, res, next) => {
    res.render('Dashboard/Tematicas/modulos', {});
});

router.get('/celula', (req, res, next) => {
    res.render('Dashboard/Tematicas/laCelula', {});
});

router.get('/historia', (req, res, next) => {
    res.render('Dashboard/Tematicas/Historia', {});
});

router.get('/definicion', (req, res, next) => {
    res.render('Dashboard/Tematicas/Definicion', {});
});

router.get('/partes', (req, res, next) => {
    res.render('Dashboard/Tematicas/Partes', {});
});

router.get('/nucleo', (req, res, next) => {
    res.render('Dashboard/Tematicas/Nucleo', {});
});

router.get('/citoplasma', (req, res, next) => {
    res.render('Dashboard/Tematicas/Citoplasma', {});
});

router.get('/membrana', (req, res, next) => {
    res.render('Dashboard/Tematicas/membranaCelular', {});
});

module.exports = router;