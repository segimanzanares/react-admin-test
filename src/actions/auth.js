import api from '../api';

export const REQUEST_CLIENT_TOKEN = 'REQUEST_CLIENT_TOKEN'
export const REQUEST_CLIENT_TOKEN_SUCCESS = 'REQUEST_CLIENT_TOKEN_SUCCESS'
export const REQUEST_CLIENT_TOKEN_ERROR = 'REQUEST_CLIENT_TOKEN_ERROR'
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export function requestClientToken() {
    return {
        type: REQUEST_CLIENT_TOKEN,
    }
}

export function requestClientTokenError(error) {
    return {
        type: REQUEST_CLIENT_TOKEN_ERROR,
        error
    }
}

export function requestClientTokenSuccess(auth) {
    return {
        type: REQUEST_CLIENT_TOKEN_SUCCESS,
        auth,
    }
}

function shouldRequestClientToken(auth) {
    if (!auth) {
        return true
    }
    return auth.expires_at <= Date.now()
}

export function requestClientTokenIfNeeded() {
    return (dispatch, getState) => {
        if (shouldRequestClientToken(getState().auth.auth)) {
            return dispatch(fetchClientToken())
        }
    }
}

export function fetchClientToken() {
    return dispatch => {
        dispatch(requestClientToken())
        let data = {
            grant_type: 'client_credentials',
            client_id: process.env.REACT_APP_API_CLIENT_CREDENTIALS_ID,
            client_secret: process.env.REACT_APP_API_CLIENT_CREDENTIALS_SECRET,
        };
        return api('post', '/oauth/token', data)
            .then(response => {
                dispatch(requestClientTokenSuccess(response.data))
            })
            .catch(err => dispatch(requestClientTokenError(err)))
    }
}

export function login(email, password, redirect) {
    return {
        type: LOGIN,
        email,
        password,
        redirect
    }
}

export function performLogin(email, password) {
    return dispatch => {
        dispatch(login(email, password));
        let data = {
            username: email,
            password,
            grant_type: 'password',
            client_id: process.env.REACT_APP_API_CLIENT_ID,
            client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
        };
        return api('post', '/oauth/token', data)
            .then(response => {
                return response;
            })
            .then(response => dispatch(loginSuccess(response.data)))
            .catch(err => dispatch(loginError(err)))
    }
}

export function loginSuccess(auth) {
    return {
        type: LOGIN_SUCCESS,
        auth
    }
}

export function loginError(error) {
    return {
        type: LOGIN_ERROR,
        error
    }
}

export function logout() {
    return {
        type: LOGOUT,
    }
}

export function updateProfile(userData) {
    return {
        type: UPDATE_PROFILE,
        userData
    }
}

export function performUpdateProfile(userData) {
    return dispatch => {
        dispatch(updateProfile(userData));
        return api('put', '/users/me', userData)
            .then(response => dispatch(updateProfileSuccess(response.data.data)))
            .catch(err => dispatch(updateProfileError(err)))
    }
}

export function updateProfileSuccess(updatedUser) {
    window.toastr['success']("Perfil actualizado satisfactoriamente!");
    return {
        type: UPDATE_PROFILE_SUCCESS,
        updatedUser
    }
}

export function updateProfileError(error) {
    return {
        type: UPDATE_PROFILE_ERROR,
        error
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR,
    }
}

export function forgotPassword(email) {
    return {
        type: FORGOT_PASSWORD,
        email,
    }
}

export function performForgotPassword(email) {
    return dispatch => {
        dispatch(forgotPassword(email));
        return api('post', '/password/email', { email })
            .then(response => dispatch(forgotPasswordSuccess(response.data.message)))
            .catch(err => dispatch(forgotPasswordError(err)))
    }
}

export function forgotPasswordSuccess(message) {
    window.toastr['success'](message);
    return {
        type: FORGOT_PASSWORD_SUCCESS,
    }
}

export function forgotPasswordError(error) {
    return {
        type: FORGOT_PASSWORD_ERROR,
        error
    }
}

export function resetPassword(credentials) {
    return {
        type: RESET_PASSWORD,
        credentials,
    }
}

export function performResetPassword(data) {
    return dispatch => {
        dispatch(resetPassword(data));
        return api('post', '/password/reset', data)
            .then(response => dispatch(resetPasswordSuccess(response.data.message)))
            .catch(err => dispatch(resetPasswordError(err)))
    }
}

export function resetPasswordSuccess(message) {
    window.toastr['success'](message);
    return {
        type: RESET_PASSWORD_SUCCESS,
    }
}

export function resetPasswordError(error) {
    return {
        type: RESET_PASSWORD_ERROR,
        error
    }
}