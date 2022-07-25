import {
    STARRED
} from '../actions/actionType'

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
            return {
                ...state,
                starred: star
            }
        default:
            return state
    }
}

export default reducer