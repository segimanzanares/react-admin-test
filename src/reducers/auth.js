import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    CLEAR_ERROR
} from '../actions';

import axios from 'axios';

export const initialState = {
    isAuthenticated: false,
    credentials: null,
    auth: null,
    error: null,
    lastAction: null,
};


export function reducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case LOGIN:
            return { ...state, credentials: { email: action.email, password: action.password }, lastAction: action.type };
        case LOGIN_SUCCESS:
            axios.defaults.headers.common['Authorization'] = action.auth.token_type + ' ' + action.auth.access_token;
            return { ...state, error: null, auth: action.auth, isAuthenticated: true, lastAction: action.type };
        case LOGIN_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case LOGOUT:
            return { ...initialState, lastAction: action.type };
        case UPDATE_PROFILE:
            return { ...state, lastAction: action.type };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, auth: {...state.auth, user: action.updatedUser}, lastAction: action.type };
        case UPDATE_PROFILE_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case CLEAR_ERROR:
            return { ...state, error: null, lastAction: action.type };
        default:
            return state;
    }
}