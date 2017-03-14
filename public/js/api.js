/**
 * Created by zhoucheng on 3/1/17.
 */

function API() {
  const api = '/api';

  const prefix = 'http://localhost:8080';

  function get(url, params, callback) {
    if (params)
      url += params;

    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json'
    }).done(function (res) {
      if (res.status == 200) {
        console.log(res.data);
        callback(null, res.data);
      }
      else {
        callback(new Error(res.message));
      }
    });
  }

  function post(url, params, callback) {
    var options = {
      type: 'POST',
      url: url,
      dataType: 'json'
    };
    if (params)
      options.data = JSON.stringify(params);
    $.ajax(options).done(function (res) {
      if (res.status == 200)
        callback(null, res.data);
      else
        callback(new Error(res.message));
    });
  }

  this.login = function (params, callback) {
    post(api+'/login', params, callback);
  };

  this.logout = function(params, callback) {
    post(api+'/logout', params, callback)
  };

  this.list_disease = function (params, callback) {
    get(prefix+'/disease', params, callback);
  };

  this.list_case = function (params, callback) {
    get(prefix+'/case', params, callback);
  };

  this.add_disease = function(params, callback) {
    post(prefix+'/disease/add', params, callback)
  }

  this.list_class = function(params, callback) {
    get(prefix+'/case', params, callback)
  }
}

window.API = new API();
