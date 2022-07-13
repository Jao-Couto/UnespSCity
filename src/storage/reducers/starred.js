import {
    STARRED
} from '../actions/actionType'

const initialState = {
    starred: [1],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STARRED:
            const existe = state.starred.indexOf(action.payload) >= 0
            let star = [...state.starred]
            if (existe) {
                star.pop(action.payload)
                // return
            } else {
                star.push(action.payload);
            }
            return {
                ...state,
                starred: star
            }
        default:
            return state
    }
}

export default reducer