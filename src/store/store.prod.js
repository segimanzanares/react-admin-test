import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const initialData = loadState();

const configureStore = () => {
    const store = createStore(
        rootReducer,
        initialData,
        compose(
            applyMiddleware(thunk, createLogger())
        )
    )

    return store
}

export default configureStore
