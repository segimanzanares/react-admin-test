import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './layout/App';
import axios from 'axios';
import './index.scss';
import configureStore from './store';

window.$ = window.jQuery = require('jquery');
require('../node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.js');
window.adminlte = require('admin-lte');
window._ = require('lodash');

const store = configureStore();

if (localStorage.getItem('session_data') !== null) {
    let data = JSON.parse(localStorage.getItem('session_data'));
    axios.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token;
}
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);