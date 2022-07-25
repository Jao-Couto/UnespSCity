import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import { showError, showSuccess } from "../common";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from '../components/AuthInput'
import LogoUnesp from '../../assets/UnespLogo.png'
import ModalSelector from "react-native-modal-selector-searchable";
import cidadeService from "../services/cidadeService";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class Register extends Component {
    state = {
        name: '',
        errorName: '',
        email: '',
        errorEmail: '',
        password: '',
        errorPassword: '',
        confirmPassword: '',
        errorConfirmPassword: '',
        phone: '',
        errorPhone: '',
        cityId: '',
        cityName: '',
        errorCityId: '#fff',
        dataCidades: []
    }

    componentDidMount = () => {
        cidadeService.getCidades()
            .then((res) => {
                let data = res.data.map((item) => {
                    return { key: item.id, label: item.name }
                })
                this.setState({ dataCidades: data })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    signup = () => {
        let error = false
        if (this.state.name.length <= 0) {
            this.setState({ errorName: 'Preencha o Nome!' })
            error = true
        }
        if (this.state.email.length <= 0) {
            this.setState({ errorEmail: 'Preencha o Email!' })
            error = true
        }
        if (this.state.password.length <= 0) {
            this.setState({ errorPassword: 'Preencha a Senha!' })
            error = true
        }
        if (this.state.confirmPassword.length <= 0) {
            this.setState({ errorConfirmPassword: 'Confirme a Senha!' })
            error = true
        }
        if (this.state.confirmPassword != '' && this.state.password.length !== this.state.confirmPassword) {
            this.setState({ errorConfirmPassword: 'As senhas devem ser iguais!' })
            error = true
        }
        if (this.state.cityId.length <= 0) {
            this.setState({ errorCityId: '#fa9191' })
            error = true
        }
        if (!error)
            showSuccess('Usuário cadastrado')
    }


    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.containerLogo}>
                    <Image source={LogoUnesp} style={styles.image} />

                    <View style={styles.container}>
                        <Text style={styles.title}>UnespSCity</Text>
                        <View style={styles.formContainer}>
                            <Text style={styles.subTitle}>Crie a sua conta</Text>

                            <AuthInput
                                icon='user'
                                placeholder='Nome'
                                value={this.state.name}
                                style={styles.input}
                                onChangeText={name => { this.setState({ name, errorName: '' }) }}
                                error={this.state.errorName}
                            />

                            <AuthInput
                                icon='at'
                                placeholder='Email'
                                value={this.state.email}
                                style={styles.input}
                                onChangeText={email => { this.setState({ email, errorEmail: '' }) }}
                                error={this.state.errorEmail}
                            />
                            <AuthInput
                                icon='lock'
                                placeholder='Senha'
                                value={this.state.password}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={password => { this.setState({ password, errorPassword: '' }) }}
                                error={this.state.errorPassword}
                            />
                            <AuthInput
                                icon='asterisk'
                                placeholder='Confirmar Senha'
                                value={this.state.confirmPassword}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={confirmPassword => { this.setState({ confirmPassword, errorConfirmPassword: '' }) }}
                                error={this.state.errorConfirmPassword}
                            />

                            <AuthInput
                                icon='mobile'
                                placeholder='Celular'
                                value={this.state.phone}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                                error={this.state.errorPhone}
                            />
                            <ModalSelector
                                data={this.state.dataCidades}
                                initValue="Selecione uma Cidade"
                                supportedOrientations={['landscape']}
                                searchText="Procurar"
                                cancelText="Cancelar"
                                optionContainerStyle={{ backgroundColor: 'white' }}
                                optionTextStyle={{ fontSize: 20 }}
                                style={{ backgroundColor: this.state.errorCityId }}
                                onChange={(option) => { this.setState({ cityName: option.label, cityId: option.key, errorCityId: '#fff' }) }}>
                                <View style={{
                                    width: '100%',
                                    height: 50,
                                    borderRadius: 2,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View style={styles.icon}>
                                        <Icon name="city" size={20} color='#fff' />
                                    </View>
                                    <TextInput
                                        style={{
                                            fontFamily: commonStyle.fontFamily,
                                            marginLeft: 5,
                                            width: '85%',
                                            fontSize: 20,
                                            backgroundColor: this.state.errorCityId,
                                            color: '#000'
                                        }}
                                        editable={false}
                                        placeholder="Selecione uma Cidade"
                                        value={this.state.cityName} />
                                </View>
                            </ModalSelector>

                            <TouchableOpacity onPress={this.signup}>
                                <View style={[styles.button]}>
                                    <Text style={styles.buttonText}>
                                        Cadastrar
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ padding: 10 }}
                            onPress={() => { this.props.navigation.navigate('Login'); }}>
                            <Text style={styles.subTitle}>Já possui conta?</Text>
                        </TouchableOpacity>
                        <StatusBar style="auto" />
                    </View>

                </SafeAreaView>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    containerLogo: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: commonStyle.colors.primary
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyle.colors.primary
    },
    title: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 70,
        color: commonStyle.colors.secundary,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: commonStyle.colors.primary,
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
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
    },
    image: {
        width: '100%',
        height: 50,
        resizeMode: 'contain'
    },
    icon: {
        color: '#333',
        flex: 1,
        height: '100%',
        backgroundColor: commonStyle.colors.secundary,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
})