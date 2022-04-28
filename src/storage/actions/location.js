import { GET_LOCATION } from "./actionType"

export const getLocation = location => {
    return {
        type: GET_LOCATION,
        payload: location
    }
}
