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
    token: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                userId: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                mobilePhone: action.payload.mobilePhone,
                cityId: action.payload.cityId,
                token: action.payload.token,

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