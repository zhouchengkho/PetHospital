/**
 * Created by zhoucheng on 3/1/17.
 */

$(document).ready(function() {

  $('#login').on('click', function() {
    var params = {
      username: $('.login-form #user').val(),
      password: $('.login-form #pass').val()
    }
    // alert(JSON.stringify(params))
    API.login(params, function(err, result){
      if(err)
        alert('login fail')
      else {
          location.href = '/'
      }
    })
  })
})
