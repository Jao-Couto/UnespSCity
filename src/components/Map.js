import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import commonStyle from "../commonStyle";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AutoCompleteAdress from '../components/AutoCompleteAdress'
let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Map extends Component {
    state = {
        region: {},
        marker: {},
        ready: false
    }

    componentDidMount = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let coords = this.props.coords || (await Location.getCurrentPositionAsync()).coords

        if (coords) {
            const { latitude, longitude } = coords;
            this.setState({
                region: {
                    latitude,
                    longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
                ready: true
            })
        }

        if (this.props.coords) {

            this.setState({
                marker: { latlng: coords }
            })
        }
    }

    addMarker = (e) => {
        if (this.props.enableAddMarker) {
            this.setState({
                marker: { latlng: e.nativeEvent.coordinate }, region: {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
            })
            this.props.setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.showAutoComplte &&
                    <AutoCompleteAdress
                        setRegion={(region) => this.setState({ region })}
                        setMarker={(marker) => this.setState({ marker })}
                        inMap
                    />
                }
                {this.state.ready ?
                    <MapView
                        region={this.state.region}
                        style={[styles.map, this.props.size]}
                        onPress={(e) => this.addMarker(e)}
                        showsUserLocation
                        provider="google">
                        {
                            Object.keys(this.state.marker).length !== 0 ?
                                <MapView.Marker coordinate={this.state.marker.latlng} title={this.props.markerName}>
                                </MapView.Marker>
                                : null
                        }

                    </MapView>
                    :
                    <Text>Loading...</Text>}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: commonStyle.colors.primary,
        alignItems: 'center'
    },
    map: {
        height: '100%',
        width: '100%'
    },
})


export default Map