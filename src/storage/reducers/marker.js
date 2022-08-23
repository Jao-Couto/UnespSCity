import {
    MARKERS,
    RESET_MARKERS
} from '../actions/actionType'

const initialState = {
    markers: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MARKERS:
            if (action.payload.length == undefined)
                return {
                    ...state,
                    markers: [...state.markers, action.payload]
                }
            return {
                ...state,
                markers: [...state.markers, ...action.payload]
            }
        case RESET_MARKERS:
            return {
                markers: []
            }
        default:
            return state
    }
}

export default reducer