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
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    TOGGLE_USER,
    TOGGLE_USER_SUCCESS,
    TOGGLE_USER_ERROR,
    CLEAR_ERROR
} from '../actions';

export const initialState = {
    isLoading: false,
    total: 0,
    options: null,
    error: null,
    data: [],
    creatingUser: null,
    selectedUser: null,
    lastAction: null
};


export function reducer(
    state = initialState,
    action
) {
    let i = -1;
    let data = [];
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
            return { ...state, data: [...state.data, action.createdUser], total: state.total + 1, error: null, lastAction: action.type };
        case CREATE_USER_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case UPDATE_USER:
            return { ...state, selectedUser: action.userData, lastAction: action.type };
        case UPDATE_USER_SUCCESS:
            i = state.data.findIndex((u) => u.id == state.selectedUser.id);
            data = [...state.data];
            data[i] = action.updatedUser;
            return { ...state, data: data, error: null, lastAction: action.type };
        case UPDATE_USER_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case DELETE_USER:
            return { ...state, selectedUser: action.userData, lastAction: action.type };
        case DELETE_USER_SUCCESS:
            i = state.data.findIndex((u) => u.id == state.selectedUser.id);
            data = [...state.data];
            data.splice(i, 1);
            return { ...state, data: data, error: null, lastAction: action.type };
        case DELETE_USER_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case TOGGLE_USER:
            return { ...state, selectedUser: action.userData, lastAction: action.type };
        case TOGGLE_USER_SUCCESS:
            i = state.data.findIndex((u) => u.id == state.selectedUser.id);
            data = [...state.data];
            data[i].is_active = action.isActive;
            return { ...state, data: data, error: null, lastAction: action.type };
        case TOGGLE_USER_ERROR:
            return { ...state, error: action.error, lastAction: action.type };
        case CLEAR_ERROR:
            return { ...state, error: null, lastAction: action.type };
        default:
            return state;
    }
}