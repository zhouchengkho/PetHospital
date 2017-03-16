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

router.all('/*', (req, res, next) => {
  // TODO: check admin auth here
  next()
})
router.get('/add_case', (req, res) => {
  request.get({
    url: baseUrl + '/disease'
  }, (err, httpResponse, body) => {
    var data = JSON.parse(body)
    res.render('admin_add_case', {
      disease: data.data
    });
  });
})

router.get('/add_disease', (req, res) => {
  request.get({
    url: baseUrl + '/disease?type'
  }, (err, httpResponse, body) => {
    res.render('admin_add_disease', {
      type: JSON.parse(body).data
    });
  });
})


module.exports = router;
