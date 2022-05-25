import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Modal, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from './AuthInput'
import { connect } from 'react-redux'
import * as Location from 'expo-location';
import Camera from "./AddPhoto";
import Map from "./Map";


class SolicitAnimals extends Component {
    state = {
        location: {},
        errorLocation: '',
        description: '',
        errorDescription: '',
        name: '',
        errorName: '',
        breed: '',
        color: '',
        errorColor: '',
        gender: '',
        errorGender: '',
        celphone: '',

        cep: '',
        street: '',
        number: '',
        district: '',
        city: '',
        uf: '',

        photo: {},
        errorPhoto: '',

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
        const { name, cep, breed, color, gender, photo } = this.state
        let error = false
        if (cep == '') {
            this.setState({ errorLocation: 'Localização Obrigatória' })
            error = true
        }
        if (name == '') {
            this.setState({ errorName: 'Nome Obrigatória' })
            error = true
        }
        if (color == '') {
            this.setState({ errorColor: 'Cor Obrigatória' })
            error = true
        }
        if (gender == '') {
            this.setState({ errorGender: 'Sexo Obrigatória' })
            error = true
        }
        if (Object.keys(photo).length == 0) {
            this.setState({ errorPhoto: 'Foto Obrigatória' })
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
                <Text style={styles.subTitle}>Cadastrar Animal</Text>
                <ScrollView style={{ width: '95%' }}>

                    <TouchableOpacity style={[styles.button]} onPress={this.toggleModalMap}>
                        <Text style={styles.buttonText}>
                            Adicionar Localização
                        </Text>
                    </TouchableOpacity>
                    {this.state.errorLocation !== '' ? <Text style={styles.textError}>{this.state.errorLocation}</Text> : null}
                    {this.state.cep != '' &&
                        <Text style={styles.text}>{this.state.street}, {this.state.number} - {this.state.district}, {this.state.city} - {this.state.uf}</Text>
                    }

                    <TouchableOpacity style={[styles.button]} onPress={this.toggleModalCamera}>
                        <Text style={styles.buttonText}>
                            Adicionar Foto
                        </Text>
                    </TouchableOpacity>
                    {this.state.errorPhoto !== '' ? <Text style={styles.textError}>{this.state.errorPhoto}</Text> : null}
                    {this.state.photo.uri && <View style={styles.imageContainer}>
                        <Image source={{ uri: this.state.photo.uri }} style={styles.image} />
                    </View>}

                    <Modal visible={this.state.modalMap}>
                        <Map setLocation={(location) => this.setState({ location })} enableAddMarker></Map>
                        <TouchableOpacity style={[styles.button, { marginTop: 0, borderRadius: 0 }]} onPress={this.getCurrentLocation}>
                            <Text style={styles.buttonText}>
                                Usar localização atual
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { marginTop: 2, borderRadius: 0 }]} onPress={this.toggleModalMap}>
                            <Text style={styles.buttonText}>
                                Confirmar
                            </Text>
                        </TouchableOpacity>

                    </Modal>

                    <Modal visible={this.state.modalCamera}>
                        <Camera setPhoto={(photo) => this.setState({ photo })}></Camera>
                        <TouchableOpacity style={[styles.button, { marginTop: 0, borderRadius: 0 }]} onPress={this.toggleModalCamera}>
                            <Text style={styles.buttonText}>
                                Confirmar
                            </Text>
                        </TouchableOpacity>
                    </Modal>

                    <AuthInput
                        icon='pencil'
                        placeholder='Nome'
                        value={this.state.name}
                        style={[styles.input, { marginTop: 40 }]}
                        editable
                        onChangeText={name => { this.setState({ name, errorName: '' }) }}
                        error={this.state.errorName}
                    />

                    <AuthInput
                        icon='paw'
                        placeholder='Raça'
                        value={this.state.breed}
                        style={[styles.input]}
                        editable
                        onChangeText={breed => { this.setState({ breed }) }}
                    />

                    <AuthInput
                        icon='eye'
                        placeholder='Cor'
                        value={this.state.color}
                        style={[styles.input]}
                        editable
                        onChangeText={color => { this.setState({ color, errorColor: '' }) }}
                        error={this.state.errorColor}
                    />

                    <AuthInput
                        icon='venus-mars'
                        placeholder='Sexo'
                        value={this.state.gender}
                        style={[styles.input]}
                        editable
                        onChangeText={gender => { this.setState({ gender, errorGender: '' }) }}
                        error={this.state.errorGender}
                    />

                    <AuthInput
                        icon='mobile'
                        placeholder='Contato'
                        value={this.state.celphone}
                        style={[styles.input]}
                        editable
                        onChangeText={celphone => { this.setState({ celphone }) }}
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

                    <TouchableOpacity style={[styles.button]} onPress={this.solicit}>
                        <Text style={styles.buttonText}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
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
    }
})


const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}


// export default Profile
export default connect(mapStateToProps)(SolicitAnimals)
