import api from '../api';

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

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
            .then(response => {
                console.log(response.data);
                return response;
            })
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
