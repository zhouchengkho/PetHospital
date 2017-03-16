var express = require('express');
var router = express.Router();
var request = require('request');
const baseUrl = require('../config').baseUrl;


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

router.get("/3d_guidance", function (req, res) {
    res.render('3d_guidance');
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


router.get('/guidance', function (req, res) {
    res.render('guidance')
});

router.get('/disease', (req, res) => {
    if (req.query.id) {// if id exist
      request.get({
        url: baseUrl + '/disease?id=' + req.query.id
      }, (err, httpResponse, body) => {
        var data = JSON.parse(body)
        if(data.status != 200)
          res.render('error', {message: data.message});
        else
          res.render('disease', data.data[0])
      });
    } else {
        res.render('disease');
    }

});

router.get('/case', (req, res) => {
    if (req.query.id) {// if id exist
        request.get({
            url: baseUrl + '/case?id=' + req.query.id
        }, (err, httpResponse, body) => {
            res.render('case', JSON.parse(body).data[0]);
        });
    } else {//when id is undefined
        res.render('case');
    }
});

module.exports = router;
