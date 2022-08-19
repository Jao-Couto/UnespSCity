import React, { Component } from "react";
import { StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import Map from "../components/Map";
import { loadMarkers } from "../storage/actions/marker";

class MapMenu extends Component {
    componentDidMount = () => {
        this.props.onLoadMarkers()
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Header {...this.props}></Header>
                <Map marker={this.props.marker} showAutoComplte></Map>
            </SafeAreaView >

        )
    }
}

const styles = StyleSheet.create({
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: commonStyle.colors.primary,
        height: '100%'
    },
})


const mapStateToProps = ({ marker }) => {
    return {
        marker: marker.markers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMarkers: () => dispatch(loadMarkers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMenu)