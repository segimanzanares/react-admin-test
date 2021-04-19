import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    REQUEST_CLIENT_TOKEN,
    REQUEST_CLIENT_TOKEN_SUCCESS,
    REQUEST_CLIENT_TOKEN_ERROR,
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
            return { ...state, auth: { ...state.auth, user: action.updatedUser }, error: null, lastAction: action.type };
        case UPDATE_PROFILE_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case REQUEST_CLIENT_TOKEN:
            return { ...state, lastAction: action.type };
        case REQUEST_CLIENT_TOKEN_SUCCESS:
            axios.defaults.headers.common['Authorization'] = action.auth.token_type + ' ' + action.auth.access_token;
            action.auth.expires_at = Date.now() + action.auth.expires_in;
            return { ...state, error: null, auth: action.auth, lastAction: action.type };
        case REQUEST_CLIENT_TOKEN_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case FORGOT_PASSWORD:
            return { ...state, credentials: { email: action.email }, lastAction: action.type };
        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, error: null, lastAction: action.type };
        case FORGOT_PASSWORD_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case RESET_PASSWORD:
            return { ...state, credentials: { email: action.email, password: action.password }, lastAction: action.type };
        case RESET_PASSWORD_SUCCESS:
            return { ...state, error: null, lastAction: action.type };
        case RESET_PASSWORD_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case CLEAR_ERROR:
            return { ...state, error: null, lastAction: action.type };
        default:
            return state;
    }
}