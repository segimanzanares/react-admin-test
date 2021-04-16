import {
    LOAD_USERS,
    LOAD_USERS_SUCCESS,
    LOAD_USERS_ERROR,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    CLEAR_ERROR
} from '../actions';

export const initialState = {
    isLoading: false,
    total: 0,
    options: null,
    error: null,
    data: [],
    creatingUser: null,
    editingUser: null,
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
        case CREATE_USER:
            return { ...state, creatingUser: action.userData, lastAction: action.type };
        case CREATE_USER_SUCCESS:
            return { ...state, data: [...state.data, action.createdUser], total: state.total + 1, lastAction: action.type };
        case CREATE_USER_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case UPDATE_USER:
            return { ...state, editingUser: action.userData, lastAction: action.type };
        case UPDATE_USER_SUCCESS:
            let i = state.data.findIndex((u) => u.id == state.editingUser);
            let data = [...state.data];
            data[i] = state.userData;
            return { ...state, data: data, lastAction: action.type };
        case UPDATE_USER_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case CLEAR_ERROR:
            return { ...state, error: null, lastAction: action.type };
        default:
            return state;
    }
}