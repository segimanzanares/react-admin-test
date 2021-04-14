import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import devtools from '../devtools'
import { loadState, saveState } from './localstorage'

const initialData = loadState();

const configureStore = () => {
    const store = createStore(
        rootReducer,
        initialData,
        compose(
            applyMiddleware(thunk, createLogger()),
            devtools.instrument()
        )
    )
    store.subscribe(function () {
        saveState(store.getState())
    })

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
}

export default configureStore
