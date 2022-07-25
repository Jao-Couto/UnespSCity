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

const reducers = combineReducers({
    user: userReducer,
    marker: markerReducer,
    starred: starredReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig