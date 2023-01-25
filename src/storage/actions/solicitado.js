import { TYPE_STATE, LIST_AREA } from "./actionType"

export const setType = type => {
    return {
        type: TYPE_STATE,
        payload: type
    }
}

export const setArea = area => {
    return {
        type: LIST_AREA,
        payload: area
    }
}
