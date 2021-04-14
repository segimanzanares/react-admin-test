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
    return axios[method](apiBaseUrl + url, data, options)
        .then(response => response)
        .catch(error => {
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
            /*if (error.status === 401 && this && this.router) {
                this.storage.removeItem('app-token');
                this.router.navigate(['login']);
            }
            else if (error.status === 403) {
                this.toastr.error(error.error.message, '', {
                    timeOut: 10000
                });
                this.router.navigate(['home']);
            }
            else if (error.status === 429) {
                this.toastr.error("Se excedió el límite de peticiones al API. Vuelva a intentarlo en 1 minuto.", '', {
                    timeOut: 10000
                });
            }
            else if (error.status === 500) {
                let msg = "An error occurred on the server when your request was being processed, we will solve the problem as soon as possible.";
                this.translate.get(msg, {}).subscribe((trans) => {
                    this.toastr.error(trans, '', {
                        timeOut: 10000
                    });
                });
            }*/
            return Promise.reject(error);
        });
    }