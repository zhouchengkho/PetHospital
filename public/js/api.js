/**
 * Created by zhoucheng on 3/1/17.
 */

function API() {
  // var baseUrl = 'http://localhost:3000';
  var baseUrl = '/api'
  function get(url, params, callback) {
    $.ajax({
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      url: baseUrl + url,
      dataType: 'json'
    }).done(function(res){
      if(res.status == 200)
        callback(null, res.data)
      else
        callback(new Error(res.message))
    });
  }

  function post(url, params, callback) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      url: baseUrl + url,
      data: JSON.stringify(params),
      dataType: 'json'
    }).done(function(res){
      // console.log(res)
      if(res.status == 200)
        callback(null, res.data)
      else
        callback(new Error(res.message))
    });

  }
  this.login = function(params, callback) {
    post('/login', params, callback)
  }
}

window.API = new API();
