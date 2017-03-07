var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {

  var data = {
    title: 'Pet Hospital',
    data: [
      {
        name: 'Cat',
        treatment: 'Needle'
      }, {
        name: 'Dog',
        treatment: 'Medicine'
      }, {
        name: 'Pig',
        treatment: 'Kill'
      }
    ]
  }
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {

    res.render('login', {
      title: 'login' ,
      script: '<script type="text/javascript" src="/js/login.js"></script>'
    });
});

router.get('/learn', function(req, res) {
  res.render('learn')
})

router.get('/learn/reception', function(req, res) {
  res.render('reception')
})

router.get('/learn/vet', function(req, res) {
  res.render('vet')
})

router.get('/learn/assistant', function(req, res) {
  res.render('assistant')
})

router.get('/3d_guidance', function(req, res) {
  res.render('3d_guidance')

})
module.exports = router;
