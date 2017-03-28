var express = require('express');
var router = express.Router();
var request = require('request');
const baseUrl = require('../config').baseUrl;

/**
 * Login Auth
 //  */
router.all('/*', function(req, res, next) {
  if(req.url === '/login') {
    return next()
  }
  if(!req.session.login) {
    return res.redirect('/login');
  }
  next()
})

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});

});

router.get('/login', function (req, res) {
    res.render('login', {
        title: 'login',
        script: '<script type="text/javascript" src="/js/login.js"></script>',
        layout: false
    });
});

router.get("/3d_guidance", function (req, res) {
    res.render('3d_guidance');
});


router.get('/list_case', function (req, res) {
    res.render('list_case');
});
router.get('/learn', (req, res) => {


    res.render('learn')
});

router.get('/learn/reception', (req, res) => {
    request.get({
        url: baseUrl + '/disease'
    }, (err, httpResponse, body) => {
        var data = JSON.parse(body);
        if (data.status === 200) {
            var vital = data.data.slice(0, 1);
            var list = data.data.slice(1, 10);
            console.log(vital)
            console.log(list)
            res.render('reception', {
                status: 200,
                data: {
                    vital: vital,
                    list: list
                }
            })
        } else {
            res.render('error', {message: data.message})
        }
    })
    // res.render('reception')
});

router.get('/learn/vet', (req, res) => {
    request.get({
        url: baseUrl + '/disease'
    }, (err, httpResponse, body) => {
        var data = JSON.parse(body);
        if (data.status === 200) {
            var vital = data.data.slice(0, 1);
            var list = data.data.slice(1, 10);
            console.log(vital)
            console.log(list)
            res.render('vet', {
                status: 200,
                data: {
                    vital: vital,
                    list: list
                }
            })
        } else {
            res.render('error', {message: data.message})
        }
    })
});

router.get('/learn/assistant', (req, res) => {
    request.get({
        url: baseUrl + '/disease'
    }, (err, httpResponse, body) => {
        var data = JSON.parse(body);
        if (data.status === 200) {
            var vital = data.data.slice(0, 1);
            var list = data.data.slice(1, 10);
            console.log(vital)
            console.log(list)
            res.render('assistant', {
                status: 200,
                data: {
                    vital: vital,
                    list: list
                }
            })
        } else {
            res.render('error', {message: data.message})
        }
    })
});

router.get('/profile', (req, res) => {
    var result = {};
    request.get({
        url: baseUrl + '/user/profile',
        headers: {
            token: req.session.login.token
        }
    }, (err, httpResponse, body) => {
        var data = JSON.parse(body)
        console.log(data)
        if (data.status != 200) {
            returnres.render('error', {message: data.message})
        } else {
            result.profile = data.data
            request.get({
                url: baseUrl + '/case',
                headers: {
                    token: req.session.login.token
                }
            }, (err, httpResponse, body) => {
                var data = JSON.parse(body)
                console.log(data)
                if (data.status != 200) res.render('error', {message: data.message});
                else {
                    result.case = data.data.slice(0, 10);
                    res.render('profile', result)
                }
            });
        }
    });
    // res.render('profile')
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
            if (data.status != 200)
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
