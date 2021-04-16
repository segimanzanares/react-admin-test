import api from '../api';

export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS'
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR'
export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export function clearError() {
    return {
        type: CLEAR_ERROR,
    }
}

export function loadUsers(options) {
    return {
        type: LOAD_USERS,
        options
    }
}

export function loadUsersSuccess(data, total) {
    return {
        type: LOAD_USERS_SUCCESS,
        data,
        total
    }
}

export function loadUsersError(err) {
    return {
        type: LOAD_USERS_ERROR,
        err
    }
}

export function loadUsersIfNeeded(options) {
    return (dispatch, getState) => {
        if (getState().users.error !== null) {
            dispatch(clearError())
        }
        if (shouldFetchUsers(getState().users)) {
            return dispatch(fetchUsers(options))
        }
    }
}

function shouldFetchUsers(state) {
    if (state.isLoading) {
        return false
    }
    if (state.data.length === 0) {
        return true
    }
    return false
}

export function fetchUsers(options) {
    return dispatch => {
        dispatch(loadUsers(options))
        return api('get', '/users', options)
            .then(response => response.data)
            .then(response => dispatch(loadUsersSuccess(response.data, response.total)))
            .catch(err => dispatch(loadUsersError(err)))
    }
}

export function createUser(userData) {
    return {
        type: CREATE_USER,
        userData
    }
}

export function performCreateUser(userData) {
    return dispatch => {
        dispatch(createUser(userData));
        return api('post', '/users', userData)
            .then(response => {
                console.log(response.data);
                return response;
            })
            .then(response => {
                dispatch(createUserSuccess({}, response.data.message))
                dispatch(fetchUsers({}))
            })
            .catch(err => dispatch(createUserError(err)))
    }
}

export function createUserSuccess(createdUser, message) {
    window.toastr['success'](message);
    return {
        type: CREATE_USER_SUCCESS,
        createdUser
    }
}

export function createUserError(error) {
    return {
        type: CREATE_USER_ERROR,
        error
    }
}

export function updateUser(userData) {
    return {
        type: UPDATE_USER,
        userData
    }
}

export function performUpdateUser(userData) {
    return dispatch => {
        dispatch(updateUser(userData));
        return api('put', `/users/${userData.id}`, userData)
            .then(response => {
                console.log(response.data);
                return response;
            })
            .then(response => dispatch(updateUserSuccess(response.data.data, response.data.message)))
            .catch(err => dispatch(updateUserError(err)))
    }
}

export function updateUserSuccess(updatedUser, message) {
    window.toastr['success'](message);
    return {
        type: UPDATE_USER_SUCCESS,
        updatedUser
    }
}

export function updateUserError(error) {
    return {
        type: UPDATE_USER_ERROR,
        error
    }
}
