import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import AutoCompleteAdress from '../components/AutoCompleteAdress'
import Map from "../components/Map";
const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.01;

class MapMenu extends Component {

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <StatusBar style="auto" />
                <Header {...this.props}></Header>
                <Map></Map>
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