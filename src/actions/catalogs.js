import api from '../api';

export const LOAD_CATALOG_ROLES = 'LOAD_CATALOG_ROLES'
export const LOAD_CATALOG_ROLES_SUCCESS = 'LOAD_CATALOG_ROLES_SUCCESS'

export function loadCatalogRoles() {
    return {
        type: LOAD_CATALOG_ROLES,
    }
}

export function loadCatalogRolesSuccess(data) {
    return {
        type: LOAD_CATALOG_ROLES_SUCCESS,
        data,
    }
}

export function loadCatalogRolesIfNeeded(callback) {
    return (dispatch, getState) => {
        if (shouldFetchCatalogRoles(getState().catalogs)) {
            return dispatch(fetchCatalogRoles(callback))
        }
    }
}

function shouldFetchCatalogRoles(state) {
    if (state.roles.length === 0) {
        return true
    }
    return false
}

export function fetchCatalogRoles(callback) {
    return dispatch => {
        dispatch(loadCatalogRoles())
        return api('get', '/catalogues/roles')
            .then(response => {
                dispatch(loadCatalogRolesSuccess(response.data))
                if (callback) {
                    callback()
                }
            })
            .catch(err => console.log(err))
    }
}