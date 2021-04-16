import {
    LOAD_CATALOG_ROLES,
    LOAD_CATALOG_ROLES_SUCCESS,
} from '../actions';

export const initialState = {
    roles: [],
    lastAction: null
};

export function reducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case LOAD_CATALOG_ROLES:
            console.log(state);
            return { ...state, lastAction: action.type };
        case LOAD_CATALOG_ROLES_SUCCESS:
            return { ...state, roles: action.data, lastAction: action.type };
        default:
            return state;
    }
}