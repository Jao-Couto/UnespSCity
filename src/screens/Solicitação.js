import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Button, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from '../components/AuthInput'
import { connect } from 'react-redux'
import * as Location from 'expo-location';
import axios from "axios";
import Camera from "../components/AddPhoto";


class Solicitacao extends Component {
    state = {
        location: '',
        errorLocation: '',
        description: '',
        errorDescription: '',

        cep: '',
        errorCep: '',
        street: '',
        errorStreet: '',
        number: '',
        errorNumber: '',
        district: '',
        errorDistric: '',
        city: '',
        errorCity: '',
        uf: '',
        errorUf: ''


    }

    getCep = () => {
        if (this.state.cep.length == 8)
            axios.get(`https://viacep.com.br/ws/${this.state.cep}/json/`).then((response) => {
                if (response.data.erro)
                    this.setState({ errorCep: 'CEP não encontrado' })
                else
                    this.setState({
                        street: response.data.logradouro,
                        errorStreet: '',
                        district: response.data.bairro,
                        errorDistric: '',
                        city: response.data.localidade,
                        errorCity: '',
                        uf: response.data.uf,
                        errorUf: ''
                    })
            }).catch(err => console.log(err));
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
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            for (let item of response) {
                this.setState({
                    cep: item.postalCode,
                    errorCep: '',
                    street: item.street,
                    errorStreet: '',
                    number: item.streetNumber,
                    errorNumber: '',
                    district: item.district,
                    errorDistric: '',
                    city: item.city,
                    errorCity: '',
                    uf: item.region,
                    errorUf: ''
                })
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <Text style={styles.subTitle}>{this.props.route.params.name}</Text>
                    <Camera></Camera>
                    <TouchableOpacity style={[styles.button]} onPress={this.getCurrentLocation}>
                        <Text style={styles.buttonText}>
                            Usar localização atual
                        </Text>
                    </TouchableOpacity>
                    <AuthInput
                        icon='location-arrow'
                        placeholder='CEP'
                        value={this.state.cep}
                        style={styles.input}
                        keyboardType='number-pad'
                        maxLength={8}
                        onChangeText={cep => { this.setState({ cep, errorCep: '' }, this.getCep) }}
                        error={this.state.errorCep}
                    />
                    <AuthInput
                        icon='location-arrow'
                        placeholder='Rua'
                        value={this.state.street}
                        style={styles.input}
                        onChangeText={street => { this.setState({ street, errorStreet: '' }) }}
                        error={this.state.errorStreet}
                    />
                    <AuthInput
                        icon='location-arrow'
                        placeholder='Número'
                        value={this.state.number}
                        style={styles.input}
                        keyboardType='number-pad'
                        onChangeText={number => { this.setState({ number, errorNumber: '' }) }}
                        error={this.state.errorNumber}
                    />
                    <AuthInput
                        icon='location-arrow'
                        placeholder='Bairro'
                        value={this.state.district}
                        style={styles.input}
                        onChangeText={district => { this.setState({ district, errorDistrict: '' }) }}
                        error={this.state.errorDistrict}
                    />
                    <AuthInput
                        icon='location-arrow'
                        placeholder='Cidade'
                        value={this.state.city}
                        style={styles.input}
                        onChangeText={city => { this.setState({ city, errorCity: '' }) }}
                        error={this.state.errorCity}
                    />
                    <AuthInput
                        icon='file-text'
                        placeholder='Estado'
                        value={this.state.uf}
                        style={styles.input}
                        onChangeText={uf => { this.setState({ uf, errorUf: '' }) }}
                        error={this.state.errorUf}
                    />
                    <AuthInput
                        icon='file-text'
                        placeholder='Descrição'
                        value={this.state.description}
                        style={[styles.input, { height: 200 }]}
                        editable
                        maxLength={200}
                        multiline={true}
                        numberOfLines={8}
                        onChangeText={description => { this.setState({ description, errorDescription: '' }) }}
                        error={this.state.errorDescription}
                    />

                    <TouchableOpacity style={[styles.button]} onPress={() => console.log(this.props.email)}>
                        <Text style={styles.buttonText}>
                            Solicitar
                        </Text>
                    </TouchableOpacity>
                    <StatusBar style="auto" />
                </ScrollView>

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
    formContainer: {
        backgroundColor: commonStyle.colors.primary,
        padding: 20,
        width: '100%',
        margin: 0,
        padding: 0
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
        borderRadius: 8
    },
    buttonText: {
        fontFamily: commonStyle.fontFamily,
        color: '#fff',
        fontSize: 20
    }
})


const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}


// export default Profile
export default connect(mapStateToProps)(Solicitacao)
