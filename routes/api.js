/**
 * Created by zhoucheng on 3/1/17.
 */
var express = require('express');
var router = express.Router();
var uuid = require('uuid');
/** API **/

/**
 * @api {post} /user/login User Login
 * @apiName User Login
 * @apiGroup User
 *
 * @apiParam {String} username
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
router.post('/login', function(req, res) {

  req.session.token = uuid.v4()
  req.session.username = req.body.username;
  req.session.save()
  // console.log(req.sessionID)
  // console.log(req.session.cookie)
  res.json({
    status: 200,
    data: {
      message: 'Login Success'
    }
  })
})

router.get('/test', function(req, res) {
  res.json({
    session: req.session
  })
})


module.exports = router;
