import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import commonStyle from "../commonStyle";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import AutoCompleteAdress from '../components/AutoCompleteAdress'
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../config';

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
            console.log(e.nativeEvent.coordinate);
            this.props.setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
        }
    }

    routeTruck = () => {
        if (this.props.origin && this.props.destination)
            return (
                <>
                    <MapView.Marker key={1} coordinate={this.props.origin} title={"Saída"}>
                    </MapView.Marker>
                    <MapView.Marker key={2} coordinate={this.props.destination} title={"Chegada"}>
                    </MapView.Marker>
                    <MapViewDirections
                        origin={this.props.origin}
                        destination={this.props.destination}
                        apikey={GOOGLE_API_KEY}
                        strokeColor="#048831"
                        strokeWidth={5}
                    />
                </>
            )

    }

    render() {

        return (
            <View style={styles.container}>
                {this.props.showAutoComplte && false &&
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
                        showsUserLocation={true}
                        provider="google">
                        {Object.keys(this.state.marker).length !== 0 ?
                            <MapView.Marker coordinate={this.state.marker.latlng}>
                            </MapView.Marker> : null
                        }
                        {this.props.marker &&
                            this.props.marker.map((mark, i) => {
                                console.log(mark.latlng);
                                return <MapView.Marker key={i} coordinate={mark.latlng} title={mark.name}>
                                </MapView.Marker>
                            })
                        }
                        {this.routeTruck()}
                        {this.props.area &&
                            <MapView.Circle center={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }} radius={900} strokeColor="#f00" fillColor={"rgba(150,0,0,0.1)"}>
                            </MapView.Circle>}

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
        width: '100%',
    },
})


export default Map