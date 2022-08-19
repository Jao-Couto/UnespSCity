import {
    STARRED
} from '../actions/actionType'
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    starred: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STARRED:
            const existe = state.starred.filter((obj) => { return obj.id == action.payload.id; });
            let star = [...state.starred]
            if (existe.length > 0) {
                star.pop(action.payload)
                // return
            } else {
                star.push(action.payload);
            }
            const stringifiedArray = JSON.stringify(star)
            AsyncStorage.removeItem('STARRED')
            AsyncStorage.setItem('STARRED', stringifiedArray)
            return {
                ...state,
                starred: star
            }
        default:
            return state
    }
}

export default reducer