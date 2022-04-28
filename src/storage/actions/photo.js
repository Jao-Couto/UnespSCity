import { GET_PHOTO } from "./actionType"

export const getPhoto = photo => {
    return {
        type: GET_PHOTO,
        payload: photo
    }
}
