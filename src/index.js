import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/App';
import './index.scss';
window.$ = window.jQuery = require('jquery');
require('../node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.js');
window.adminlte = require('admin-lte');
window._ = require('lodash');
//window.axios = require('axios');

ReactDOM.render(
    <App />,
    document.getElementById('root')
);