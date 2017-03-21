/**
 * Created by zhoucheng on 3/1/17.
 */
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const request = require('request');
const baseUrl = require('../config').baseUrl;
/** API **/

router.get('/session', function (req, res) {
  if(req.session.login) {
    res.json({
      status: 200,
      data: {
        token: req.session.login.token
      }
    })
  }
    else {
      res.json({
        status: 400,
        message: 'Login first'
      })
    }

})

/**
 * @api {post} /api/login User Login
 * @apiName User Login
 * @apiGroup API
 *
 * @apiParam {String} operation   'add' | ''
 * @apiParam {String} password
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 ok
 * {
 *  "data":
 *    {
 *      "token": "some_token",
 *      "message": "Login Success"
 *    },
 *  "status": 200
 * }
 * @apiError 400 Bad User Input
 * @apiErrorExample 400 Error: Login Failed
 *  HTTP/1.1 400 Bad Input
 *  {
 *    "message":  "Login Failed, check password",
 *    "status" : 400
 *  }
 *
 *
 */
router.post('/login', (req, res) => {

  console.log('logging in');
  // console.log(JSON.stringify(req.session));

  var form = {
    name: req.body.username,
    password: req.body.password
  };
  request.post({
    url: baseUrl + '/login',
    form: form,
    headers: {
      "Content-Type": "text/html"
    }
  }, function (err, httpResponse, body) {
    console.log(body)
    var result = JSON.parse(body)
    if(result.status === 200) {
      req.session.login = {
        name: req.body.username,
        token: JSON.parse(body).data.sessionid
      }
      // console.log(JSON.stringify(req.session));

      req.session.save();
      res.json({
        status: 200,
        data: {
          message: 'Login Success',
          token: req.session.login.token
        }
      })
    } else {
      res.json(result)
    }

  })
})

router.post('/logout', function (req, res) {
    req.session.login = null;
    req.session.save()
    res.json({
        status: 200,
        data: {
            message: 'Logout Success'
        }
    })
})
/**
 * @api {post} /api/user User Operation
 * @apiName User Operation
 * @apiGroup User
 *
 * @apiRequestExample
 * {
 *  "operation": "add",
 *  "name": "wangpiaoliang",
 *  "password": "123",
 *  "role": "intern"
 * }
 *
 *
 * {
 *  "operation": "delete",
 *  "name": "wangpiaoliang",
 *  "token" : "wangpiaoliang's working token"
 * }
 *
 *
 * {
 *  "operation": "update",
 *  "token": "wangxiaodui's working token"
 *  "name": "wangpiaoliang",
 *  "new_name": "wangxiaodui",
 *  "new_password": "new pass",
 *  "new_role": "admin" // this should be optional
 * }
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 ok
 * {
 *  "data":
 *    {
 *      "message": "Success"
 *    },
 *  "status": 200
 * }
 * @apiError 400 Bad User Input
 * @apiErrorExample 400 Error: Login Failed
 *  HTTP/1.1 400 Bad Input
 *  {
 *    "message":  "Failed Reason",
 *    "status" : 400
 *  }
 *
 *
 */
router.post('/user/add', function (req, res) {
    var form = {
        operation: 'add',
        name: 'yo',
        password: 'haha'
    };
    request.post({
        url: baseUrl + '/user',
        form: form,
        headers: {
            "Content-Type": "text/html"
        }
    }, function (err, httpResponse, body) {
        res.json(JSON.parse(body))
    })
});

router.post('/user/delete', function (req, res) {
    var form = {
        operation: 'delete',
        name: 'yo'
    };
    request.post({
        url: baseUrl + '/user',
        form: form,
        headers: {
            "Content-Type": "text/html"
        }
    }, function (err, httpResponse, body) {
        res.json(JSON.parse(body))
    })
});

router.post('/user/update', function (req, res) {
    var form = {
        operation: 'update',
        name: 'wangpiaoliang',
        new_name: 'shh',
        new_password: '11111'
    };
    request.post({
        url: baseUrl + '/user',
        form: form,
        headers: {
            "Content-Type": "text/html"
        }
    }, function (err, httpResponse, body) {
        res.json(JSON.parse(body));
    });
});

router.get('/list_disease', (req, res) => {
    request.get({
        url: baseUrl + '/disease'
    }, function (err, httpResponse, body) {
        res.json((JSON.parse(body))); //todo need parse json here
    });
});

router.get('/list_case', (req, res) => {
    request.get({
        url: baseUrl + '/case'
    }, function (err, httpResponse, body) {
        res.json((JSON.parse(body))); //todo need parse json here
    });
});


module.exports = router;
