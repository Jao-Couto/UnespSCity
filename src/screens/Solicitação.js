import React, { Component, createRef } from "react";
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
import { showError, showSuccess } from "../common";
import { typeService } from "../services/solicitacaoService";
import uploadToS3 from "../services/saveImage";
import Icon from "react-native-vector-icons/Ionicons";
import 'intl';
import "intl/locale-data/jsonp/pt";
import InputMasked from "../components/InputMasked";

class Solicitacao extends Component {
    state = {
        location: { latitude: -22.12008697952109, longitude: -51.42650122331375 },
        errorLocation: '',
        description: 'Testes',
        errorDescription: '',

        name: 'NOme',
        errorName: '',

        referencePoint: 'Perto',
        errorReferencePoint: '',

        guardian: 'pessoa',
        errorGuardian: '',

        cargo: 'prefeito',
        errorCargo: '',

        price: "",
        errorPrice: '',

        cep: '19067-090',
        street: 'Rua Kenji Sato Miura',
        number: '324',
        district: 'Parque Cedral',
        city: 'Presidente Prudente',

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
                city: item.city,
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
        const { description, cep, price } = this.state
        let error = false
        if (cep == '') {
            this.setState({ errorLocation: 'Localização Obrigatória' })
            error = true
        }
        if (description == '') {
            this.setState({ errorDescription: 'Descrição Obrigatória' })
            error = true
        }

        if (price != "")
            this.setState({ price: parseFloat(this.state.price.substring(2).replace(",", ".")) });

        if (!error) {
            console.log("ola");
            let localImage = ""
            /*
            if (this.state.photo != {})
                await uploadToS3(this.state.photo.uri)
                    .then(res => {
                        localImage = "https://unesp-s-city.s3.sa-east-1.amazonaws.com/images/" + res.filename

                    })*/
            let data = {
                userId: this.props.userId,
                street: this.state.street,
                streetNumber: parseInt(this.state.number, 10),
                referencePoint: this.state.referencePoint.trim() == "" ? "Não Informado" : this.state.referencePoint,
                cityId: this.props.cityId,
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                description: this.state.description,
                images: localImage,
                name: this.state.name
            }
            if (this.props.route.params.name == "Adoção de Áreas públicas") {
                data.guardian = this.state.guardian
            }
            if (this.props.route.params.name == "Conheça os Gestores") {
                data.description += " - " + this.state.cargo
            }
            if (this.props.route.params.name == "Ofertas Locais") {
                data.preco = this.state.price
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
                    }).format(new Date())
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop())}>
                        <Icon name="arrow-back" size={30} color="black" ></Icon>
                    </TouchableOpacity>
                    <Text style={styles.subTitle}>{this.props.route.params.name}</Text>
                </View>
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

                    <AuthInput
                        icon='home'
                        placeholder='Nome'
                        value={this.state.name}
                        style={[styles.input]}
                        editable
                        onChangeText={name => { this.setState({ name, errorName: '' }) }}
                        error={this.state.errorName}
                    />

                    {this.props.route.params.name == "Ofertas Locais" &&
                        <InputMasked
                            icon='money'
                            placeholder="Preço"
                            placeholderTextColor={"#aaa"}
                            type={'money'}
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$',
                                suffixUnit: ''
                            }}
                            value={this.state.price}
                            onChangeText={(price) => { this.setState({ price, errorPrice: '' }) }}
                            error={this.state.errorPrice}
                        />
                    }

                    {this.props.route.params.name == "Conheça os Gestores" &&
                        <AuthInput
                            icon='tag'
                            placeholder='Cargo'
                            value={this.state.cargo}
                            style={[styles.input]}
                            editable
                            onChangeText={cargo => { this.setState({ cargo, errorCargo: '' }) }}
                            error={this.state.errorCargo}
                        />
                    }

                    <AuthInput
                        icon='tree'
                        placeholder='Ponto de Referência'
                        value={this.state.referencePoint}
                        style={[styles.input]}
                        editable
                        onChangeText={referencePoint => { this.setState({ referencePoint, errorReferencePoint: '' }) }}
                        error={this.state.errorReferencePoint}
                    />

                    {this.props.route.params.name == "Adoção de Áreas públicas" &&
                        <AuthInput
                            icon='user'
                            placeholder='Guardião'
                            value={this.state.guardian}
                            style={[styles.input]}
                            editable
                            onChangeText={guardian => { this.setState({ guardian, errorGuardian: '' }) }}
                            error={this.state.errorGuardian}
                        />}

                    <TouchableOpacity style={[styles.button]} onPress={this.solicit}>
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
        flexWrap: "wrap"
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
        userId: user.userId,
        email: user.email,
        name: user.name,
        cityId: user.cityId
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addMarker: marker => dispatch(addMarker(marker))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Solicitacao)
