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

module.exports = router;
