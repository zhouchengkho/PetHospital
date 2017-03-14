var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
    res.render('login', {
        title: 'login',
        script: '<script type="text/javascript" src="/js/login.js"></script>'
    });
});

router.get("/case", function (req, res) {
    res.render('case');
});

router.get('/list_case', function (req, res) {
    res.render('list_case');
});
router.get('/learn', function (req, res) {
    res.render('learn')
});

router.get('/learn/reception', function (req, res) {
    res.render('reception')
});

router.get('/learn/vet', function (req, res) {
    res.render('vet')
});

router.get('/learn/assistant', function (req, res) {
    res.render('assistant')
});

router.get('/profile', function (req, res) {
    res.render('profile')
});


router.get('/list_disease', function (req, res) {
    res.render('list_disease');
});

router.get('/disease', function (req, res) {
    res.render('disease')
});

router.get('/guidance', function(req, res) {
  res.render('guidance')
})

module.exports = router;
