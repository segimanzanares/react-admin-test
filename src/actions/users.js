import api from '../api';

export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS'
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR'
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
