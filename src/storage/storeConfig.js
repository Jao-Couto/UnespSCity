import {
    createStore,
    combineReducers,
} from 'redux'
import userReducer from './reducers/user'
import markerReducer from './reducers/marker'
import starredReducer from './reducers/starred'

const reducers = combineReducers({
    user: userReducer,
    marker: markerReducer,
    starred: starredReducer
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig