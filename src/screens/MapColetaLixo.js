import React, { Component } from "react";
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Map from "../components/Map";

class MapMenu extends Component {

    render() {
        const origin = {
            "latitude": -22.120774060358524,
            "longitude": -51.42607357352972
        }
        const destination = {
            "latitude": -22.121274431519986,
            "longitude": -51.425361447036266
        }
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Text style={styles.subTitle}>{this.props.route.params.name}</Text>
                <Map origin={origin} destination={destination} ></Map>
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