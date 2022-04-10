import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
} from '../actions/actionType'

const initialState = {
    name: null,
    email: null,
    phone: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            console.log(action.payload);
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone
            }
        case USER_LOGGED_OUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer