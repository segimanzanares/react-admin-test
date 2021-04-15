import { reducer as authReducer } from './auth';
import { reducer as userReducer } from './users';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
})

export default rootReducer