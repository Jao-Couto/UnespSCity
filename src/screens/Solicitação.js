import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Modal, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from '../components/AuthInput'
import { connect } from 'react-redux'
import * as Location from 'expo-location';
import Camera from "../components/AddPhoto";
import Map from "../components/Map";
import { addMarker } from "../storage/actions/marker";
import { StackActions } from '@react-navigation/native';
import pracaService from "../services/pracaService";
import imageService from "../services/imageService";
import mime from 'mime-types';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import uuid from 'react-native-uuid';
import { Buffer } from 'buffer'
import saveImage from '../services/saveImage'

class Solicitacao extends Component {
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


    uploadImage = async () => {
        try {
            const imageName = this.state.photo.uri.replace(/^.*[\\\/]/, '');
            const photo = await fetch(this.state.photo.uri)
            const photoBlob = await photo.blob();
            const fileType = mime.lookup(this.state.photo.uri);
            const access = { level: "public", contentType: fileType, };
            const filename = uuid.v4() + "_foto." + fileType.split("/")[1]
            console.log("salvar");
            await Storage.put(filename, photoBlob, access).then(data => { console.log(data) }).catch(err => console.log(err))
            console.log("divisao");
            await API.graphql(graphqlOperation(createTodo, { input: { name: imageName, image: filename } })).then(data => { console.log(data) }).catch(err => console.log(err))
        }
        catch (err) {
            console.log('error: ', err);
        }

    }


    solicitPraca = () => {
        const data = {
            "name": "Praça Teste",
            "street": "Rua kenji Sato Miura",
            "number": 324,
            "cityId": 1,
            "latitude": "-22.1201",
            "longitude": "-51.4265",
            "description": "Essa é uma Praça",
        }

        pracaService.addPracaSolicit(data)
            .then(res => {
                console.log(res.data);
                const dataImg = { idObj: res.data._id, images: this.state.photo.base64 }

                saveImage(dataImg)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                return true;
            }).catch(err => {
                console.log(err);
                return false
            })
    }

    getReverseGeocode = async () => {
        const { latitude, longitude } = this.state.location;
        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });

        console.log(response);
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

    toggleModalMapCancel = () => {
        this.setState({ modalMap: !this.state.modalMap })
    }

    toggleModalCamera = () => {
        this.setState({ modalCamera: !this.state.modalCamera })
    }

    toggleModalCameraCancel = () => {
        this.setState({ modalCamera: !this.state.modalCamera, photo: {} })
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

        this.solicitPraca()
        if (!error) {
            console.log('Sucesso enviar');
            this.props.addMarker({ latlng: this.state.location, name: this.props.route.params.name })
            this.props.navigation.dispatch(StackActions.popToTop());
            this.props.navigation.navigate('Mapa')
        }
        else
            console.log('Erro enviar');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.subTitle}>{this.props.route.params.name}</Text>
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
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={[styles.button, { marginTop: 2, borderRadius: 0, backgroundColor: 'red', flex: 1 }]} onPress={this.toggleModalMapCancel}>
                                <Text style={styles.buttonText}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { marginTop: 2, borderRadius: 0, backgroundColor: 'green', flex: 1 }]} onPress={this.toggleModalMap}>
                                <Text style={styles.buttonText}>
                                    Confirmar
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </Modal>

                    <Modal visible={this.state.modalCamera}>
                        <Camera setPhoto={(photo) => this.setState({ photo })}></Camera>

                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={[styles.button, { marginTop: 2, borderRadius: 0, backgroundColor: 'red', flex: 1 }]} onPress={this.toggleModalCameraCancel}>
                                <Text style={styles.buttonText}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { marginTop: 2, borderRadius: 0, backgroundColor: 'green', flex: 1 }]} onPress={this.toggleModalCamera}>
                                <Text style={styles.buttonText}>
                                    Confirmar
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>

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

                    <TouchableOpacity style={[styles.button]} onPress={this.solicitPraca}>
                        <Text style={styles.buttonText}>
                            Solicitar
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
    buttonGroup: {
        flexDirection: 'row'
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


const mapDispatchToProps = dispatch => {
    return {
        addMarker: marker => dispatch(addMarker(marker))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Solicitacao)
