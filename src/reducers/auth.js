import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    RECEIVE_POSTS,
    FETCH_POSTS_ERROR,
    RESET_ERROR
} from '../actions';

import axios from 'axios';

export const initialState = {
    isAuthenticated: false,
    credentials: null,
    auth: null,
    error: null
};


export function reducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case LOGIN:
            return { ...state, credentials: { email: action.email, password: action.password } };
        case LOGIN_SUCCESS:
            axios.defaults.headers.common['Authorization'] = action.auth.token_type + ' ' + action.auth.access_token;
            return { ...state, error: null, auth: action.auth, isAuthenticated: true };
        case LOGIN_ERROR:
            return { ...state, error: action.error };
        case LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}