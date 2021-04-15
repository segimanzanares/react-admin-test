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
    if (method === 'get') {
        if (data) {
            url += '?';
            Object.keys(data).forEach(key => {
                if (data[key] !== null) {
                    url += key + '=' + data[key] + '&';
                }
            });
        }
    }
    return axios[method](apiBaseUrl + url, data, options)
        .then(response => response)
        .catch(error => {
            let parsedError = {
                status: error.response.status,
                code: error.response.data?.code,
                errors: error.response.data?.errors,
                message: error.response.data?.message,
            }
            if (parsedError.status === 401) {
                /*this.storage.removeItem('app-token');
                this.router.navigate(['login']);*/
            }
            else if (parsedError.status === 403) {
                if (parsedError.message) {
                    window.toastr.error(parsedError.message, '', {
                        timeOut: 10000
                    });
                }
                //this.router.navigate(['home']);
            }
            else if (parsedError.status === 422) {
                if (parsedError.message) {
                    window.toastr.error(parsedError.message, '', {
                        timeOut: 10000
                    });
                }
            }
            else if (parsedError.status === 429) {
                window.toastr.error("Se excedió el límite de peticiones al API. Vuelva a intentarlo en 1 minuto.", '', {
                    timeOut: 10000
                });
            }
            else if (parsedError.status === 500) {
                let msg = "An error occurred on the server when your request was being processed, we will solve the problem as soon as possible.";
                window.toastr.error(msg, '', {
                    timeOut: 10000
                });
            }
            return Promise.reject(parsedError);
        });
}