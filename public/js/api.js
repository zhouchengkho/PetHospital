/**
 * Created by zhoucheng on 3/1/17.
 */

function API() {
  const prefix = 'http://localhost:8080';

  function getToken() {
    var token = window.localStorage.getItem('token');
    return token;
  }
  function get(url, params, callback) {
    if (params)
      url += params;

    $.ajax({
      type: 'GET',
      url: prefix + url,
      dataType: 'json',
      headers: {
        token: getToken()
      }
    }).done( (res) => {
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
      url: prefix + url,
      dataType: 'json',
      headers: {
        token: getToken()
      }
    };
    if (params)
      options.data = JSON.stringify(params);
    $.ajax(options).done( (res) => {
      if (res.status == 200)
        callback(null, res.data);
      else
        callback(new Error(res.message));
    })
  }

  this.login = function (params, callback) {
    // post(api+'/login', params, function(err, result) {
    //   window.localStorage.setItem('token', result.token)
    //   callback(err, result)
    // });
    var options = {
      type: 'POST',
      url: '/api/login',
      dataType: 'json',
      data: JSON.stringify(params)
    };

    $.ajax(options).done( (res) => {
      if (res.status == 200) {
        window.localStorage.setItem('token', res.data.token)
        callback(null, res.data);
      }
      else
        callback(new Error(res.message));
    })
  };

  this.logout = function(params, callback) {
    var options = {
      type: 'POST',
      url: '/api/logout',
      dataType: 'json',
      headers: {
        token: getToken()
      }
    };
    $.ajax(options).done( (res) => {
      if (res.status == 200) {
        window.localStorage.clear();
        callback(null, res.data);
      }
      else
        callback(new Error(res.message));
    })
  };

  this.list_disease = function (params, callback) {
    get('/disease', params, callback);
  };

  this.list_case = function (params, callback) {
    get('/case', params, callback);
  };

  this.add_disease = function(params, callback) {
    post('/disease/add', params, callback)
  }

  this.add_case = function(params, callback) {
    post('/case/add', params, callback)
  }


}

window.API = new API();
