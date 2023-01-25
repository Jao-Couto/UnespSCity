import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/user'
import markerReducer from './reducers/marker'
import starredReducer from './reducers/starred'
import solicitadoReducer from './reducers/solicitado'

const reducers = combineReducers({
    user: userReducer,
    marker: markerReducer,
    starred: starredReducer,
    solicitado: solicitadoReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig