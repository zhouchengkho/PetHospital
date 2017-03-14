/**
 * Created by zhoucheng on 3/1/17.
 */
const express = require('express');
const router = express.Router();
var uuid = require('uuid');
var request = require('request');
var baseUrl = require('../config').baseUrl;
/** API **/

router.get('/session', function (req, res) {
    res.json({
        session: req.session
    })
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
router.post('/login', function (req, res) {

    console.log('logging in')
    req.session.login = {
        name: req.body.username,
        token: uuid.v4()
    }
    req.session.save();
    res.json({
        status: 200,
        data: {
            message: 'Login Success'
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
        url: baseUrl + '/disease/'
    }, function (err, httpResponse, body) {
        res.json((JSON.parse(body))) //todo need parse json here
    });
});

router.get('/list_case', (req, res) => {
    request.get({
        url: baseUrl + '/case/'
    }, function (err, httpResponse, body) {
        res.json((JSON.parse(body))) //todo need parse json here
    });
});


module.exports = router;
