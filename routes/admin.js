/**
 * Created by zhoucheng on 3/14/17.
 */
var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var request = require('request');
var baseUrl = require('../config').baseUrl;
// baseUrl = 'http://localhost:8080';
/** admin **/


router.get('/add_case', function(req, res) {
  res.render('admin_add_case');
})

router.get('/add_disease', function(req, res) {
  request.get({
    url: baseUrl + '/class'
  }, function (err, httpResponse, body) {
    res.render('admin_add_disease', {
      type: JSON.parse(body).data
    });
  });
})


module.exports = router;
