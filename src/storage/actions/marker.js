import pracaService from "../../services/pracaService"
import { MARKERS } from "./actionType"
import 'intl';
import "intl/locale-data/jsonp/pt";

export const addMarker = marker => {
    return {
        type: MARKERS,
        payload: marker
    }
}

export const loadMarkers = () => {
    return dispatch => {
        pracaService.getMarkers()
            .then(res => {
                const data = res.data.map(item => {
                    const date = new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }).format(new Date((item.date)))
                    return { latlng: { latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }, name: "Solicitação para Praça", date: date }

                });

                dispatch(addMarker(data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}