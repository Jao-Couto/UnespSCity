import { MARKERS } from "./actionType"

export const addMarker = marker => {
    return {
        type: MARKERS,
        payload: marker
    }
}
