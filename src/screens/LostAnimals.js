import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Modal, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from '../components/AuthInput'
import { connect } from 'react-redux'
import * as Location from 'expo-location';
import axios from "axios";
import Camera from "../components/AddPhoto";
import Map from "../components/Map";
import ListAnimals from "../components/ListAnimals";


class LostAnimals extends Component {
    state = {
        location: {},
        errorLocation: '',
        description: '',
        errorDescription: '',

        cep: '',
        street: '',
        number: '',
        district: '',
        city: '',
        uf: '',

        photo: {},

        modalMap: false,
        modalCamera: false


    }


    getReverseGeocode = async () => {
        const { latitude, longitude } = this.state.location;
        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });

        for (let item of response) {
            this.setState({
                cep: item.postalCode,
                street: item.street,
                number: item.streetNumber,
                district: item.district,
                city: item.subregion,
                uf: item.region,
            })
        }

    }

    getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({ errorLocation: 'Permission to access location was denied' })
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        if (coords) {
            const { latitude, longitude } = coords;
            this.setState({ location: { latitude, longitude } }, this.getReverseGeocode)
        }
        this.toggleModalMap()
    }

    toggleModalMap = () => {
        this.setState({ modalMap: !this.state.modalMap, errorLocation: '' })
        if (Object.keys(this.state.location).length > 0)
            this.getReverseGeocode()
    }

    toggleModalCamera = () => {
        this.setState({ modalCamera: !this.state.modalCamera })
    }

    solicit = () => {
        const { description, cep } = this.state
        let error = false
        if (cep == '') {
            this.setState({ errorLocation: 'Localização Obrigatória' })
            error = true
        }
        if (description == '') {
            this.setState({ errorDescription: 'Descrição Obrigatória' })
            error = true
        }

        if (!error)
            console.log('Sucesso enviar');
        else
            console.log('Erro enviar');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.subTitle}>{this.props.route.params.name}</Text>
                    <ListAnimals></ListAnimals>
                    <TouchableOpacity style={styles.addAnimal}
                        onPress={() => this.props.navigation.navigate('SolicitAnimals')}
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
        textAlign: 'center',
        marginBottom: 10
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
    addAnimal:{
        position: 'absolute',
        bottom: 20,
        right: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addAnimalText:{
        fontFamily: commonStyle.fontFamily,
        fontSize: 30,
        color: 'white'
    }
})


const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}


// export default Profile
export default connect(mapStateToProps)(LostAnimals)