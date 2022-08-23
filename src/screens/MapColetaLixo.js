import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Map from "../components/Map";
import Icon from "react-native-vector-icons/Ionicons";
import { StackActions } from "@react-navigation/native";

class MapMenu extends Component {

    render() {
        const origin = {
            "latitude": -22.0977,
            "longitude": -51.4280
        }
        const destination = {
            "latitude": -22.1278,
            "longitude": -51.4229
        }
        return (
            <SafeAreaView style={styles.containerLogo} >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop())}>
                        <Icon name="arrow-back" size={30} color="black" ></Icon>
                    </TouchableOpacity>
                    <Text style={styles.subTitle}>{this.props.route.params.name}</Text>
                </View>
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
    subTitle: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 30,
        color: commonStyle.colors.title,

    },
})


export default MapMenu