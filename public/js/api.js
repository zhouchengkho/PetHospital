/**
 * Created by zhoucheng on 3/1/17.
 */

function API() {
    var baseUrl = '/api';

    function get(url, params, callback) {
        if (params)
            url += params;
        $.ajax({
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            url: baseUrl + url,
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
            contentType: 'application/json; charset=utf-8',
            url: baseUrl + url,
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
        post('/login', params, callback);
    };

    this.list_disease = function (params, callback) {
        get('/list_disease', params, callback);
    };

    this.list_case = function (params, callback) {
        get('/list_case', params, callback);
    };

    this.add_disease = function(params, callback) {
      get('add_disease', params, callback)
    }
}

window.API = new API();
