import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Map from "../components/Map";
import { loadMarkers } from "../storage/actions/marker";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { StackActions } from "@react-navigation/native";



class Radar extends Component {
    state = {
        markerRadar: []
    }
    componentDidMount = () => {
        this.setState({ markerRadar: this.props.marker.filter(item => item.name == this.props.route.params.name) })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop())}>
                        <Icon name="arrow-back" size={30} color="black" ></Icon>
                    </TouchableOpacity>
                    <Text style={styles.subTitle}>{this.props.route.params.name}</Text>
                </View>
                <Map area={this.state.markerRadar}></Map>
                <TouchableOpacity style={styles.addAnimal}
                    onPress={() => this.props.navigation.navigate('Solicitacao', { ...this.props.route.params })}
                >
                    <Text style={styles.addAnimalText}>+</Text>
                </TouchableOpacity>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyle.colors.primary
    },
    subTitle: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 30,
        color: commonStyle.colors.title,

    },
    text: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 20,
        color: commonStyle.colors.title,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: commonStyle.colors.primary,
        width: '100%',
        margin: 0,
        paddingBottom: 5
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: commonStyle.colors.secundary,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: commonStyle.fontFamily,
        color: '#fff',
        fontSize: 20
    },
    imageContainer: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        backgroundColor: '#eee',
        marginTop: 10,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        resizeMode: 'contain',
        backgroundColor: commonStyle.colors.primary
    },
    textError: {
        width: '100%',
        textAlign: 'center',
        fontFamily: commonStyle.fontFamily,
        color: '#f00',
        fontSize: 15,
        marginTop: 5,
        padding: 2,
        borderRadius: 5
    },
    addAnimal: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addAnimalText: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 30,
        color: 'white'
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Radar)
