import { STARRED } from "./actionType"

export const addStar = star => {
    return {
        type: STARRED,
        payload: star
    }
}
