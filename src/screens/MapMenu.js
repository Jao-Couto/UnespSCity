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
        this.props.onLoadMarkers(this.props.cityId)
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Header {...this.props}></Header>
                {this.props.marker.length > 0 && <Map marker={this.props.marker} showAutoComplte></Map> || <Map showAutoComplte></Map>}


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


const mapStateToProps = ({ marker, user }) => {
    return {
        marker: marker.markers,
        ...user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMarkers: (cityId) => dispatch(loadMarkers(cityId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMenu)