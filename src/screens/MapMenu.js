import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import Map from "../components/Map";

class MapMenu extends Component {

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <StatusBar style="auto" />
                <Header {...this.props}></Header>
                <Map marker={this.props.marker}></Map>
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
})


const mapStateToProps = ({ marker }) => {
    return {
        marker: marker.markers
    }
}

export default connect(mapStateToProps)(MapMenu)