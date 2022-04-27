import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import MapView from 'react-native-maps';
// import { LatLng, LeafletView } from 'react-native-leaflet-view';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../config";
const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.01;

class MapMenu extends Component {
    state = {
        region: {},
        markers: [],
        ready: false
    }

    componentDidMount = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        if (coords) {
            console.log(coords);
            const { latitude, longitude } = coords;
            this.setState({
                region: {
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                ready: true
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <StatusBar style="auto" />
                <Header {...this.props}></Header>
                <View style={styles.container}>
                    <GooglePlacesAutocomplete
                        styles={{
                            container: {
                                zIndex: 9999,
                                elevation: 9999,
                                position: 'absolute',
                                width: '90%',
                                marginTop: 60
                            }
                        }}
                        placeholder='Endereço'
                        onPress={(data, details = null) => {
                            console.log(details.geometry.location);
                            this.setState({
                                region: {
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                },
                                markers: [...this.state.markers, {
                                    latlng: {
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng
                                    }
                                }]
                            })
                            console.log(details.geometry.location);
                        }}
                        query={{
                            key: GOOGLE_API_KEY,
                            language: 'pt.br',
                        }}
                        fetchDetails={true}
                    />
                    {this.state.ready ?
                        <MapView
                            region={this.state.region}
                            style={styles.map}
                            onPress={(e) => {
                                console.log(e.nativeEvent.coordinate);
                                this.setState({ markers: [...this.state.markers, { latlng: e.nativeEvent.coordinate }] })
                            }}
                            showsUserLocation
                            provider="google">
                            {
                                // loop through markers array & render all markers
                                this.state.markers.map((marker, i) => (
                                    <MapView.Marker coordinate={marker.latlng} key={i} title={'teste'} description={'marker.description'} >
                                    </MapView.Marker>
                                ))
                            }

                        </MapView>
                        :
                        <Text>Loading...</Text>}
                </View>
            </SafeAreaView >

        )
    }
}

const styles = StyleSheet.create({
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: commonStyle.colors.primary,
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: commonStyle.colors.primary,
        alignItems: 'center'
    },
    title: {
        fontFamily: commonStyle.fontFamily,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        width: '100%',
        textAlign: 'center',
        marginBottom: 10
    },
    map: {
        height: '100%',
        width: '100%'
    },
    GooglePlacesAutocomplete: {
    }
})


export default MapMenu