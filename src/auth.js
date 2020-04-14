import api from './api';
import axios from 'axios';

export default {
    isAuthenticated: () => {
        return localStorage.getItem('isAuthenticated') === '1';
    },
    login(credentials, onLogin, onError) {
        let data = {
            ...credentials,
            grant_type: 'password',
            client_id: process.env.REACT_APP_API_CLIENT_ID,
            client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
        };
        api('post', '/oauth/token', data, {
            onSuccess: (response) => {
                localStorage.setItem('isAuthenticated', 1);
                localStorage.setItem('session_data', JSON.stringify(response.data));
                axios.defaults.headers.common['Authentication'] = response.data.token_type 
                        + ' ' + response.data.access_token;
                if (onLogin) {
                    onLogin();
                }
            },
            onError: (error) => {
                if (onError) {
                    onError(error.response);
                }
            }
        });
    },
    logout(cb) {
        localStorage.setItem('isAuthenticated', 0);
    }
}