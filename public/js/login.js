/**
 * Created by zhoucheng on 3/1/17.
 */

$(document).ready(function() {

  $('#login').on('click', function() {
    var params = {
      username: $('.sign-in-htm #user').val(),
      password: $('.sign-in-htm #pass').val()
    }
    API.login(params, function(err, result){
      if(err)
        alert('login fail')
      else {
          location.href = '/'
      }
    })
  })

  $('#sign_up').on('click', function() {
    var params = {
      name: $('.sign-up-htm #user').val(),
      password: $('.sign-up-htm #pass').val()
    }
    // alert(JSON.stringify(params))
    API.register(params, function(err, result){
      if(err)
        alert('register fail')
      else {
        location.href = '/login'
      }
    })
  })
})
