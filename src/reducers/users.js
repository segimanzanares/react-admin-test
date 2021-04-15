import {
    LOAD_USERS,
    LOAD_USERS_SUCCESS,
    LOAD_USERS_ERROR,
    CLEAR_ERROR
} from '../actions';

export const initialState = {
    isLoading: false,
    total: 0,
    options: null,
    error: null,
    data: [],
    lastAction: null
};


export function reducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case LOAD_USERS:
            return { ...state, options: action.options, lastAction: action.type };
        case LOAD_USERS_SUCCESS:
            return { ...state, total: action.total, data: action.data, lastAction: action.type };
        case LOAD_USERS_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case CLEAR_ERROR:
            return { ...state, error: null, lastAction: action.type };
        default:
            return state;
    }
}