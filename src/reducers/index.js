import { reducer as authReducer } from './auth';
import { reducer as userReducer } from './users';
import { reducer as catalogReducer } from './catalogs';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    catalogs: catalogReducer,
})

export default rootReducer