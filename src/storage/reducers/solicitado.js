import {
    LIST_AREA,
    TYPE_STATE
} from '../actions/actionType'

const initialState = {
    type: "",
    area: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE_STATE:
            return {
                ...state,
                type: action.payload
            }
        case LIST_AREA:
            return {
                ...state,
                area: action.payload
            }
        default:
            return state
    }
}

export default reducer