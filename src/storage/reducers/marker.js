import {
    MARKERS
} from '../actions/actionType'

const initialState = {
    markers: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MARKERS:
            return {
                ...state,
                markers: [...state.markers, action.payload]
            }
        default:
            return state
    }
}

export default reducer