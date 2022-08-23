import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Modal, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from './AuthInput'
import { connect } from 'react-redux'
import * as Location from 'expo-location';
import Camera from "./AddPhoto";
import Map from "./Map";
import uploadToS3 from "../services/saveImage";
import InputMasked from "./InputMasked";
import { StackActions } from "@react-navigation/native";
import 'intl';
import "intl/locale-data/jsonp/pt";
import { showError, showSuccess } from "../common";
import { addMarker } from "../storage/actions/marker";
import { typeService } from "../services/solicitacaoService";


class SolicitAnimals extends Component {
    state = {
        location: {},
        errorLocation: '',
        description: '',
        errorDescription: '',
        name: '',
        errorName: '',
        breed: '',
        errorBreed: '',
        color: '',
        errorColor: '',
        gender: '',
        errorGender: '',

        celphone: '',
        errorCelphone: '',
        referencePoint: '',
        errorReferencePoint: '',
        especie: '',
        errorEspecie: '',
        lastTimeSeen: '',
        errorLastTimeSeen: '',


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

    toggleModalMapCancel = () => {
        this.setState({ modalMap: !this.state.modalMap })
    }

    toggleModalCamera = () => {
        this.setState({ modalCamera: !this.state.modalCamera })
    }

    toggleModalCameraCancel = () => {
        this.setState({ modalCamera: !this.state.modalCamera, photo: {} })
    }

    solicit = async () => {
        const { name, cep, especie, breed, color, gender, photo, celphone, lastTimeSeen } = this.state
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
        if (celphone == '') {
            this.setState({ errorCelphone: 'Contato Obrigatória' })
            error = true
        }
        if (breed == '') {
            this.setState({ errorBreed: 'Raça Obrigatória' })
            error = true
        }
        if (lastTimeSeen == '') {
            this.setState({ errorLastTimeSeen: 'Data Obrigatória' })
            error = true
        }
        if (especie == '') {
            this.setState({ errorEspecie: 'Espécie Obrigatória' })
            error = true
        }

        if (!error) {
            let localImage = "https://unesp-s-city.s3.sa-east-1.amazonaws.com/images/9e9d234d-6608-44ec-9ffe-d53d94f7a363_foto.jpeg"

            // if (this.state.photo != {})
            //     await uploadToS3(this.state.photo.uri)
            //         .then(res => {
            //             localImage = "https://unesp-s-city.s3.sa-east-1.amazonaws.com/images/" + res.filename

            //         })
            let data = {
                userId: this.props.userId,
                street: this.state.street,
                streetNumber: parseInt(this.state.number, 10),
                referencePoint: this.state.referencePoint.trim() == "" ? "Não Informado" : this.state.referencePoint,
                cityId: this.props.cityId,
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                images: localImage,
                description: this.state.name + " - " + this.state.especie + " - " + this.state.breed + " - " + this.state.color + " - " + this.state.gender + " - " + this.state.celphone + " - " + this.state.description,
                images: localImage,
                lastTimeSeen: new Date(this.state.lastTimeSeen.substring(6, 10), this.state.lastTimeSeen.substring(3, 5), this.state.lastTimeSeen.substring(0, 2), this.state.lastTimeSeen.substring(11, 13), this.state.lastTimeSeen.substring(14, 16), "00").toString()
            }

            console.log(data);
            typeService(this.props.route.params.name)
                .create(data)
                .then(res => {
                    console.log(res.data);
                    showSuccess('Solicitação feita com sucesso')

                    const date = new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }).format(new Date(new Date(this.state.lastTimeSeen.substring(6, 10), this.state.lastTimeSeen.substring(3, 5), this.state.lastTimeSeen.substring(0, 2), this.state.lastTimeSeen.substring(11, 13), this.state.lastTimeSeen.substring(14, 16), "00")))
                    this.props.addMarker({ latlng: this.state.location, name: this.props.route.params.name, date: date })
                    this.props.navigation.dispatch(StackActions.popToTop());
                    this.props.navigation.navigate('Mapa')
                    return true;
                }).catch(err => {
                    console.log(err);
                    showError(err)
                    return false
                })

        }
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
                        <Map setLocation={(location) => this.setState({ location })} enableAddMarker showAutoComplte></Map>
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
                        icon='tree'
                        placeholder='Ponto de Referência'
                        value={this.state.referencePoint}
                        style={[styles.input]}
                        editable
                        onChangeText={referencePoint => { this.setState({ referencePoint, errorReferencePoint: '' }) }}
                        error={this.state.errorReferencePoint}
                    />

                    <AuthInput
                        icon='tag'
                        placeholder='Nome'
                        value={this.state.name}
                        style={[styles.input]}
                        editable
                        onChangeText={name => { this.setState({ name, errorName: '' }) }}
                        error={this.state.errorName}
                    />

                    <AuthInput
                        icon='paw'
                        placeholder='Espécie'
                        value={this.state.especie}
                        style={[styles.input]}
                        editable
                        onChangeText={especie => { this.setState({ especie, errorEspecie: '' }) }}
                        error={this.state.errorEspecie}
                    />

                    <AuthInput
                        icon='paw'
                        placeholder='Raça'
                        value={this.state.breed}
                        style={[styles.input]}
                        editable
                        onChangeText={breed => { this.setState({ breed, errorBreed: '' }) }}
                        error={this.state.errorBreed}
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

                    <InputMasked
                        icon='mobile'
                        placeholder="Contato"
                        placeholderTextColor={"#aaa"}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        value={this.state.celphone}
                        onChangeText={celphone => { this.setState({ celphone, errorCelphone: '' }) }}
                        error={this.state.errorCelphone}
                    />

                    <InputMasked
                        icon='calendar'
                        placeholder="Última vez visto"
                        placeholderTextColor={"#aaa"}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY HH:MM'
                        }}
                        value={this.state.lastTimeSeen}
                        onChangeText={lastTimeSeen => { this.setState({ lastTimeSeen, errorLastTimeSeen: '' }) }}
                        error={this.state.errorLastTimeSeen}
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
})


const mapStateToProps = ({ user }) => {
    return {
        ...user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addMarker: marker => dispatch(addMarker(marker))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolicitAnimals)

