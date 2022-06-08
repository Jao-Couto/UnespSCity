import {
    createStore,
    combineReducers,
} from 'redux'
import userReducer from './reducers/user'
import markerReducer from './reducers/marker'

const reducers = combineReducers({
    user: userReducer,
    marker: markerReducer
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig