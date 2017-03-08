var auth = {
  isAuthenticated: function(req, res, next) {
    if(req.session.login)
      next()
    else
      return res.redirect('/login')
  }
}


module.exports = auth;
