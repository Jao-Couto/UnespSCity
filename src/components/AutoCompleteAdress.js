import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../config";

class AutoCompleteAdress extends Component {
    render() {
        const style = this.props.inMap ? {
            container: {
                zIndex: 9999,
                elevation: 9999,
                position: 'absolute',
                width: '90%',
                marginTop: 60
            }
        } : ''
        return (
            <GooglePlacesAutocomplete
                styles={style}
                placeholder='Endereço'
                textInputProps={{
                    placeholderTextColor: '#aaa',
                    returnKeyType: "search"
                }}

                onPress={(data, details = null) => {
                    console.log("ola");
                    console.log(details.geometry.location);
                    this.props.setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    })
                    this.props.setMarker({
                        latlng: {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        }
                    })
                    console.log(details.geometry.location);
                }}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'pt.br',
                }}
                fetchDetails={true}
            />
        )
    }
}


export default AutoCompleteAdress