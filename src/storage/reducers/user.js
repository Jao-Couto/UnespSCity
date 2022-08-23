import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
} from '../actions/actionType'

const initialState = {
    userId: null,
    name: null,
    email: null,
    mobilePhone: null,
    cityId: null,
    token: null,
    isAdmin: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                userId: parseInt(action.payload.id, 10),
                name: action.payload.name,
                email: action.payload.email,
                mobilePhone: action.payload.mobilePhone,
                cityId: parseInt(action.payload.cityId, 10),
                token: action.payload.token,
                isAdmin: action.payload.isAdmin,
                panicButton: action.payload.panicButton
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