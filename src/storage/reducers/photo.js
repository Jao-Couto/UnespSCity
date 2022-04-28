import {
    GET_PHOTO
} from '../actions/actionType'

const initialState = {
    photo: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTO:
            return {
                ...state,
                photo: action.payload.photo,
            }
        default:
            return state
    }
}

export default reducer