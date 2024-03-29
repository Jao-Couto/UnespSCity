import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Modal, Image, KeyboardAvoidingView, RefreshControl, ActivityIndicator } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from '../components/AuthInput'
import { connect } from 'react-redux'
import Camera from "../components/AddPhoto";
import { StackActions } from '@react-navigation/native';
import { showError, showSuccess } from "../common";
import { typeService } from "../services/solicitacaoService";
import uploadToS3 from "../services/saveImage";
import Icon from "react-native-vector-icons/Ionicons";
import 'intl';
import "intl/locale-data/jsonp/pt";
import InputMasked from "../components/InputMasked";

class SolicitacaoTelefones extends Component {
    state = {
        description: '',
        errorDescription: '',

        phoneNumber: '',
        errorPhoneNumber: '',

        name: '',
        errorName: '',

        photo: {},
        errorPhoto: "",
        loading: false,
        modalCamera: false

    }




    toggleModalCamera = () => {
        this.setState({ modalCamera: !this.state.modalCamera })
    }

    toggleModalCameraCancel = () => {
        this.setState({ modalCamera: !this.state.modalCamera, photo: {} })
    }

    solicit = async () => {
        this.setState({ loading: true })
        const { description } = this.state
        let error = false
        if (description == '') {
            this.setState({ errorDescription: 'Descrição Obrigatória' })
            error = true
        }

        if (this.state.photo == {}) {
            this.setState({ errorPhoto: 'Foto Obrigatória' })
            error = true
        }

        if (!error) {
            let localImage = ""

            if (this.state.photo != {})
                await uploadToS3(this.state.photo.uri)
                    .then(res => {
                        localImage = "https://unesp-s-city.s3.sa-east-1.amazonaws.com/images/" + res.filename

                    })
            let data = {
                userId: this.props.userId,
                description: this.state.description,
                images: localImage,
                name: this.state.name,
                phoneNumber: this.state.phoneNumber
            }
            console.log(data);
            typeService(this.props.route.params.name)
                .create(data)
                .then(res => {
                    console.log(res.data);
                    if (res.data == false) {
                        showSuccess("Campos não preenchidos")
                        return
                    }
                    showSuccess('Solicitação feita com sucesso')
                    this.setState({ loading: false })
                    this.props.navigation.dispatch(StackActions.pop());
                    return true;
                }).catch(err => {
                    console.log(err);
                    showError(err)
                    return false
                })

        } else
            showError("Campos obrigatórios não preenchidos")
        this.setState({ loading: false })
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
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView style={{ width: '95%' }}>


                        <TouchableOpacity style={[styles.button]} onPress={this.toggleModalCamera}>
                            <Text style={styles.buttonText}>
                                Adicionar Foto
                            </Text>
                        </TouchableOpacity>
                        {this.state.photo.uri && <View style={styles.imageContainer}>
                            <Image source={{ uri: this.state.photo.uri }} style={styles.image} />
                        </View> ||
                            <Text style={styles.textError}>{this.state.errorPhoto}</Text>
                        }


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
                        <InputMasked
                            icon='mobile'
                            placeholder="Contato"
                            placeholderTextColor={"#aaa"}
                            type={'only-numbers'}
                            value={this.state.phoneNumber}
                            onChangeText={phoneNumber => { this.setState({ phoneNumber, errorPhoneNumber: '' }) }}
                            error={this.state.errorPhoneNumber}
                        />
                        <TouchableOpacity style={[styles.button]} onPress={this.solicit} disabled={this.state.loading}>
                            {this.state.loading &&
                                <ActivityIndicator size={"large"} color="white"></ActivityIndicator>
                                ||
                                <Text style={styles.buttonText}>
                                    Solicitar
                                </Text>
                            }
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>

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

export default connect(mapStateToProps)(SolicitacaoTelefones)