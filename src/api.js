/* global _, FormData */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

export default function (method, url, data, config) {
    if (data === void 0) {
        data = {};
    }
    if (config === void 0) {
        config = {};
    }
    var options = {};
    if (config.headers !== void 0) {
        options.headers = config.headers;
        if (method === 'put' && options.headers.hasOwnProperty('Content-Type') 
                && options.headers['Content-Type'] === 'multipart/form-data') {
            method = 'post';
            if (data instanceof FormData) {
                data.append('_method', 'put');
            }
        }
    }
    axios[method](apiBaseUrl + url, data, options)
    .then(function(response) {
        if (!_.isNil(response.data.message)) {
            //toastr['success'](response.data.message);
        }
        if (config.onSuccess !== void 0) {
            if (_.isFunction(config.onSuccess)) {
                config.onSuccess(response);
            }
        }
    })
    .catch(function(error) {
        if (error.response.status === 422) {
            for (var key in error.response.data.errors) {
                if (error.response.data.errors.hasOwnProperty(key)) {
                    //vm.$set(vm.errors, key, error.response.data.errors[key]);
                }
            }
            //toastr['error']("Algunos datos son incorrectos.");
        }
        else {
            //toastr['error'](error.response.data.message);
        }
        if (config.onError !== void 0) {
            if (_.isFunction(config.onError)) {
                config.onError(error);
            }
        }
    })
    .then(function() {
        if (config.onResponse !== void 0) {
            if (_.isFunction(config.onResponse)) {
                config.onResponse();
            }
        }
    });
}