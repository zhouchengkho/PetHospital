/**
 * Created by zhoucheng on 3/1/17.
 */

const baseUrl = "http://52.187.170.117:8080";

function API() {
    const prefix = 'http://localhost:8080';

    function getToken() {
        return window.localStorage.getItem('token');
    }

    function get(url, params, callback) {
        if (params)
            url += params;

        $.ajax({
            type: 'GET',
            url: baseUrl + url,
            dataType: 'json',
            headers: {
                token: getToken()
            }
        }).done((res) => {
            if (res.status == 200) {
                callback(null, res.data);
            }
            else {
                callback(new Error(res.message));
            }
        });
    }

    function post(url, params, callback) {
        let options = {
            type: 'POST',
            url: baseUrl + url,
            dataType: 'json',
            headers: {
                token: getToken()
            }
        };
        if (params)
            options.data = params;
        $.ajax(options).done((res) => {
            if (res.status == 200)
                callback(null, res.data);
            else
                callback(new Error(res.message));
        })
    }

    this.login = function (params, callback) {
        let options = {
            type: 'POST',
            url: '/api/login',
            dataType: 'json',
            data: params
        };
        $.ajax(options).done((res) => {
            if (res.status == 200) {
                window.localStorage.setItem('token', res.data.token);
                callback(null, res.data);
            }
            else
                callback(new Error(res.message));
        })
    };

    this.logout = function (params, callback) {
        let options = {
            type: 'POST',
            url: '/api/logout',
            dataType: 'json',
            headers: {
                token: getToken()
            }
        };
        $.ajax(options).done((res) => {
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

    this.add_disease = function (params, callback) {
        post('/disease/add', params, callback)
    };


    this.add_case = function (params, callback) {
        post('/case/add', params, callback)
    };

    this.add_treatment = function (params, callback) {
        post('/case/treatment/add', params, callback);
    };


    this.register = function (params, callback) {
        post('/user/add', params, callback)
    }

}

window.API = new API();
